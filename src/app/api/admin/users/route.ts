import { NextResponse } from "next/server";
import { getAllAdminUsers } from "@/lib/db";
import { parseAuthCookieHeader, getSessionUserFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieValue = parseAuthCookieHeader(request.headers.get("cookie"));
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await getAllAdminUsers();
  return NextResponse.json({ users });
}
