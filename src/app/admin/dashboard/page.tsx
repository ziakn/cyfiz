import Link from "next/link";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";

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

export default async function AdminDashboardPage() {
  const store = await cookies();
  const user = getSessionUserFromCookie(store.get(AUTH_COOKIE_NAME)?.value ?? null);

  const [articles, trainings, newMessages, subscribers, quizzes, learners] = await Promise.all([
    count("SELECT COUNT(*) AS count FROM articles WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM trainings WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM contact_messages WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM newsletter_subscribers WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM quizzes WHERE status = 1"),
    count("SELECT COUNT(*) AS count FROM portal_users"),
  ]);

  const stats = [
    { label: "Published articles", value: articles, href: "/admin/articles", color: "#9155FD" },
    { label: "Trainings", value: trainings, href: "/admin/trainings", color: "#03C3EC" },
    { label: "New messages", value: newMessages, href: "/admin/messages", color: "#FF4C51" },
    { label: "Subscribers", value: subscribers, href: "/admin/subscribers", color: "#56CA00" },
    { label: "Live quizzes", value: quizzes, href: "/admin/quiz", color: "#FFB400" },
    { label: "Portal learners", value: learners, href: "/admin/portal-users", color: "#9155FD" },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-[#0C0D10] p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, {(user?.email ?? "admin").split("@")[0]}</h1>
        <p className="mt-2 text-white/80">Manage everything shown on the public Cyfiz site from here.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider">
          <Link href="/admin/articles" className="rounded-md bg-[#FFC21A] px-5 py-2 text-[#0C0D10]">New article</Link>
          <Link href="/admin/trainings" className="rounded-md bg-white/20 px-5 py-2">New training</Link>
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
