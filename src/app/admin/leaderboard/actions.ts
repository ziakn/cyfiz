"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

function revalidateLeaderboard() {
  revalidatePath("/admin/leaderboard");
  revalidatePath("/quiz");
}

export async function deleteLeaderboardEntryAction(id: number) {
  try {
    await query("DELETE FROM quiz_leaderboard WHERE id = ?", [id]);
    revalidateLeaderboard();
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}

export async function addLeaderboardEntryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const score = parseInt(formData.get("score") as string) || 0;
  const streak = parseInt(formData.get("streak") as string) || 0;
  const rank = parseInt(formData.get("rank") as string) || 99;

  if (!name) return { error: "Name is required" };

  try {
    await query(
      "INSERT INTO quiz_leaderboard (name, score, streak, rank, status) VALUES (?, ?, ?, ?, 1)",
      [name, score, streak, rank]
    );
    revalidateLeaderboard();
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}

export async function editLeaderboardEntryAction(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const score = parseInt(formData.get("score") as string) || 0;
  const streak = parseInt(formData.get("streak") as string) || 0;
  const rank = parseInt(formData.get("rank") as string) || 99;

  try {
    await query(
      "UPDATE quiz_leaderboard SET name = ?, score = ?, streak = ?, rank = ? WHERE id = ?",
      [name, score, streak, rank, id]
    );
    revalidateLeaderboard();
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}
