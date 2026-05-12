"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteLeaderboardEntryAction(id: number) {
  try {
    await query("DELETE FROM quiz_leaderboard WHERE id = ?", [id]);
    revalidatePath("/admin/leaderboard");
    revalidatePath("/leaderboard");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
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
    revalidatePath("/admin/leaderboard");
    revalidatePath("/leaderboard");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
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
    revalidatePath("/admin/leaderboard");
    revalidatePath("/leaderboard");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}
