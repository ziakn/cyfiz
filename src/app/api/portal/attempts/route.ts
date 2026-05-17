import { NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";
import { execute } from "@/lib/db";
import { getPortalUserFromCookie, parsePortalCookieHeader } from "@/lib/portalAuth";
import { getQuizById, getQuizQuestions, isRegisteredForQuiz } from "@/lib/quizPortal";

interface SubmittedAnswer {
  questionId: number;
  selectedOption: string;
}

export async function POST(request: Request) {
  const user = getPortalUserFromCookie(parsePortalCookieHeader(request.headers.get("cookie")));
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const quizId = Number(body.quizId);
  const mode = body.mode === "exam" ? "exam" : "practice";
  const submittedAnswers = Array.isArray(body.answers) ? body.answers as SubmittedAnswer[] : [];

  if (!Number.isFinite(quizId)) {
    return NextResponse.json({ error: "Quiz is required." }, { status: 400 });
  }

  const [quiz, registered, questions] = await Promise.all([
    getQuizById(quizId),
    isRegisteredForQuiz(user.id, quizId),
    getQuizQuestions(quizId),
  ]);

  if (!quiz || !registered) {
    return NextResponse.json({ error: "Quiz is not available for this user." }, { status: 403 });
  }

  const answerMap = new Map<number, string>();
  submittedAnswers.forEach((answer) => {
    const selected = String(answer.selectedOption ?? "").toUpperCase();
    if (["A", "B", "C", "D"].includes(selected)) {
      answerMap.set(Number(answer.questionId), selected);
    }
  });

  const scored = questions.map((question) => {
    const selected = answerMap.get(question.id) ?? "";
    return {
      questionId: question.id,
      selected,
      isCorrect: selected === question.correct_option,
    };
  });

  const total = scored.length;
  const correct = scored.filter((answer) => answer.isCorrect).length;
  const percentage = total > 0 ? Number(((correct / total) * 100).toFixed(2)) : 0;
  const passed = percentage >= quiz.passing_percentage ? 1 : 0;

  const result = await execute(
    `INSERT INTO quiz_attempts (user_id, quiz_id, mode, total_questions, correct_answers, score_percentage, passed, completed_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'completed')`,
    [user.id, quizId, mode, total, correct, percentage, passed]
  ) as ResultSetHeader;

  await Promise.all(scored.map((answer) => execute(
    "INSERT INTO quiz_attempt_answers (attempt_id, question_id, selected_option, is_correct) VALUES (?, ?, ?, ?)",
    [result.insertId, answer.questionId, answer.selected || null, answer.isCorrect ? 1 : 0]
  )));

  return NextResponse.json({
    attemptId: result.insertId,
    total,
    correct,
    percentage,
    passed: Boolean(passed),
  });
}
