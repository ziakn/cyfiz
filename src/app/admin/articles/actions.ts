"use server";

import { query } from "@/lib/db";
import { toDateValue } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { guard } from "@/lib/rbac";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function deleteArticleAction(id: number) {
  const denied = await guard("articles", "delete");
  if (denied) return { error: denied.error };
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
  const denied = await guard("articles", "create");
  if (denied) return { error: denied.error };
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const excerpt = formData.get("excerpt") as string;
  const readTime = formData.get("readTime") as string;
  const date = formData.get("date") as string || toDateValue();
  const content = (formData.get("content") as string) || null;
  const authorName = ((formData.get("authorName") as string) || "").trim() || null;
  const authorRole = ((formData.get("authorRole") as string) || "").trim() || null;
  const audience = ((formData.get("audience") as string) || "").trim() || null;

  if (!title || !tag || !excerpt || !readTime) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "INSERT INTO articles (title, tag, excerpt, content, author_name, author_role, audience, read_time, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)",
      [title, tag, excerpt, content, authorName, authorRole, audience, readTime, date]
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
  const denied = await guard("articles", "update");
  if (denied) return { error: denied.error };
  const title = formData.get("title") as string;
  const tag = formData.get("tag") as string;
  const excerpt = formData.get("excerpt") as string;
  const readTime = formData.get("readTime") as string;
  const date = formData.get("date") as string;
  const content = (formData.get("content") as string) || null;
  const authorName = ((formData.get("authorName") as string) || "").trim() || null;
  const authorRole = ((formData.get("authorRole") as string) || "").trim() || null;
  const audience = ((formData.get("audience") as string) || "").trim() || null;

  if (!title || !tag || !excerpt || !readTime) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "UPDATE articles SET title = ?, tag = ?, excerpt = ?, content = ?, author_name = ?, author_role = ?, audience = ?, read_time = ?, date = ? WHERE id = ?",
      [title, tag, excerpt, content, authorName, authorRole, audience, readTime, date, id]
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
