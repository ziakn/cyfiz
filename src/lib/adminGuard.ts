import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "./auth";

/** Throws unless the request carries a valid admin session. Use at the top of every admin server action. */
export async function requireAdmin() {
  const store = await cookies();
  const user = getSessionUserFromCookie(store.get(AUTH_COOKIE_NAME)?.value ?? null);
  if (!user) throw new Error("Unauthorized");
  return user;
}
