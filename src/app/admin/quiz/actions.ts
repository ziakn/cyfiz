"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";

const REVALIDATE_PATHS = ["/admin/quiz", "/quiz", "/portal/dashboard", "/portal/quizzes"];

function revalidateQuizPaths() {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path));
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function addQuizAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = Number(formData.get("duration_minutes") ?? 60);
  const passing = Number(formData.get("passing_percentage") ?? 70);
  const order = String(formData.get("question_order") ?? "sequential") === "random" ? "random" : "sequential";

  if (!title) return { error: "Title is required" };

  try {
    await execute(
      "INSERT INTO quizzes (title, slug, description, duration_minutes, passing_percentage, question_order, status) VALUES (?, ?, ?, ?, ?, ?, 1)",
      [title, slugify(title), description, duration, passing, order]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function editQuizAction(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const duration = Number(formData.get("duration_minutes") ?? 60);
  const passing = Number(formData.get("passing_percentage") ?? 70);
  const order = String(formData.get("question_order") ?? "sequential") === "random" ? "random" : "sequential";

  if (!title) return { error: "Title is required" };

  try {
    await execute(
      "UPDATE quizzes SET title = ?, slug = ?, description = ?, duration_minutes = ?, passing_percentage = ?, question_order = ? WHERE id = ?",
      [title, slugify(title), description, duration, passing, order, id]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deleteQuizAction(id: number) {
  try {
    await execute("DELETE FROM quizzes WHERE id = ?", [id]);
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function addQuestionAction(formData: FormData) {
  const quizId = Number(formData.get("quiz_id"));
  const question = String(formData.get("question") ?? "").trim();
  const optionA = String(formData.get("option_a") ?? "").trim();
  const optionB = String(formData.get("option_b") ?? "").trim();
  const optionC = String(formData.get("option_c") ?? "").trim();
  const optionD = String(formData.get("option_d") ?? "").trim();
  const correct = String(formData.get("correct_option") ?? "A").toUpperCase();
  const explanation = String(formData.get("explanation") ?? "").trim();
  const referenceText = String(formData.get("reference_text") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!quizId || !question || !optionA || !optionB || !optionC || !optionD || !["A", "B", "C", "D"].includes(correct)) {
    return { error: "Question, options, and correct answer are required" };
  }

  try {
    await execute(
      `INSERT INTO quiz_questions
        (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, reference_text, sort_order, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [quizId, question, optionA, optionB, optionC, optionD, correct, explanation, referenceText, sortOrder]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function editQuestionAction(id: number, formData: FormData) {
  const question = String(formData.get("question") ?? "").trim();
  const optionA = String(formData.get("option_a") ?? "").trim();
  const optionB = String(formData.get("option_b") ?? "").trim();
  const optionC = String(formData.get("option_c") ?? "").trim();
  const optionD = String(formData.get("option_d") ?? "").trim();
  const correct = String(formData.get("correct_option") ?? "A").toUpperCase();
  const explanation = String(formData.get("explanation") ?? "").trim();
  const referenceText = String(formData.get("reference_text") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  try {
    await execute(
      `UPDATE quiz_questions
       SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ?, explanation = ?, reference_text = ?, sort_order = ?
       WHERE id = ?`,
      [question, optionA, optionB, optionC, optionD, correct, explanation, referenceText, sortOrder, id]
    );
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deleteQuestionAction(id: number) {
  try {
    await execute("DELETE FROM quiz_questions WHERE id = ?", [id]);
    revalidateQuizPaths();
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
