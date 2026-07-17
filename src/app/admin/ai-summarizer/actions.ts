"use server";

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { query, execute } from "@/lib/db";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { summarizePaper, isGeminiConfigured, MAX_PDF_SIZE } from "@/lib/gemini";
import { toDateValue } from "@/lib/utils";

const PAPERS_FOLDER = "papers";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

// Server actions are directly invocable, so guard each one explicitly rather
// than relying on the /admin layout render.
async function requireAdmin() {
  const store = await cookies();
  const user = getSessionUserFromCookie(store.get(AUTH_COOKIE_NAME)?.value ?? null);
  if (!user) {
    throw new Error("Not authorized");
  }
  return user;
}

function findingsToHtml(findings: string[]) {
  if (!findings.length) return "";
  const items = findings.map((f) => `<li>${escapeHtml(f)}</li>`).join("");
  return `<ul>${items}</ul>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function revalidateAdmin() {
  revalidatePath("/admin/ai-summarizer");
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/summaries");
  revalidatePath("/admin/summaries");
}

/**
 * Upload a PDF, persist it, then summarize with Gemini. The row is created
 * immediately as `processing` so a slow/failed AI call still leaves a record.
 */
export async function uploadPaperAction(formData: FormData) {
  try {
    await requireAdmin();

    if (!isGeminiConfigured()) {
      return { error: "GEMINI_API_KEY is not set. Add it to your .env first." };
    }

    const file = formData.get("file") as File;
    const source = ((formData.get("source") as string) || "").trim();
    const instructions = ((formData.get("instructions") as string) || "").trim();

    if (!file || !(file instanceof File) || file.size === 0) {
      return { error: "Please choose a PDF file" };
    }
    if (file.type !== "application/pdf") {
      return { error: "Only PDF files can be uploaded" };
    }
    if (file.size > MAX_PDF_SIZE) {
      return { error: "PDF must be 15MB or smaller" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const pdfUrl = `/uploads/${PAPERS_FOLDER}/${filename}`;
    const dir = join(process.cwd(), "public", "uploads", PAPERS_FOLDER);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, filename), buffer);

    const insert = await execute(
      "INSERT INTO ai_summaries (original_filename, pdf_url, source, custom_instructions, process_status) VALUES (?, ?, ?, ?, 'processing')",
      [file.name, pdfUrl, source || null, instructions || null]
    );
    const id = insert.insertId;

    try {
      const { summary, model } = await summarizePaper(buffer, instructions);
      await execute(
        `UPDATE ai_summaries
         SET ai_title = ?, ai_tag = ?, ai_excerpt = ?, ai_key_findings = ?, ai_read_time = ?,
             ai_model = ?, process_status = 'draft', error_message = NULL
         WHERE id = ?`,
        [
          summary.title,
          summary.tag,
          `<p>${escapeHtml(summary.excerpt)}</p>`,
          findingsToHtml(summary.keyFindings),
          summary.readTime,
          model,
          id,
        ]
      );
    } catch (aiError: unknown) {
      const message = getErrorMessage(aiError, "Summarization failed");
      await execute(
        "UPDATE ai_summaries SET process_status = 'error', error_message = ? WHERE id = ?",
        [message, id]
      );
      revalidateAdmin();
      return { error: message, id };
    }

    revalidateAdmin();
    return { success: true, id };
  } catch (error: unknown) {
    console.error("Error uploading paper:", error);
    return { error: getErrorMessage(error, "Failed to upload paper") };
  }
}

/** Re-run summarization for a row using its already-stored PDF. */
export async function retrySummaryAction(id: number) {
  try {
    await requireAdmin();

    if (!isGeminiConfigured()) {
      return { error: "GEMINI_API_KEY is not set. Add it to your .env first." };
    }

    const rows = (await query(
      "SELECT pdf_url, custom_instructions FROM ai_summaries WHERE id = ? LIMIT 1",
      [id]
    )) as Array<{ pdf_url: string; custom_instructions: string | null }>;
    const row = rows[0];
    if (!row) return { error: "Record not found" };

    await execute(
      "UPDATE ai_summaries SET process_status = 'processing', error_message = NULL WHERE id = ?",
      [id]
    );

    const absolutePath = join(process.cwd(), "public", row.pdf_url.replace(/^\//, ""));
    const buffer = await readFile(absolutePath);
    const { summary, model } = await summarizePaper(buffer, row.custom_instructions ?? undefined);

    await execute(
      `UPDATE ai_summaries
       SET ai_title = ?, ai_tag = ?, ai_excerpt = ?, ai_key_findings = ?, ai_read_time = ?,
           ai_model = ?, process_status = 'draft', error_message = NULL
       WHERE id = ?`,
      [
        summary.title,
        summary.tag,
        `<p>${escapeHtml(summary.excerpt)}</p>`,
        findingsToHtml(summary.keyFindings),
        summary.readTime,
        model,
        id,
      ]
    );

    revalidateAdmin();
    return { success: true };
  } catch (error: unknown) {
    const message = getErrorMessage(error, "Failed to summarize");
    await execute(
      "UPDATE ai_summaries SET process_status = 'error', error_message = ? WHERE id = ?",
      [message, id]
    ).catch(() => {});
    revalidateAdmin();
    return { error: message };
  }
}

/** Save admin edits to the AI draft (does not publish). */
export async function updateDraftAction(id: number, formData: FormData) {
  try {
    await requireAdmin();

    const title = ((formData.get("title") as string) || "").trim();
    const tag = ((formData.get("tag") as string) || "").trim();
    const source = ((formData.get("source") as string) || "").trim();
    const readTime = ((formData.get("readTime") as string) || "").trim();
    const excerpt = (formData.get("excerpt") as string) || "";
    const keyFindings = (formData.get("keyFindings") as string) || "";

    if (!title || !tag || !excerpt) {
      return { error: "Title, tag and summary are required" };
    }

    await execute(
      `UPDATE ai_summaries
       SET ai_title = ?, ai_tag = ?, source = ?, ai_read_time = ?, ai_excerpt = ?, ai_key_findings = ?
       WHERE id = ?`,
      [title, tag, source || null, readTime || null, excerpt, keyFindings, id]
    );

    revalidateAdmin();
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating draft:", error);
    return { error: getErrorMessage(error, "Failed to save draft") };
  }
}

/**
 * Publish a verified draft into `research_summaries` so it appears on the site.
 * Saves the edits first, then inserts (or updates an already-published row).
 */
export async function publishSummaryAction(id: number, formData: FormData) {
  try {
    await requireAdmin();

    const title = ((formData.get("title") as string) || "").trim();
    const tag = ((formData.get("tag") as string) || "").trim();
    const source = ((formData.get("source") as string) || "").trim();
    const readTime = ((formData.get("readTime") as string) || "").trim();
    const excerpt = (formData.get("excerpt") as string) || "";
    const keyFindings = (formData.get("keyFindings") as string) || "";

    if (!title || !tag || !excerpt || !source) {
      return { error: "Title, tag, source and summary are required to publish" };
    }

    // Persist the reviewed edits back onto the AI record.
    await execute(
      `UPDATE ai_summaries
       SET ai_title = ?, ai_tag = ?, source = ?, ai_read_time = ?, ai_excerpt = ?, ai_key_findings = ?
       WHERE id = ?`,
      [title, tag, source, readTime || null, excerpt, keyFindings, id]
    );

    const combinedExcerpt = keyFindings
      ? `${excerpt}<p><strong>Key findings:</strong></p>${keyFindings}`
      : excerpt;
    const date = toDateValue();

    const existing = (await query(
      "SELECT published_summary_id FROM ai_summaries WHERE id = ? LIMIT 1",
      [id]
    )) as Array<{ published_summary_id: number | null }>;
    const publishedId = existing[0]?.published_summary_id ?? null;

    if (publishedId) {
      await execute(
        `UPDATE research_summaries
         SET title = ?, tag = ?, excerpt = ?, read_time = ?, source = ?
         WHERE id = ?`,
        [title, tag, combinedExcerpt, readTime || null, source, publishedId]
      );
    } else {
      const result = await execute(
        `INSERT INTO research_summaries (title, tag, excerpt, read_time, source, date, status)
         VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [title, tag, combinedExcerpt, readTime || null, source, date]
      );
      await execute(
        "UPDATE ai_summaries SET published_summary_id = ? WHERE id = ?",
        [result.insertId, id]
      );
    }

    await execute("UPDATE ai_summaries SET process_status = 'published' WHERE id = ?", [id]);

    revalidateAdmin();
    revalidatePublic();
    return { success: true };
  } catch (error: unknown) {
    console.error("Error publishing summary:", error);
    return { error: getErrorMessage(error, "Failed to publish summary") };
  }
}

export async function deletePaperAction(id: number) {
  try {
    await requireAdmin();
    await execute("DELETE FROM ai_summaries WHERE id = ?", [id]);
    revalidateAdmin();
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting paper:", error);
    return { error: getErrorMessage(error, "Failed to delete paper") };
  }
}
