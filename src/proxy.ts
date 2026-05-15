import { NextResponse, type NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const AUTH_COOKIE_NAME = "cyfiz_admin";
const JWT_SECRET = process.env.JWT_SECRET ?? "replace_this_secret";

function hasValidAdminSession(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  try {
    verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const isLoginRoute = request.nextUrl.pathname === "/admin";
  const isLogoutRoute = request.nextUrl.pathname === "/admin/logout";
  const hasSession = hasValidAdminSession(request);

  if (isLoginRoute && hasSession) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!isLoginRoute && !isLogoutRoute && !hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
