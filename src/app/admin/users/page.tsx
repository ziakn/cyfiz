import { getAllAdminUsers, query } from "@/lib/db";
import { requirePage } from "@/lib/rbac";
import UserList, { type RoleOption } from "./UserList";

export const dynamic = "force-dynamic";

interface AdminUser {
  id: number;
  email: string;
  role: string;
  roleId: number | null;
  roleName: string;
  status: number;
  createdAt: string;
}

export default async function AdminUsersPage() {
  const ctx = await requirePage("admin_users");
  const users = (await getAllAdminUsers()) as AdminUser[];
  const roles = await query<RoleOption[]>("SELECT id, name FROM roles WHERE status = 1 ORDER BY is_super DESC, name ASC").catch(() => []);

  return <UserList initialUsers={users} currentUserEmail={ctx.user.email} roles={roles} />;
}
