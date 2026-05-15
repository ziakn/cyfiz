import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import AdminAuthenticatedShell from "./AdminAuthenticatedShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <AdminAuthenticatedShell user={{ email: user.email, role: user.role }}>
      {children}
    </AdminAuthenticatedShell>
  );
}