import { parse, serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { comparePassword, hashPassword } from "./auth";

export const PORTAL_COOKIE_NAME = "cyfiz_portal";
const JWT_SECRET = process.env.JWT_SECRET ?? "replace_this_secret";
const PORTAL_LIFETIME_DAYS = 3650;
const TOKEN_EXPIRY = `${PORTAL_LIFETIME_DAYS}d`;
export const PORTAL_COOKIE_MAX_AGE = PORTAL_LIFETIME_DAYS * 24 * 60 * 60;

export interface PortalSessionUser {
  id: number;
  email: string;
  name: string;
}

export function hashPortalPassword(password: string) {
  return hashPassword(password);
}

export function comparePortalPassword(password: string, hashed: string) {
  return comparePassword(password, hashed);
}

export function createPortalToken(payload: PortalSessionUser) {
  return sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyPortalToken(token: string) {
  return verify(token, JWT_SECRET) as PortalSessionUser & { iat: number; exp: number };
}

export function createPortalCookie(token: string) {
  return serialize(PORTAL_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: PORTAL_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

export function clearPortalCookie() {
  return serialize(PORTAL_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}

export function getPortalUserFromCookie(cookieValue: string | undefined | null) {
  if (!cookieValue) return null;

  try {
    return verifyPortalToken(cookieValue);
  } catch {
    return null;
  }
}

export function parsePortalCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const parsed = parse(cookieHeader);
  return parsed[PORTAL_COOKIE_NAME] ?? null;
}
