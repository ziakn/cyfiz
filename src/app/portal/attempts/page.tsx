import PortalShell from "@/components/portal/PortalShell";
import { getRecentAttempts, getRequiredPortalUser } from "@/lib/quizPortal";

export default async function PortalAttemptsPage() {
  const user = await getRequiredPortalUser();
  const attempts = await getRecentAttempts(user.id);

  return (
    <PortalShell user={user}>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Attempts</p>
        <h1 className="mt-2 text-3xl font-black">Quiz Results</h1>
        <div className="mt-6 divide-y divide-zinc-100">
          {attempts.length === 0 ? (
            <p className="py-4 text-sm text-zinc-500">No attempts yet.</p>
          ) : (
            attempts.map((attempt) => (
              <div key={attempt.id} className="grid gap-2 py-4 sm:grid-cols-4 sm:items-center">
                <div className="sm:col-span-2">
                  <p className="font-bold">{attempt.quiz_title}</p>
                  <p className="text-sm text-zinc-500">{attempt.mode}</p>
                </div>
                <p className="text-sm font-bold">{attempt.correct_answers}/{attempt.total_questions} correct</p>
                <p className="text-sm font-black">{Number(attempt.score_percentage).toFixed(0)}% {attempt.passed ? "Passed" : "Try again"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </PortalShell>
  );
}
