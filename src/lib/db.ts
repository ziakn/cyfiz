import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type QueryParams = Array<string | number | boolean | null | Date>;

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
    "SELECT id, email, role, created_at AS createdAt FROM admin_users ORDER BY created_at DESC"
  );
}
