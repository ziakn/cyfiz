import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RowDataPacket } from "mysql2";
import { execute, query } from "./db";
import { getPortalUserFromCookie, PORTAL_COOKIE_NAME } from "./portalAuth";

export interface Quiz extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  passing_percentage: number;
  question_order: "sequential" | "random";
  status: number;
  question_count?: number;
}

export interface QuizQuestion extends RowDataPacket {
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
  saved?: number;
}

export interface PortalAttempt extends RowDataPacket {
  id: number;
  quiz_id: number;
  quiz_title: string;
  mode: "practice" | "exam";
  total_questions: number;
  correct_answers: number;
  score_percentage: string;
  passed: number;
  completed_at: Date | null;
}

export async function getRequiredPortalUser() {
  const cookieStore = await cookies();
  const user = getPortalUserFromCookie(cookieStore.get(PORTAL_COOKIE_NAME)?.value ?? null);
  if (!user) redirect("/portal/login");
  return user;
}

export async function getQuizById(id: number) {
  const rows = await query<Quiz[]>(
    "SELECT id, title, slug, description, duration_minutes, passing_percentage, question_order, status FROM quizzes WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

export async function getPublishedQuizzes(userId?: number) {
  if (userId) {
    return query<(Quiz & { registered: number })[]>(
      `SELECT q.id, q.title, q.slug, q.description, q.duration_minutes, q.passing_percentage, q.question_order, q.status,
        COUNT(qq.id) AS question_count,
        CASE WHEN qr.id IS NULL THEN 0 ELSE 1 END AS registered
       FROM quizzes q
       LEFT JOIN quiz_questions qq ON qq.quiz_id = q.id AND qq.status = 1
       LEFT JOIN quiz_registrations qr ON qr.quiz_id = q.id AND qr.user_id = ?
       WHERE q.status = 1
       GROUP BY q.id, qr.id
       ORDER BY q.created_at DESC`,
      [userId]
    );
  }

  return query<Quiz[]>(
    `SELECT q.id, q.title, q.slug, q.description, q.duration_minutes, q.passing_percentage, q.question_order, q.status,
      COUNT(qq.id) AS question_count
     FROM quizzes q
     LEFT JOIN quiz_questions qq ON qq.quiz_id = q.id AND qq.status = 1
     WHERE q.status = 1
     GROUP BY q.id
     ORDER BY q.created_at DESC`
  );
}

export async function getRegisteredQuizzes(userId: number) {
  return query<Quiz[]>(
    `SELECT q.id, q.title, q.slug, q.description, q.duration_minutes, q.passing_percentage, q.question_order, q.status,
      COUNT(qq.id) AS question_count
     FROM quiz_registrations qr
     INNER JOIN quizzes q ON q.id = qr.quiz_id
     LEFT JOIN quiz_questions qq ON qq.quiz_id = q.id AND qq.status = 1
     WHERE qr.user_id = ? AND qr.status = 'active' AND q.status = 1
     GROUP BY q.id
     ORDER BY qr.created_at DESC`,
    [userId]
  );
}

export async function isRegisteredForQuiz(userId: number, quizId: number) {
  const rows = await query<RowDataPacket[]>(
    "SELECT id FROM quiz_registrations WHERE user_id = ? AND quiz_id = ? AND status = 'active' LIMIT 1",
    [userId, quizId]
  );
  return rows.length > 0;
}

export async function registerForQuiz(userId: number, quizId: number) {
  await execute(
    "INSERT INTO quiz_registrations (user_id, quiz_id, status) VALUES (?, ?, 'active') ON DUPLICATE KEY UPDATE status = 'active'",
    [userId, quizId]
  );
}

export async function getQuizQuestions(quizId: number, userId?: number) {
  if (userId) {
    return query<QuizQuestion[]>(
      `SELECT qq.id, qq.quiz_id, qq.question, qq.option_a, qq.option_b, qq.option_c, qq.option_d, qq.correct_option,
        qq.explanation, qq.reference_text, qq.sort_order, qq.status,
        CASE WHEN sq.id IS NULL THEN 0 ELSE 1 END AS saved
       FROM quiz_questions qq
       LEFT JOIN saved_questions sq ON sq.question_id = qq.id AND sq.user_id = ?
       WHERE qq.quiz_id = ? AND qq.status = 1
       ORDER BY qq.sort_order ASC, qq.id ASC`,
      [userId, quizId]
    );
  }

  return query<QuizQuestion[]>(
    `SELECT id, quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, reference_text, sort_order, status
     FROM quiz_questions
     WHERE quiz_id = ? AND status = 1
     ORDER BY sort_order ASC, id ASC`,
    [quizId]
  );
}

export async function getRecentAttempts(userId: number) {
  return query<PortalAttempt[]>(
    `SELECT qa.id, qa.quiz_id, q.title AS quiz_title, qa.mode, qa.total_questions, qa.correct_answers,
      qa.score_percentage, qa.passed, qa.completed_at
     FROM quiz_attempts qa
     INNER JOIN quizzes q ON q.id = qa.quiz_id
     WHERE qa.user_id = ? AND qa.status = 'completed'
     ORDER BY qa.completed_at DESC, qa.id DESC
     LIMIT 10`,
    [userId]
  );
}
