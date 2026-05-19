import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Image from "next/image";
import Link from "next/link";

interface TeamMember extends RowDataPacket {
  id: number;
  initials: string;
  name: string;
  role: string;
  image_url?: string | null;
  bio?: string | null;
  expertise?: string | null;
  portfolio_highlights?: string | null;
  portfolio_url?: string | null;
}

function formatList(value?: string | null) {
  return value
    ? value
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

async function getTeamMember(id: string) {
  const memberId = id.split("-")[0];
  const rows = await query<TeamMember[]>(
    "SELECT id, initials, name, role, image_url, bio, expertise, portfolio_highlights, portfolio_url FROM team_members WHERE id = ? AND status = 1 LIMIT 1",
    [memberId]
  );
  return rows[0];
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getTeamMember(id);

  if (!member) {
    notFound();
  }

  const expertise = formatList(member.expertise);
  const highlights = formatList(member.portfolio_highlights);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-white px-4 pt-24 pb-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link href="/connect" className="text-sm font-bold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
              Back to Connect
            </Link>

            <div className="mt-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Team Profile</p>
                <h1 className="mt-3 text-5xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl leading-[1.05]">
                  {member.name}
                </h1>
                <p className="mt-2 text-lg font-semibold text-zinc-500 dark:text-zinc-400">{member.role}</p>
                {member.bio && (
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {member.bio}
                  </p>
                )}

                {member.portfolio_url && (
                  <div className="mt-6">
                    <Link
                      href={member.portfolio_url}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-zinc-700 hover:scale-105 active:scale-95 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      Visit Portfolio
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>

              <div className="w-full max-w-xs shrink-0">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003056] p-8 shadow-2xl">
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white/10 text-6xl font-black text-white">
                    {member.image_url ? (
                      <Image src={member.image_url} alt={member.name} width={320} height={320} className="h-full w-full object-cover" />
                    ) : (
                      member.initials
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {expertise.length > 0 && (
          <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Expertise</h2>
              <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Skills & Tools</h3>
              <div className="mt-10 flex flex-wrap gap-3">
                {expertise.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {highlights.length > 0 && (
          <section className="bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Work</h2>
              <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Portfolio Highlights</h3>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm font-medium leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
