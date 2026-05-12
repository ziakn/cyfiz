"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

export async function deleteQuizAction(id: number) {
  try {
    await query("DELETE FROM past_quizzes WHERE id = ?", [id]);
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}

export async function addQuizAction(formData: FormData) {
  const week = formData.get("week") as string;
  const topic = formData.get("topic") as string;
  const participants = parseInt(formData.get("participants") as string) || 0;
  const avgScore = parseInt(formData.get("avgScore") as string) || 0;

  if (!week || !topic) return { error: "Missing fields" };

  try {
    await query(
      "INSERT INTO past_quizzes (week, topic, participants, avg_score, status) VALUES (?, ?, ?, ?, 1)",
      [week, topic, participants, avgScore]
    );
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}

export async function editQuizAction(id: number, formData: FormData) {
  const week = formData.get("week") as string;
  const topic = formData.get("topic") as string;
  const participants = parseInt(formData.get("participants") as string) || 0;
  const avgScore = parseInt(formData.get("avgScore") as string) || 0;

  try {
    await query(
      "UPDATE past_quizzes SET week = ?, topic = ?, participants = ?, avg_score = ? WHERE id = ?",
      [week, topic, participants, avgScore, id]
    );
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}
