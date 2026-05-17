import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { isSecureRequest } from "@/lib/auth";
import { query } from "@/lib/db";
import { comparePortalPassword, createPortalToken, PORTAL_COOKIE_MAX_AGE, PORTAL_COOKIE_NAME } from "@/lib/portalAuth";

interface PortalUserRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const users = await query<PortalUserRow[]>(
    "SELECT id, first_name, last_name, email, password_hash FROM portal_users WHERE email = ? AND status = 1 LIMIT 1",
    [email]
  );
  const user = users[0];
  if (!user || !comparePortalPassword(password, user.password_hash)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = createPortalToken({ id: user.id, email: user.email, name: `${user.first_name} ${user.last_name}` });
  const response = NextResponse.json({ success: true });
  response.cookies.set(PORTAL_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isSecureRequest(request),
    path: "/",
    maxAge: PORTAL_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}
