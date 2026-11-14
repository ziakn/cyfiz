import { query } from "@/lib/db";
import { requirePage } from "@/lib/rbac";
import type { PermissionMap } from "@/lib/permissions";
import RoleList, { type RoleRow } from "./RoleList";

export const dynamic = "force-dynamic";

interface PermRow { role_id: number; module: string; can_view: number; can_create: number; can_update: number; can_delete: number }

export default async function AdminRolesPage() {
  const ctx = await requirePage("roles");

  const [roles, grants] = await Promise.all([
    query<(Omit<RoleRow, "permissions" | "userCount"> & { user_count: number })[]>(
      `SELECT r.id, r.name, r.slug, r.description, r.is_super, r.is_system, COUNT(u.id) AS user_count
       FROM roles r LEFT JOIN admin_users u ON u.role_id = r.id GROUP BY r.id ORDER BY r.is_super DESC, r.is_system DESC, r.name ASC`
    ),
    query<PermRow[]>("SELECT role_id, module, can_view, can_create, can_update, can_delete FROM role_permissions"),
  ]);

  const byRole = new Map<number, PermissionMap>();
  for (const g of grants) {
    const m = byRole.get(g.role_id) ?? {};
    m[g.module] = { view: !!g.can_view, create: !!g.can_create, update: !!g.can_update, delete: !!g.can_delete };
    byRole.set(g.role_id, m);
  }

  const rows: RoleRow[] = roles.map((r) => ({
    id: r.id, name: r.name, slug: r.slug, description: r.description, is_super: r.is_super, is_system: r.is_system,
    userCount: Number(r.user_count), permissions: byRole.get(r.id) ?? {},
  }));

  return <RoleList initial={rows} actorIsSuper={ctx.user.isSuper} />;
}
