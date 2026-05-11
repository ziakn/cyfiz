import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import { getAdminContentModule } from "@/lib/adminContent";
import { getSessionUserFromCookie, parseAuthCookieHeader } from "@/lib/auth";

type Params = { params: Promise<{ module: string; id: string }> };
type RowValue = string | number | boolean | null | Date;
type ContentRow = Record<string, RowValue>;

function getUser(request: Request) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  return getSessionUserFromCookie(cookieValue);
}

function normalizeValue(value: unknown) {
  if (value === undefined || value === "") return null;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  return String(value);
}

export async function GET(request: Request, { params }: Params) {
  const user = getUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { module: moduleSlug, id } = await params;
  const moduleConfig = getAdminContentModule(moduleSlug);
  if (!moduleConfig) {
    return NextResponse.json({ error: "Unknown module." }, { status: 404 });
  }

  const rows = await query<ContentRow[]>(`SELECT * FROM ${moduleConfig.table} WHERE id = ? LIMIT 1`, [id]);
  if (!rows[0]) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  return NextResponse.json({ module: moduleConfig, row: rows[0] });
}

export async function PUT(request: Request, { params }: Params) {
  const user = getUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { module: moduleSlug, id } = await params;
  const moduleConfig = getAdminContentModule(moduleSlug);
  if (!moduleConfig) {
    return NextResponse.json({ error: "Unknown module." }, { status: 404 });
  }

  const body = await request.json();
  for (const field of moduleConfig.fields) {
    if (field.required && !String(body[field.key] ?? "").trim()) {
      return NextResponse.json({ error: `${field.label} is required.` }, { status: 400 });
    }
  }

  const assignments = moduleConfig.fields.map((field) => `${field.key} = ?`);
  const values = moduleConfig.fields.map((field) => normalizeValue(body[field.key]));
  values.push(id);

  await execute(`UPDATE ${moduleConfig.table} SET ${assignments.join(", ")} WHERE id = ?`, values);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: Params) {
  const user = getUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { module: moduleSlug, id } = await params;
  const moduleConfig = getAdminContentModule(moduleSlug);
  if (!moduleConfig) {
    return NextResponse.json({ error: "Unknown module." }, { status: 404 });
  }

  await execute(`DELETE FROM ${moduleConfig.table} WHERE id = ?`, [id]);
  return NextResponse.json({ success: true });
}
