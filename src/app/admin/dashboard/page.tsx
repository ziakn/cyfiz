import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { getAllAdminUsers, getAllModules } from "@/lib/db";

interface ModuleItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminUser {
  id: number;
  email: string;
  role: string;
  createdAt: string;
}

export default async function AdminDashboardPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const [modules, users] = (await Promise.all([getAllModules(), getAllAdminUsers()])) as [ModuleItem[], AdminUser[]];

  const stats = [
    { label: "Articles", value: "24", icon: "📄", color: "#9155FD" },
    { label: "Active Quizzes", value: "12", icon: "🏆", color: "#56CA00" },
    { label: "Team Members", value: "6", icon: "👥", color: "#03C3EC" },
    { label: "Admin Users", value: users.length.toString(), icon: "👤", color: "#FFB400" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-lg bg-[#9155FD] p-8 text-white shadow-[0_4px_24px_0_rgba(145,85,253,0.3)]">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-bold">Welcome back, {user.email.split('@')[0]}! 🚀</h1>
          <p className="mt-2 text-white text-opacity-80">
            You have {modules.length} modules active. Check the leaderboard for the latest quiz updates.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/admin/articles" className="rounded-md bg-white px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#9155FD] shadow-lg transition-transform hover:scale-105">
              Add New Article
            </Link>
            <Link href="/admin/logout" className="rounded-md border border-white border-opacity-40 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:bg-opacity-10">
              Logout Session
            </Link>
          </div>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-white opacity-5"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#3A3541] opacity-[0.87]">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-8 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
          <h2 className="mb-6 text-xl font-semibold text-[#3A3541] opacity-[0.87]">Content Management</h2>
          <div className="space-y-4">
            <Link href="/admin/articles" className="flex items-center justify-between rounded-lg border border-[#3A3541] border-opacity-[0.12] p-4 transition-colors hover:bg-[#F9FAFB]">
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <div>
                  <p className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">Manage Articles</p>
                  <p className="text-[10px] text-[#3A3541] opacity-[0.38]">Create and edit blog posts</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-[0.38]"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Link>
            <Link href="/admin/summaries" className="flex items-center justify-between rounded-lg border border-[#3A3541] border-opacity-[0.12] p-4 transition-colors hover:bg-[#F9FAFB]">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔬</span>
                <div>
                  <p className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">Research Summaries</p>
                  <p className="text-[10px] text-[#3A3541] opacity-[0.38]">Curate technical research</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-[0.38]"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
          <h2 className="mb-6 text-xl font-semibold text-[#3A3541] opacity-[0.87]">Platform Features</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/quiz" className="flex flex-col items-center justify-center rounded-lg border border-[#3A3541] border-opacity-[0.12] p-4 transition-all hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                <span className="text-xl mb-1">🏆</span>
                <span className="text-xs font-bold uppercase tracking-wider">Quizzes</span>
              </Link>
              <Link href="/admin/leaderboard" className="flex flex-col items-center justify-center rounded-lg border border-[#3A3541] border-opacity-[0.12] p-4 transition-all hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                <span className="text-xl mb-1">📊</span>
                <span className="text-xs font-bold uppercase tracking-wider">Ranking</span>
              </Link>
              <Link href="/admin/team" className="flex flex-col items-center justify-center rounded-lg border border-[#3A3541] border-opacity-[0.12] p-4 transition-all hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                <span className="text-xl mb-1">👥</span>
                <span className="text-xs font-bold uppercase tracking-wider">Team</span>
              </Link>
              <Link href="/admin/users" className="flex flex-col items-center justify-center rounded-lg border border-[#3A3541] border-opacity-[0.12] p-4 transition-all hover:bg-[#F9FAFB] hover:text-[#9155FD]">
                <span className="text-xl mb-1">👤</span>
                <span className="text-xs font-bold uppercase tracking-wider">Admins</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
