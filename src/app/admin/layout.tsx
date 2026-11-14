import "./admin.css";
import AdminAuthenticatedShell from "./AdminAuthenticatedShell";
import { getAdminContext } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getAdminContext();

  if (!ctx) {
    return <>{children}</>;
  }

  return (
    <AdminAuthenticatedShell user={{ email: ctx.user.email, role: ctx.user.roleName }} permissions={ctx.perms}>
      {children}
    </AdminAuthenticatedShell>
  );
}
