import { NextResponse } from "next/server";
import { getAllModules, createModule } from "@/lib/db";
import { parseAuthCookieHeader, getSessionUserFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const modules = await getAllModules();
  return NextResponse.json({ modules });
}

export async function POST(request: Request) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = String(body.slug ?? "").trim();
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const content = String(body.content ?? "").trim();
  const status = String(body.status ?? "draft");

  if (!slug || !title) {
    return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
  }

  const insertId = await createModule({ slug, title, description, content, status });
  return NextResponse.json({ success: true, id: insertId });
}
