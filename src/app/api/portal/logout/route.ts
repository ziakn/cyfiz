import { NextResponse } from "next/server";
import { clearPortalCookie, PORTAL_COOKIE_NAME } from "@/lib/portalAuth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/portal/login", request.url));
  response.headers.set("Set-Cookie", clearPortalCookie());
  return response;
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/portal/login", request.url));
  response.cookies.set(PORTAL_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
