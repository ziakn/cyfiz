import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, isSecureRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: isSecureRequest(request),
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  return response;
}
