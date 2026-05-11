import { NextResponse } from "next/server";
import { getAdminUserByEmail } from "@/lib/db";
import { comparePassword, createAuthCookie, createAuthToken } from "@/lib/auth";

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
  response.headers.append("Set-Cookie", createAuthCookie(token));
  return response;
}
