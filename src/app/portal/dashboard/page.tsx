import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";
import { getPublishedQuizzes, getRecentAttempts, getRegisteredQuizzes, getRequiredPortalUser } from "@/lib/quizPortal";
import QuizCards from "../QuizCards";

export default async function PortalDashboardPage() {
  const user = await getRequiredPortalUser();
  const [registered, allQuizzes, attempts] = await Promise.all([
    getRegisteredQuizzes(user.id),
    getPublishedQuizzes(user.id),
    getRecentAttempts(user.id),
  ]);

  return (
    <PortalShell user={user}>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black">Welcome back, {user.name}!</h1>
        </div>

        <section className="rounded-2xl bg-gradient-to-br from-[#5D39F2] to-[#B287FF] p-8 text-white shadow-lg">
          <p className="text-xs font-black uppercase tracking-widest text-white/70">Continue where you left off</p>
          <h2 className="mt-2 text-2xl font-black">{registered[0]?.title ?? "Register for your first quiz"}</h2>
          <p className="mt-3 max-w-xl text-sm text-white/75">
            Attend multiple quizzes, save questions, review explanations, and take timed exam attempts from your portal.
          </p>
          <Link href={registered[0] ? `/portal/quizzes/${registered[0].id}` : "/portal/quizzes"} className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-black text-[#2B167C]">
            {registered[0] ? "Continue Studying" : "Browse Quizzes"}
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-black">Available Quizzes</h2>
          <div className="mt-4">
            <QuizCards quizzes={allQuizzes} />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Recent Attempts</h2>
          <div className="mt-4 divide-y divide-zinc-100">
            {attempts.length === 0 ? (
              <p className="py-4 text-sm text-zinc-500">No completed attempts yet.</p>
            ) : (
              attempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-bold">{attempt.quiz_title}</p>
                    <p className="text-sm text-zinc-500">{attempt.correct_answers}/{attempt.total_questions} correct · {attempt.mode}</p>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-black">{Number(attempt.score_percentage).toFixed(0)}%</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
