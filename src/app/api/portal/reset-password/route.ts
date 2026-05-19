import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { execute, query } from "@/lib/db";
import { hashPortalPassword, verifyPortalPasswordResetToken } from "@/lib/portalAuth";

interface PortalResetUserRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const token = String(body.token ?? "").trim();
  const newPassword = String(body.newPassword ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!token || newPassword.length < 6) {
    return NextResponse.json({ error: "Reset link and a 6+ character password are required." }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "New passwords do not match." }, { status: 400 });
  }

  try {
    const unsafePayload = JSON.parse(Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8")) as { id?: number };
    if (!unsafePayload.id) {
      return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
    }

    const users = await query<PortalResetUserRow[]>(
      "SELECT id, email, password_hash FROM portal_users WHERE id = ? AND status = 1 LIMIT 1",
      [unsafePayload.id]
    );
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
    }

    const payload = verifyPortalPasswordResetToken(token, user.password_hash);
    if (!payload || payload.id !== user.id || payload.email !== user.email) {
      return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
    }

    await execute("UPDATE portal_users SET password_hash = ? WHERE id = ?", [hashPortalPassword(newPassword), user.id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
  }
}
