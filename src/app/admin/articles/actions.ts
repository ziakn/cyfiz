"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function deleteArticleAction(id: number) {
  try {
    await query("DELETE FROM articles WHERE id = ?", [id]);
    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting article:", error);
    return { error: getErrorMessage(error, "Failed to delete article") };
  }
}

export async function addArticleAction(formData: FormData) {
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const excerpt = formData.get("excerpt") as string;
  const readTime = formData.get("readTime") as string;
  const date = formData.get("date") as string || new Date().toISOString().split('T')[0];

  if (!title || !tag || !excerpt || !readTime) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "INSERT INTO articles (title, tag, excerpt, read_time, date, status) VALUES (?, ?, ?, ?, ?, 1)",
      [title, tag, excerpt, readTime, date]
    );
    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error adding article:", error);
    return { error: getErrorMessage(error, "Failed to add article") };
  }
}
export async function editArticleAction(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const excerpt = formData.get("excerpt") as string;
  const readTime = formData.get("readTime") as string;
  const date = formData.get("date") as string;

  if (!title || !tag || !excerpt || !readTime) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "UPDATE articles SET title = ?, tag = ?, excerpt = ?, read_time = ?, date = ? WHERE id = ?",
      [title, tag, excerpt, readTime, date, id]
    );
    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error editing article:", error);
    return { error: getErrorMessage(error, "Failed to edit article") };
  }
}
