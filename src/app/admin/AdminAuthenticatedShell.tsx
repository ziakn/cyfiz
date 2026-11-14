"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { AdminPermissionsProvider } from "@/components/admin/AdminPermissions";
import { MODULES, type PermissionMap } from "@/lib/permissions";

interface AdminAuthenticatedShellProps {
  children: React.ReactNode;
  user: {
    email: string;
    role: string;
  };
  permissions: PermissionMap;
}

const navClass = (active: boolean) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]${active ? " admin-nav-active" : ""}`;

export default function AdminAuthenticatedShell({ children, user, permissions }: AdminAuthenticatedShellProps) {
  const pathname = usePathname();
  const groups = Array.from(new Set(MODULES.map((m) => m.group)))
    .map((name) => ({ name, items: MODULES.filter((m) => m.group === name && permissions[m.key]?.view) }))
    .filter((g) => g.items.length > 0);

  if (pathname === "/admin" || pathname === "/admin/login") {
    return (
      <div className="admin-root relative min-h-screen bg-[#F6F6F3] text-[#3A3541]">
        <main className="relative z-0">{children}</main>
      </div>
    );
  }

  return (
    <AdminPermissionsProvider value={permissions}>
    <div className="admin-root flex min-h-screen bg-[#F6F6F3] text-[#3A3541]">
      <aside className="admin-side fixed inset-y-0 left-0 z-20 w-64 bg-[#0C0D10] shadow-[0_4px_24px_0_rgba(58,53,65,0.1)] transition-transform sm:translate-x-0">
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          <div className="mb-8 flex items-center gap-3 px-2">
            <img src="/logo-cyfiz.png" alt="Cyfiz Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold uppercase tracking-tight text-[#3A3541] opacity-[0.87]">Cyfiz Admin</span>
          </div>

          <nav className="flex-1 space-y-1">
            <Link href="/admin/dashboard" className={navClass(pathname === "/admin/dashboard")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
            </Link>

            {groups.map((g) => (
              <div key={g.name} className="pt-4">
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">{g.name}</p>
                <div className="mt-2 space-y-1">
                  {g.items.map((m) => (
                    <Link key={m.key} href={m.href} className={navClass(pathname.startsWith(m.href))}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle></svg>
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto border-t border-[#3A3541] border-opacity-[0.12] pt-4">
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9155FD] text-[10px] font-bold uppercase text-white">
                {user.email[0]}
              </div>
              <div className="flex-1 overflow-hidden text-xs">
                <p className="truncate font-semibold text-[#3A3541] opacity-[0.87]">{user.email}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#3A3541] opacity-[0.38]">{user.role}</p>
              </div>
            </div>
            <LogoutButton className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-[#FF4D49] transition-colors hover:bg-red-50 disabled:opacity-70">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </LogoutButton>
          </div>
        </div>
      </aside>

      <div className="flex-1 sm:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-8 shadow-[0_2px_10px_0_rgba(58,53,65,0.05)]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#3A3541] opacity-[0.38]">Admin Portal</span>
            <span className="text-[#3A3541] opacity-[0.12]">/</span>
            <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">Cyfiz</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#3A3541] opacity-[0.6] hover:text-[#9155FD]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </button>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
    </AdminPermissionsProvider>
  );
}
