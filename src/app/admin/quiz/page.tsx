import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import QuizList from "./QuizList";

interface QuizItem {
  id: number;
  week: string;
  topic: string;
  participants: number;
  avgScore: number;
  status: number;
}

export default async function AdminQuizPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const quizzes = (await query<RowDataPacket[]>(
    "SELECT id, week, topic, participants, avg_score as avgScore, status FROM past_quizzes ORDER BY week DESC"
  )) as QuizItem[];

  return <QuizList initialQuizzes={quizzes} />;
}
