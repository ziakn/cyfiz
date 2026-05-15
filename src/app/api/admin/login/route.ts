import { NextResponse } from "next/server";
import { getAdminUserByEmail } from "@/lib/db";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME, comparePassword, createAuthToken, isSecureRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await getAdminUserByEmail(email);
  if (!user || !comparePassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = createAuthToken({ id: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isSecureRequest(request),
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}
