import { NextResponse } from "next/server";
import { getAllAdminUsers } from "@/lib/db";
import { can, getAdminContext } from "@/lib/rbac";

export async function GET() {
  const ctx = await getAdminContext();
  if (!ctx) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!can(ctx, "admin_users", "view")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await getAllAdminUsers();
  return NextResponse.json({ users });
}
