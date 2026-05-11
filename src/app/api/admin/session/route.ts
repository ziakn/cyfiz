import { NextResponse } from "next/server";
import { parseAuthCookieHeader, getSessionUserFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
