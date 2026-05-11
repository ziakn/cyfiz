import { NextResponse } from "next/server";
import { getModuleById, updateModule, deleteModule } from "@/lib/db";
import { parseAuthCookieHeader, getSessionUserFromCookie } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const moduleItem = await getModuleById(id);
  if (!moduleItem) {
    return NextResponse.json({ error: "Module not found." }, { status: 404 });
  }

  return NextResponse.json({ module: moduleItem });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  await updateModule(id, {
    title: body.title,
    description: body.description,
    content: body.content,
    status: body.status,
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteModule(id);
  return NextResponse.json({ success: true });
}
