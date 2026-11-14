import { getAdminContext } from "./rbac";

/** Throws unless the request carries a valid, active admin session. Prefer `guard(module, action)` from ./rbac. */
export async function requireAdmin() {
  const ctx = await getAdminContext();
  if (!ctx) throw new Error("Unauthorized");
  return ctx.user;
}
