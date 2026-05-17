import { notFound, redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getQuizById, getQuizQuestions, getRequiredPortalUser, isRegisteredForQuiz } from "@/lib/quizPortal";
import QuizRunner from "./QuizRunner";

export default async function PortalQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getRequiredPortalUser();
  const { id } = await params;
  const quizId = Number(id);
  if (!Number.isFinite(quizId)) notFound();

  const [quiz, registered] = await Promise.all([
    getQuizById(quizId),
    isRegisteredForQuiz(user.id, quizId),
  ]);

  if (!quiz || quiz.status !== 1) notFound();
  if (!registered) redirect("/portal/quizzes");

  const questions = await getQuizQuestions(quizId, user.id);

  return (
    <PortalShell user={user}>
      <QuizRunner quiz={quiz} questions={questions} />
    </PortalShell>
  );
}
