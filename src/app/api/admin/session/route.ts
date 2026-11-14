import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/rbac";

export async function GET() {
  const ctx = await getAdminContext();
  if (!ctx) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user: ctx.user, permissions: ctx.perms });
}
