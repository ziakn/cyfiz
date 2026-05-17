import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import QuizList from "./QuizList";

interface AdminQuizRow extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  passing_percentage: number;
  question_order: "sequential" | "random";
  status: number;
  question_count: number;
  registered_count: number;
  attempt_count: number;
  completed_attempt_count: number;
}

interface AdminQuestionRow extends RowDataPacket {
  id: number;
  quiz_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
  explanation: string | null;
  reference_text: string | null;
  sort_order: number;
  status: number;
}

export default async function AdminQuizPage() {
  const [quizzes, questions] = await Promise.all([
    query<AdminQuizRow[]>(
      `SELECT q.id, q.title, q.slug, q.description, q.duration_minutes, q.passing_percentage, q.question_order, q.status,
        COUNT(DISTINCT qq.id) AS question_count,
        COUNT(DISTINCT qr.user_id) AS registered_count,
        COUNT(DISTINCT qa.id) AS attempt_count,
        COUNT(DISTINCT CASE WHEN qa.status = 'completed' THEN qa.id END) AS completed_attempt_count
       FROM quizzes q
       LEFT JOIN quiz_questions qq ON qq.quiz_id = q.id
       LEFT JOIN quiz_registrations qr ON qr.quiz_id = q.id AND qr.status = 'active'
       LEFT JOIN quiz_attempts qa ON qa.quiz_id = q.id
       GROUP BY q.id
       ORDER BY q.created_at DESC`
    ),
    query<AdminQuestionRow[]>(
      `SELECT id, quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, reference_text, sort_order, status
       FROM quiz_questions
       ORDER BY quiz_id ASC, sort_order ASC, id ASC`
    ),
  ]);

  return <QuizList initialQuizzes={quizzes} initialQuestions={questions} />;
}
