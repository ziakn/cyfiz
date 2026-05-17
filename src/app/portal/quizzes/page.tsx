import PortalShell from "@/components/portal/PortalShell";
import { getPublishedQuizzes, getRequiredPortalUser } from "@/lib/quizPortal";
import QuizCards from "../QuizCards";

export default async function PortalQuizzesPage() {
  const user = await getRequiredPortalUser();
  const quizzes = await getPublishedQuizzes(user.id);

  return (
    <PortalShell user={user}>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Quiz Library</p>
        <h1 className="mt-2 text-3xl font-black">Available Quizzes</h1>
        <div className="mt-8">
          <QuizCards quizzes={quizzes} />
        </div>
      </div>
    </PortalShell>
  );
}
