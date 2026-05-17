import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { comparePortalPassword, getPortalUserFromCookie, hashPortalPassword, parsePortalCookieHeader } from "@/lib/portalAuth";
import { execute, query } from "@/lib/db";

interface PortalPasswordRow extends RowDataPacket {
  password_hash: string;
}

export async function POST(request: Request) {
  const user = getPortalUserFromCookie(parsePortalCookieHeader(request.headers.get("cookie")));
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const currentPassword = String(body.currentPassword ?? "");
  const newPassword = String(body.newPassword ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!currentPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "Current password and a 6+ character new password are required." }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "New passwords do not match." }, { status: 400 });
  }

  const rows = await query<PortalPasswordRow[]>(
    "SELECT password_hash FROM portal_users WHERE id = ? AND status = 1 LIMIT 1",
    [user.id]
  );

  const portalUser = rows[0];
  if (!portalUser || !comparePortalPassword(currentPassword, portalUser.password_hash)) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  await execute("UPDATE portal_users SET password_hash = ? WHERE id = ?", [hashPortalPassword(newPassword), user.id]);
  return NextResponse.json({ success: true });
}
