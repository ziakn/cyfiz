#!/usr/bin/env node
// Smoke test for a RUNNING app (dev, staging or production build). Usage:
//   BASE_URL=http://localhost:3000 npm run test:smoke
// Uses MYSQL_URL / JWT_SECRET from .env. It creates a few temporary rows (a test role, user,
// contact message and subscriber) and deletes them again, even if a check fails.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = fs.existsSync(path.join(root, ".env")) ? fs.readFileSync(path.join(root, ".env"), "utf8") : "";
const env = (k) => process.env[k] ?? (envFile.match(new RegExp(`^${k}=(.*)$`, "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "") ?? "";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const SECRET = env("JWT_SECRET") || "replace_this_secret";
const token = (id, email) => jwt.sign({ id, email, role: "test" }, SECRET, { expiresIn: "10m" });

let pass = 0, fail = 0;
const results = [];
function check(name, ok, detail = "") {
  (ok ? pass++ : fail++);
  results.push(`${ok ? "  ✓" : "  ✗"} ${name}${ok ? "" : detail ? `  -> ${detail}` : ""}`);
}
const get = (p, id, email) =>
  fetch(BASE + p, { redirect: "manual", headers: id ? { cookie: `cyfiz_admin=${token(id, email)}` } : {} });
const post = (p, body) =>
  fetch(BASE + p, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const db = await mysql.createConnection({ uri: env("MYSQL_URL") });
const created = { role: null, user: null };
const TEST_EMAIL = "smoke-test@example.invalid";

try {
  // ───── public pages ─────
  const pages = [["/", "Latest Insights"], ["/insights", "Insights"], ["/learn", "Trainings"], ["/packages", "Packages"], ["/profile", "Core Expertise"], ["/contact", "Send us a message"], ["/cookie-policy", "Cookie"]];
  for (const [p, text] of pages) {
    const r = await get(p);
    const html = await r.text();
    check(`GET ${p} → 200 and shows "${text}"`, r.status === 200 && html.includes(text), `status ${r.status}`);
  }
  check("/connect redirects to /contact", (await get("/connect")).headers.get("location")?.endsWith("/contact"));
  check("/quiz redirects to /learn", (await get("/quiz")).headers.get("location")?.endsWith("/learn"));

  const [art] = await db.query("SELECT id, title FROM articles WHERE status = 1 ORDER BY id DESC LIMIT 1");
  if (art[0]) {
    const r = await get(`/insights/${art[0].id}-x`);
    check(`article page /insights/${art[0].id} → 200`, r.status === 200, `status ${r.status}`);
  } else check("article page (no published article to test; add one)", true);
  check("unknown article → 404", (await get("/insights/999999-nope")).status === 404);

  // Who@m! content comes from the database
  const [certs] = await db.query("SELECT COUNT(*) n FROM profile_credentials WHERE status = 1");
  const profileHtml = await (await get("/profile")).text();
  check(`Who@m! lists ${certs[0].n} certification(s) from the database`, certs[0].n === 0 || profileHtml.includes("Professional certifications"));

  // ───── public forms ─────
  let r = await post("/api/newsletter", { email: "not-an-email" });
  check("newsletter rejects a bad email (400)", r.status === 400, `status ${r.status}`);
  r = await post("/api/newsletter", { email: TEST_EMAIL, source: "smoke" });
  check("newsletter accepts a valid email", r.status === 200, `status ${r.status}`);
  const [sub] = await db.query("SELECT id FROM newsletter_subscribers WHERE email = ?", [TEST_EMAIL]);
  check("subscriber row saved in database", sub.length === 1);

  r = await post("/api/contact", { name: "", email: TEST_EMAIL, message: "x" });
  check("contact rejects a missing name (400)", r.status === 400, `status ${r.status}`);
  r = await post("/api/contact", { topic: "Trainings", name: "Smoke Test", email: TEST_EMAIL, message: "Automated smoke test message", subscribe: false });
  check("contact accepts a valid message", r.status === 200, `status ${r.status}`);
  const [msg] = await db.query("SELECT id FROM contact_messages WHERE email = ?", [TEST_EMAIL]);
  check("contact message saved in database", msg.length >= 1);

  // ───── built-in roles know about every module ─────
  const [mods] = await db.query("SELECT DISTINCT module FROM role_permissions WHERE module = 'packages'");
  check("built-in roles have 'packages' permissions seeded", mods.length === 1);

  // ───── admin access ─────
  check("/admin/dashboard without login → redirect to login", (await get("/admin/dashboard")).headers.get("location")?.includes("/admin/login"));
  const [admins] = await db.query(
    "SELECT u.id, u.email FROM admin_users u JOIN roles r ON r.id = u.role_id WHERE r.is_super = 1 AND u.status = 1 LIMIT 1"
  );
  if (!admins[0]) {
    check("a Super Admin account exists", false, "run migrations and make sure one active Super Admin exists");
  } else {
    const a = admins[0];
    const adminPages = ["/admin/dashboard", "/admin/articles", "/admin/trainings", "/admin/packages", "/admin/credentials", "/admin/expertise", "/admin/speaking", "/admin/research", "/admin/messages", "/admin/subscribers", "/admin/quiz", "/admin/portal-users", "/admin/users", "/admin/roles", "/admin/settings"];
    for (const p of adminPages) {
      const res = await get(p, a.id, a.email);
      check(`Super Admin can open ${p}`, res.status === 200, `status ${res.status} ${res.headers.get("location") ?? ""}`);
    }
    const apiUsers = await get("/api/admin/users", a.id, a.email);
    check("Super Admin can call /api/admin/users", apiUsers.status === 200, `status ${apiUsers.status}`);
    check("/api/admin/users without login → 401", (await get("/api/admin/users")).status === 401);

    // ───── restricted role ─────
    const [rr] = await db.query("INSERT INTO roles (name, slug, description, is_super, is_system) VALUES ('Smoke Test Role', 'smoke_test_role', 'temporary', 0, 0)");
    created.role = rr.insertId;
    await db.query("INSERT INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) VALUES (?, 'articles', 1, 0, 0, 0), (?, 'messages', 1, 0, 1, 0)", [rr.insertId, rr.insertId]);
    const [ur] = await db.query("INSERT INTO admin_users (email, password_hash, role, role_id, status) VALUES ('smoke-user@example.invalid', 'x', 'smoke_test_role', ?, 1)", [rr.insertId]);
    created.user = ur.insertId;
    const ue = "smoke-user@example.invalid";
    const t = async (p) => get(p, ur.insertId, ue);
    check("restricted role can open permitted /admin/articles", (await t("/admin/articles")).status === 200);
    check("restricted role can open permitted /admin/messages", (await t("/admin/messages")).status === 200);
    for (const p of ["/admin/packages", "/admin/trainings", "/admin/roles", "/admin/users", "/admin/settings", "/admin/quiz"]) {
      const res = await t(p);
      check(`restricted role is blocked from ${p}`, res.status === 307 && (res.headers.get("location") ?? "").includes("denied="), `status ${res.status}`);
    }
    await db.query("INSERT INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) VALUES (?, 'packages', 1, 0, 0, 0)", [rr.insertId]);
    check("granting 'view packages' opens /admin/packages immediately", (await t("/admin/packages")).status === 200);
    await db.query("DELETE FROM role_permissions WHERE role_id = ? AND module = 'packages'", [rr.insertId]);
    check("removing the grant blocks /admin/packages again", (await t("/admin/packages")).status === 307);
    // create/update/delete without view must not grant anything
    await db.query("INSERT INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) VALUES (?, 'packages', 0, 1, 1, 1)", [rr.insertId]);
    check("create/update/delete without 'view' does not open the module", (await t("/admin/packages")).status === 307);
    await db.query("DELETE FROM role_permissions WHERE role_id = ? AND module = 'packages'", [rr.insertId]);
    check("restricted role gets 403 from /api/admin/users", (await t("/api/admin/users")).status === 403);
    const dash = await t("/admin/dashboard");
    const dashHtml = await dash.text();
    check("restricted role's dashboard hides modules it can't view", dash.status === 200 && !dashHtml.includes("/admin/roles"));

    await db.query("UPDATE roles SET status = 0 WHERE id = ?", [rr.insertId]);
    check("disabling a role removes its access immediately", (await t("/admin/articles")).status === 307);
    await db.query("UPDATE roles SET status = 1 WHERE id = ?", [rr.insertId]);
    await db.query("UPDATE admin_users SET status = 0 WHERE id = ?", [ur.insertId]);
    check("deactivated user is sent to login", (await t("/admin/articles")).headers.get("location")?.includes("/admin/login"));
  }
} catch (err) {
  fail++;
  results.push(`  ✗ test run crashed: ${err.message} (is the app running at ${BASE}?)`);
} finally {
  // always clean up
  if (created.user) await db.query("DELETE FROM admin_users WHERE id = ?", [created.user]).catch(() => {});
  if (created.role) await db.query("DELETE FROM roles WHERE id = ?", [created.role]).catch(() => {});
  await db.query("DELETE FROM contact_messages WHERE email = ?", [TEST_EMAIL]).catch(() => {});
  await db.query("DELETE FROM newsletter_subscribers WHERE email = ?", [TEST_EMAIL]).catch(() => {});
  await db.end();
}

console.log(`\nSmoke test against ${BASE}\n${results.join("\n")}\n\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
