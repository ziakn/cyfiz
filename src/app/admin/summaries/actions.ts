"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function deleteSummaryAction(id: number) {
  try {
    await query("DELETE FROM research_summaries WHERE id = ?", [id]);
    revalidatePath("/admin/summaries");
    revalidatePath("/summaries");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting summary:", error);
    return { error: getErrorMessage(error, "Failed to delete summary") };
  }
}

export async function addSummaryAction(formData: FormData) {
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const excerpt = formData.get("excerpt") as string;
  const readTime = formData.get("readTime") as string;
  const source = formData.get("source") as string;
  const date = formData.get("date") as string || new Date().toISOString().split('T')[0];

  if (!title || !tag || !excerpt || !readTime || !source) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "INSERT INTO research_summaries (title, tag, excerpt, read_time, source, date, status) VALUES (?, ?, ?, ?, ?, ?, 1)",
      [title, tag, excerpt, readTime, source, date]
    );
    revalidatePath("/admin/summaries");
    revalidatePath("/summaries");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error adding summary:", error);
    return { error: getErrorMessage(error, "Failed to add summary") };
  }
}

export async function editSummaryAction(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const excerpt = formData.get("excerpt") as string;
  const readTime = formData.get("readTime") as string;
  const source = formData.get("source") as string;
  const date = formData.get("date") as string;

  if (!title || !tag || !excerpt || !readTime || !source) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "UPDATE research_summaries SET title = ?, tag = ?, excerpt = ?, read_time = ?, source = ?, date = ? WHERE id = ?",
      [title, tag, excerpt, readTime, source, date, id]
    );
    revalidatePath("/admin/summaries");
    revalidatePath("/summaries");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error editing summary:", error);
    return { error: getErrorMessage(error, "Failed to edit summary") };
  }
}
