#!/usr/bin/env node
// Syncs the module list in src/lib/modules.json into the role_permissions table.
//  - built-in roles (editor, viewer) get the module's default grants if they have no row for it yet
//  - rows for modules that no longer exist are removed
//  - existing grants are NEVER overwritten, so changes made in Admin → Roles & Permissions are kept
//  - Super Admin needs no rows (it has everything); custom roles are never auto-granted
// Runs automatically at the end of `npm run migrate`; also: npm run sync:permissions
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "src", "lib", "modules.json"), "utf8"));

export async function syncPermissions(conn, log = console.log) {
  try {
    await conn.query("SELECT 1 FROM roles LIMIT 1");
  } catch {
    log("Permissions sync skipped (roles table not created yet).");
    return;
  }

  const [roles] = await conn.query("SELECT id, slug FROM roles WHERE slug IN ('editor', 'viewer')");
  let added = 0;

  for (const role of roles) {
    for (const m of registry.modules) {
      const bits = m[role.slug];
      if (!bits) continue;
      const [res] = await conn.query(
        "INSERT IGNORE INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) VALUES (?, ?, ?, ?, ?, ?)",
        [role.id, m.key, +bits[0], +bits[1], +bits[2], +bits[3]]
      );
      if (res.affectedRows) {
        added++;
        log(`  + ${role.slug}: ${m.key} (${bits})`);
      }
    }
  }

  const keys = registry.modules.map((m) => m.key);
  const [del] = await conn.query("DELETE FROM role_permissions WHERE module NOT IN (?)", [keys]);
  if (del.affectedRows) log(`  - removed ${del.affectedRows} grant(s) for modules that no longer exist`);

  log(added || del.affectedRows ? `Permissions synced: ${added} added.` : "Permissions already in sync.");
}

// Allow running directly: node scripts/sync-permissions.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mysql = (await import("mysql2/promise")).default;
  const envPath = path.join(root, ".env");
  const url = process.env.MYSQL_URL ?? (fs.existsSync(envPath) ? (fs.readFileSync(envPath, "utf8").match(/^MYSQL_URL=(.*)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, "") : "");
  if (!url) throw new Error("MYSQL_URL is not set (environment or .env).");
  const conn = await mysql.createConnection({ uri: url });
  try { await syncPermissions(conn); } finally { await conn.end(); }
}
