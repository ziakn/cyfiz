import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "./auth";
import { query } from "./db";
import {
  ALL_PERMS, MODULE_KEYS, NO_PERMS,
  type Action, type ModulePerms, type PermissionMap,
} from "./permissions";

export interface AdminContext {
  user: { id: number; email: string; roleId: number | null; roleName: string; isSuper: boolean };
  perms: PermissionMap;
}

interface UserRow { id: number; email: string; status: number; role: string; role_id: number | null; role_name: string | null; is_super: number | null; role_status: number | null }
interface PermRow { module: string; can_view: number; can_create: number; can_update: number; can_delete: number }

function allPerms(): PermissionMap {
  return Object.fromEntries(MODULE_KEYS.map((k) => [k, { ...ALL_PERMS }]));
}

/**
 * Resolves the logged-in admin and what their role allows. Reads the database on every
 * request (cached per request), so role changes and deactivations apply immediately.
 */
export const getAdminContext = cache(async (): Promise<AdminContext | null> => {
  const store = await cookies();
  const session = getSessionUserFromCookie(store.get(AUTH_COOKIE_NAME)?.value ?? null);
  if (!session) return null;

  let row: UserRow | undefined;
  try {
    const rows = await query<UserRow[]>(
      `SELECT u.id, u.email, u.status, u.role, u.role_id, r.name AS role_name, r.is_super, r.status AS role_status
       FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = ? LIMIT 1`,
      [session.id]
    );
    row = rows[0];
  } catch {
    // roles tables not migrated yet: fall back to the legacy single `role` column so nobody is locked out.
    const rows = await query<UserRow[]>("SELECT id, email, status, role, NULL AS role_id, NULL AS role_name, NULL AS is_super, NULL AS role_status FROM admin_users WHERE id = ? LIMIT 1", [session.id]);
    row = rows[0];
    if (row) {
      const legacySuper = String(row.role).toLowerCase() === "admin";
      return {
        user: { id: row.id, email: row.email, roleId: null, roleName: row.role, isSuper: legacySuper },
        perms: legacySuper ? allPerms() : {},
      };
    }
  }

  if (!row || row.status === 0) return null; // deleted or deactivated accounts lose access at once

  const roleActive = row.role_id != null && row.role_status !== 0;
  const isSuper = roleActive && row.is_super === 1;
  let perms: PermissionMap = {};

  if (isSuper) {
    perms = allPerms();
  } else if (roleActive) {
    const grants = await query<PermRow[]>(
      "SELECT module, can_view, can_create, can_update, can_delete FROM role_permissions WHERE role_id = ?",
      [row.role_id]
    );
    for (const g of grants) {
      perms[g.module] = { view: !!g.can_view, create: !!g.can_create, update: !!g.can_update, delete: !!g.can_delete };
    }
  }

  return {
    user: { id: row.id, email: row.email, roleId: row.role_id, roleName: row.role_name ?? row.role, isSuper },
    perms,
  };
});

export function modulePerms(ctx: AdminContext | null, module: string): ModulePerms {
  if (!ctx) return { ...NO_PERMS };
  const p = ctx.perms[module];
  if (!p) return { ...NO_PERMS };
  // create/update/delete are only meaningful with view
  return p.view ? p : { ...NO_PERMS };
}

export function can(ctx: AdminContext | null, module: string, action: Action) {
  return modulePerms(ctx, module)[action];
}

const VERB: Record<Action, string> = { view: "view", create: "add to", update: "change", delete: "delete from" };

/** For server actions: returns an `{ error }` to hand back to the UI, or null when allowed. */
export type Denied = { error: string; success?: undefined };

export async function guard(module: string, action: Action): Promise<Denied | null> {
  const ctx = await getAdminContext();
  if (!ctx) return { error: "Your session has expired. Please log in again." };
  if (!can(ctx, module, action)) return { error: `You don't have permission to ${VERB[action]} this module.` };
  return null;
}

/** For admin pages: sends the user to login / the dashboard when they may not view the module. */
export async function requirePage(module: string) {
  const ctx = await getAdminContext();
  if (!ctx) redirect("/admin/login");
  if (!can(ctx, module, "view")) redirect(`/admin/dashboard?denied=${encodeURIComponent(module)}`);
  return ctx;
}

/** Any logged-in, active admin (no module needed). */
export async function requireAdminContext() {
  const ctx = await getAdminContext();
  if (!ctx) redirect("/admin/login");
  return ctx;
}
