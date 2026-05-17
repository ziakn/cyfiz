import { NextResponse } from "next/server";
import { clearPortalCookie, PORTAL_COOKIE_NAME } from "@/lib/portalAuth";

function redirectToPortalLogin() {
  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/portal/login" },
  });
}

export async function POST() {
  const response = redirectToPortalLogin();
  response.headers.set("Set-Cookie", clearPortalCookie());
  return response;
}

export async function GET() {
  const response = redirectToPortalLogin();
  response.cookies.set(PORTAL_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}
