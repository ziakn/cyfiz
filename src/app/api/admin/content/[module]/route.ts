import { NextResponse } from "next/server";
import { execute, query } from "@/lib/db";
import { getAdminContentModule } from "@/lib/adminContent";
import { getSessionUserFromCookie, parseAuthCookieHeader } from "@/lib/auth";

type Params = { params: Promise<{ module: string }> };
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

  const { module: moduleSlug } = await params;
  const moduleConfig = getAdminContentModule(moduleSlug);
  if (!moduleConfig) {
    return NextResponse.json({ error: "Unknown module." }, { status: 404 });
  }

  const rows = await query<ContentRow[]>(
    `SELECT * FROM ${moduleConfig.table} ORDER BY ${moduleConfig.orderBy ?? "id DESC"}`
  );

  return NextResponse.json({ module: moduleConfig, rows });
}

export async function POST(request: Request, { params }: Params) {
  const user = getUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { module: moduleSlug } = await params;
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

  const columns = moduleConfig.fields.map((field) => field.key);
  const placeholders = columns.map(() => "?").join(", ");
  const values = columns.map((column) => normalizeValue(body[column]));
  const result = await execute(
    `INSERT INTO ${moduleConfig.table} (${columns.join(", ")}) VALUES (${placeholders})`,
    values
  );

  return NextResponse.json({ success: true, id: result.insertId });
}
