import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "cyfiz_admin";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  // public admin routes
  if (pathname === "/admin" || pathname === "/admin/login" || pathname === "/admin/logout") {
    return NextResponse.next();
  }

  // protect all admin child routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
