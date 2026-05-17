import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import PortalUserList from "./PortalUserList";

export interface PortalUserRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: number;
  created_at: Date;
  registered_quizzes: number;
  attempt_count: number;
  avg_score: string | null;
}

export interface PortalUserRegistrationRow extends RowDataPacket {
  user_id: number;
  quiz_id: number;
  quiz_title: string;
  attempts: number;
  best_score: string | null;
  last_attempt_at: Date | null;
}

export interface PortalUserAttemptAnswerRow extends RowDataPacket {
  user_id: number;
  quiz_id: number;
  attempt_id: number;
  score_percentage: string;
  passed: number;
  completed_at: Date | null;
  question: string;
  selected_option: string | null;
  correct_option: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  is_correct: number;
}

export default async function AdminPortalUsersPage() {
  const [users, registrations, attemptAnswers] = await Promise.all([
    query<PortalUserRow[]>(
      `SELECT pu.id, pu.first_name, pu.last_name, pu.email, pu.status, pu.created_at,
        COUNT(DISTINCT qr.quiz_id) AS registered_quizzes,
        COUNT(DISTINCT qa.id) AS attempt_count,
        AVG(qa.score_percentage) AS avg_score
       FROM portal_users pu
       LEFT JOIN quiz_registrations qr ON qr.user_id = pu.id AND qr.status = 'active'
       LEFT JOIN quiz_attempts qa ON qa.user_id = pu.id AND qa.status = 'completed'
       GROUP BY pu.id
       ORDER BY pu.created_at DESC`
    ),
    query<PortalUserRegistrationRow[]>(
      `SELECT qr.user_id, q.id AS quiz_id, q.title AS quiz_title,
        COUNT(qa.id) AS attempts,
        MAX(qa.score_percentage) AS best_score,
        MAX(qa.completed_at) AS last_attempt_at
       FROM quiz_registrations qr
       INNER JOIN quizzes q ON q.id = qr.quiz_id
       LEFT JOIN quiz_attempts qa ON qa.user_id = qr.user_id AND qa.quiz_id = qr.quiz_id AND qa.status = 'completed'
       WHERE qr.status = 'active'
       GROUP BY qr.user_id, q.id
       ORDER BY q.title ASC`
    ),
    query<PortalUserAttemptAnswerRow[]>(
      `SELECT qa.user_id, qa.quiz_id, qa.id AS attempt_id, qa.score_percentage, qa.passed, qa.completed_at,
        qq.question, qaa.selected_option, qq.correct_option, qq.option_a, qq.option_b, qq.option_c, qq.option_d, qaa.is_correct
       FROM quiz_attempts qa
       INNER JOIN quiz_attempt_answers qaa ON qaa.attempt_id = qa.id
       INNER JOIN quiz_questions qq ON qq.id = qaa.question_id
       WHERE qa.status = 'completed'
       ORDER BY qa.completed_at DESC, qa.id DESC, qq.sort_order ASC, qq.id ASC`
    ),
  ]);

  return <PortalUserList initialUsers={users} registrations={registrations} attemptAnswers={attemptAnswers} />;
}
