#!/usr/bin/env node
// Applies database/migrations/*.sql in order, once each (tracked in schema_migrations).
// Idempotent and additive only: safe to run on every deploy. Usage: npm run migrate
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function mysqlUrl() {
  if (process.env.MYSQL_URL) return process.env.MYSQL_URL;
  const envPath = path.join(root, ".env");
  if (fs.existsSync(envPath)) {
    const m = fs.readFileSync(envPath, "utf8").match(/^MYSQL_URL=(.*)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("MYSQL_URL is not set (environment or .env).");
}

// Already-applied DDL (e.g. the column exists from a manual run) is not an error.
const IGNORABLE = new Set(["ER_DUP_FIELDNAME", "ER_TABLE_EXISTS_ERROR", "ER_DUP_KEYNAME", "ER_MULTIPLE_PRI_KEY"]);

const conn = await mysql.createConnection({ uri: mysqlUrl() });
try {
  await conn.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (name VARCHAR(190) PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
  const [done] = await conn.query("SELECT name FROM schema_migrations");
  const applied = new Set(done.map((r) => r.name));

  const dir = path.join(root, "database", "migrations");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  let ran = 0;

  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = fs.readFileSync(path.join(dir, file), "utf8")
      .split("\n").filter((l) => !l.trim().startsWith("--")).join("\n");
    const statements = sql.split(/;\s*(?:\n|$)/).map((s) => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      try {
        await conn.query(stmt);
      } catch (err) {
        if (!IGNORABLE.has(err.code)) {
          console.error(`✗ ${file} failed: ${err.message}\n  ${stmt.slice(0, 120).replace(/\s+/g, " ")}`);
          process.exit(1);
        }
      }
    }
    await conn.query("INSERT INTO schema_migrations (name) VALUES (?)", [file]);
    console.log(`✓ applied ${file}`);
    ran++;
  }
  console.log(ran ? `Done: ${ran} migration(s) applied.` : "Database is up to date.");
} finally {
  await conn.end();
}
