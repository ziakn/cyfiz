import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { serialize, parse } from "cookie";

export const AUTH_COOKIE_NAME = "cyfiz_admin";
const JWT_SECRET = process.env.JWT_SECRET ?? "replace_this_secret";
const TOKEN_EXPIRY = "8h";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}

export function createAuthToken(payload: { id: number; email: string; role: string }) {
  return sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyAuthToken(token: string) {
  return verify(token, JWT_SECRET) as { id: number; email: string; role: string; iat: number; exp: number };
}

export function createAuthCookie(token: string) {
  return serialize(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
    sameSite: "lax",
  });
}

export function clearAuthCookie() {
  return serialize(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}

export function getSessionUserFromCookie(cookieValue: string | undefined | null) {
  if (!cookieValue) {
    return null;
  }

  try {
    return verifyAuthToken(cookieValue);
  } catch {
    return null;
  }
}

export function parseAuthCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return null;
  }
  const parsed = parse(cookieHeader);
  return parsed[AUTH_COOKIE_NAME] ?? null;
}
