"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

interface AdminAuthenticatedShellProps {
  children: React.ReactNode;
  user: {
    email: string;
    role: string;
  };
}

export default function AdminAuthenticatedShell({ children, user }: AdminAuthenticatedShellProps) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname === "/admin/login") {
    return (
      <div className="relative min-h-screen bg-[#F4F5FA] text-[#3A3541]">
        <main className="relative z-0">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F5FA] text-[#3A3541]">
      <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-[0_4px_24px_0_rgba(58,53,65,0.1)] transition-transform sm:translate-x-0">
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          <div className="mb-8 flex items-center gap-3 px-2">
            <img src="/logo-transparent.png" alt="Cyfiz Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold uppercase tracking-tight text-[#3A3541] opacity-[0.87]">Cyfiz Admin</span>
          </div>

          <nav className="flex-1 space-y-1">
            <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard
            </Link>

            <div className="pt-4">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Content Management</p>
              <div className="mt-2 space-y-1">
                <Link href="/admin/articles" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  Articles
                </Link>
                <Link href="/admin/summaries" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Summaries
                </Link>
                <Link href="/admin/portfolio" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Portfolio (Profile)
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Apps & Features</p>
              <div className="mt-2 space-y-1">
                <Link href="/admin/quiz" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Quizzes
                </Link>
                <Link href="/admin/leaderboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                  Leaderboard
                </Link>
                <Link href="/admin/team" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Team Members
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Administration</p>
              <div className="mt-2 space-y-1">
                <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  User Management
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  Settings
                </Link>
              </div>
            </div>
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
            <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">Dashboard</span>
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
  );
}
