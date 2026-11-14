import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Return DATE columns as "YYYY-MM-DD" strings. Parsed as Date objects they
  // land on the server's timezone midnight, which shifts the day once the value
  // reaches a browser in another zone.
  dateStrings: ["DATE"],
});

type QueryParams = Array<string | number | boolean | null | Date>;

const ALLOWED_STATUS_TABLES = new Set([
  "articles",
  "contact_messages",
  "newsletter_subscribers",
  "portal_users",
  "quiz_questions",
  "quizzes",
  "site_settings",
  "trainings",
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
    "SELECT id, email, password_hash AS passwordHash, role, status FROM admin_users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}

export async function getAllAdminUsers() {
  try {
    return await query<RowDataPacket[]>(
      `SELECT u.id, u.email, u.role, u.role_id AS roleId, COALESCE(r.name, u.role) AS roleName, u.status, u.created_at AS createdAt
       FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id ORDER BY u.created_at DESC`
    );
  } catch {
    // roles table not migrated yet
    return await query<RowDataPacket[]>(
      "SELECT id, email, role, NULL AS roleId, role AS roleName, status, created_at AS createdAt FROM admin_users ORDER BY created_at DESC"
    );
  }
}

export async function createAdminUser(data: { email: string; passwordHash: string; roleId: number; roleSlug: string }) {
  const result = await execute(
    "INSERT INTO admin_users (email, password_hash, role, role_id) VALUES (?, ?, ?, ?)",
    [data.email, data.passwordHash, data.roleSlug, data.roleId]
  );
  return result.insertId;
}

export async function updateAdminUser(id: number, data: { email?: string; passwordHash?: string; roleId?: number; roleSlug?: string }) {
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
  if (data.roleId !== undefined) {
    updates.push("role_id = ?", "role = ?");
    values.push(data.roleId, data.roleSlug ?? "");
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
