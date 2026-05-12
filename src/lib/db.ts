import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type QueryParams = Array<string | number | boolean | null | Date>;

const ALLOWED_STATUS_TABLES = new Set([
  "admin_users",
  "articles",
  "past_quizzes",
  "partners",
  "profile_certifications",
  "profile_education",
  "profile_experience",
  "profile_projects",
  "profile_skills",
  "quiz_leaderboard",
  "research_summaries",
  "site_settings",
  "site_stats",
  "social_links",
  "team_members",
]);

export async function query<T = unknown>(sql: string, params: QueryParams = []) {
  const [rows] = await pool.query<RowDataPacket[]>(sql, params);
  return rows as T;
}

export async function execute(sql: string, params: QueryParams = []) {
  const [result] = await pool.execute<ResultSetHeader>(sql, params);
  return result;
}

export async function getAdminUserByEmail(email: string) {
  const rows = await query<RowDataPacket[]>(
    "SELECT id, email, password_hash AS passwordHash, role FROM admin_users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}

export async function getAllModules() {
  return await query<RowDataPacket[]>(
    "SELECT id, slug, title, description, status, created_at AS createdAt, updated_at AS updatedAt FROM admin_modules ORDER BY updated_at DESC"
  );
}

export async function getModuleById(id: string) {
  const rows = await query<RowDataPacket[]>(
    "SELECT id, slug, title, description, content, status, created_at AS createdAt, updated_at AS updatedAt FROM admin_modules WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

export async function getModuleBySlug(slug: string) {
  const rows = await query<RowDataPacket[]>(
    "SELECT id, slug, title, description, content, status, created_at AS createdAt, updated_at AS updatedAt FROM admin_modules WHERE slug = ? LIMIT 1",
    [slug]
  );
  return rows[0] ?? null;
}

export async function createModule(data: {
  slug: string;
  title: string;
  description: string;
  content: string;
  status?: string;
}) {
  const result = await execute(
    "INSERT INTO admin_modules (slug, title, description, content, status) VALUES (?, ?, ?, ?, ?)",
    [data.slug, data.title, data.description, data.content, data.status ?? "draft"]
  );
  return result.insertId;
}

export async function updateModule(id: string, data: { title?: string; description?: string; content?: string; status?: string }) {
  const updates: string[] = [];
  const values: QueryParams = [];

  if (data.title !== undefined) {
    updates.push("title = ?");
    values.push(data.title);
  }
  if (data.description !== undefined) {
    updates.push("description = ?");
    values.push(data.description);
  }
  if (data.content !== undefined) {
    updates.push("content = ?");
    values.push(data.content);
  }
  if (data.status !== undefined) {
    updates.push("status = ?");
    values.push(data.status);
  }

  if (updates.length === 0) {
    return;
  }

  values.push(id);
  await execute(`UPDATE admin_modules SET ${updates.join(", ")} WHERE id = ?`, values);
}

export async function deleteModule(id: string) {
  await execute("DELETE FROM admin_modules WHERE id = ?", [id]);
}

export async function getAllAdminUsers() {
  return await query<RowDataPacket[]>(
    "SELECT id, email, role, status, created_at AS createdAt FROM admin_users ORDER BY created_at DESC"
  );
}

export async function createAdminUser(data: { email: string; passwordHash: string; role: string }) {
  const result = await execute(
    "INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)",
    [data.email, data.passwordHash, data.role]
  );
  return result.insertId;
}

export async function updateAdminUser(id: number, data: { email?: string; passwordHash?: string; role?: string }) {
  const updates: string[] = [];
  const values: QueryParams = [];

  if (data.email !== undefined) {
    updates.push("email = ?");
    values.push(data.email);
  }
  if (data.passwordHash !== undefined) {
    updates.push("password_hash = ?");
    values.push(data.passwordHash);
  }
  if (data.role !== undefined) {
    updates.push("role = ?");
    values.push(data.role);
  }

  if (updates.length === 0) return;

  values.push(id);
  await execute(`UPDATE admin_users SET ${updates.join(", ")} WHERE id = ?`, values);
}

export async function deleteAdminUser(id: number) {
  await execute("DELETE FROM admin_users WHERE id = ?", [id]);
}

export async function updateStatus(table: string, id: number | string, status: number) {
  if (!ALLOWED_STATUS_TABLES.has(table)) {
    throw new Error("Invalid table for status update");
  }

  await execute(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, id]);
}

export async function updateUserStatus(id: number, status: number) {
  await updateStatus("admin_users", id, status);
}
