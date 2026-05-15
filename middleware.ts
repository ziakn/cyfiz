import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "cyfiz_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAdminRoot = pathname === "/admin";
  const isLoginPage = pathname === "/admin/login";
  const isLogoutPage = pathname === "/admin/logout";

  if ((isAdminRoot || isLoginPage) && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminRoot && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (!isLoginPage && !isLogoutPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
