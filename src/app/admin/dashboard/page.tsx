import Link from "next/link";
import { query } from "@/lib/db";
import { can, requireAdminContext } from "@/lib/rbac";
import { moduleByKey } from "@/lib/permissions";

export const dynamic = "force-dynamic";

interface CountRow { count: number }

async function count(sql: string) {
  try {
    const rows = await query<CountRow[]>(sql);
    return Number(rows[0]?.count ?? 0);
  } catch {
    return 0; // table missing until migration_v2_design.sql has been run
  }
}

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const ctx = await requireAdminContext();
  const { denied } = await searchParams;
  const deniedModule = denied ? moduleByKey(denied) : null;

  const [articles, trainings, newMessages, subscribers, quizzes, learners] = await Promise.all([
    count("SELECT COUNT(*) AS count FROM articles WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM trainings WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM contact_messages WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM newsletter_subscribers WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM quizzes WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM portal_users"),
  ]);

  const stats = [
    { module: "articles", label: "Published articles", value: articles, href: "/admin/articles", color: "#9155FD" },
    { module: "trainings", label: "Trainings", value: trainings, href: "/admin/trainings", color: "#03C3EC" },
    { module: "messages", label: "New messages", value: newMessages, href: "/admin/messages", color: "#FF4C51" },
    { module: "subscribers", label: "Subscribers", value: subscribers, href: "/admin/subscribers", color: "#56CA00" },
    { module: "quizzes", label: "Live quizzes", value: quizzes, href: "/admin/quiz", color: "#FFB400" },
    { module: "portal_users", label: "Portal learners", value: learners, href: "/admin/portal-users", color: "#9155FD" },
  ].filter((x) => can(ctx, x.module, "view"));

  return (
    <div className="space-y-8">
      {deniedModule && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          Your role doesn&apos;t have access to {deniedModule.label}. Ask a Super Admin if you need it.
        </div>
      )}
      <div className="rounded-lg bg-[#0C0D10] p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, {ctx.user.email.split("@")[0]}</h1>
        <p className="mt-2 text-white/80">Signed in as {ctx.user.roleName}. Manage everything shown on the public Cyfiz site from here.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider">
          {can(ctx, "articles", "create") && <Link href="/admin/articles" className="rounded-md bg-[#FFC21A] px-5 py-2 text-[#0C0D10]">New article</Link>}
          {can(ctx, "trainings", "create") && <Link href="/admin/trainings" className="rounded-md bg-white/20 px-5 py-2">New training</Link>}
          <Link href="/" target="_blank" className="rounded-md bg-white/20 px-5 py-2">View site</Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] transition-transform hover:-translate-y-0.5">
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="mt-1 text-sm text-[#3A3541] opacity-70">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
