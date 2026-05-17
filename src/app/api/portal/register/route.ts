import { NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { execute, query } from "@/lib/db";
import { createPortalToken, hashPortalPassword, PORTAL_COOKIE_MAX_AGE, PORTAL_COOKIE_NAME } from "@/lib/portalAuth";
import { isSecureRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!firstName || !lastName || !email || password.length < 6) {
    return NextResponse.json({ error: "Name, email, and a 6+ character password are required." }, { status: 400 });
  }

  const existing = await query<RowDataPacket[]>("SELECT id FROM portal_users WHERE email = ? LIMIT 1", [email]);
  if (existing.length > 0) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const result = await execute(
    "INSERT INTO portal_users (first_name, last_name, email, password_hash, status) VALUES (?, ?, ?, ?, 1)",
    [firstName, lastName, email, hashPortalPassword(password)]
  ) as ResultSetHeader;

  const name = `${firstName} ${lastName}`;
  const token = createPortalToken({ id: result.insertId, email, name });
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
