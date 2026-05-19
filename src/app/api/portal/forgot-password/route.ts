import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import { createPortalPasswordResetToken } from "@/lib/portalAuth";
import { sendPortalPasswordResetEmail } from "@/lib/mail";

interface PortalResetUserRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
}

function getBaseUrl(request: Request) {
  return process.env.NEXT_PUBLIC_SITE_URL ?? request.headers.get("origin") ?? new URL(request.url).origin;
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const users = await query<PortalResetUserRow[]>(
    "SELECT id, email, password_hash FROM portal_users WHERE email = ? AND status = 1 LIMIT 1",
    [email]
  );
  const user = users[0];

  if (!user) {
    return NextResponse.json({ error: "Email does not exist." }, { status: 404 });
  }

  const token = createPortalPasswordResetToken({ id: user.id, email: user.email, passwordHash: user.password_hash });
  const resetUrl = new URL("/portal/reset-password", getBaseUrl(request));
  resetUrl.searchParams.set("token", token);
  await sendPortalPasswordResetEmail(user.email, resetUrl.toString());

  return NextResponse.json({ success: true });
}
