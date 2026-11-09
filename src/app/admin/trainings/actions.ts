"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { requireAdmin } from "@/lib/adminGuard";

const msg = (e: unknown, fb: string) => (e instanceof Error ? e.message : fb);
const refresh = () => { revalidatePath("/admin/trainings"); revalidatePath("/learn"); };

function read(formData: FormData) {
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  return {
    title: s("title"), category: s("category"), format: s("format") || null, duration: s("duration") || null,
    summary: s("summary"), linkUrl: s("linkUrl") || null, sortOrder: Number(s("sortOrder")) || 0,
  };
}

export async function addTrainingAction(formData: FormData) {
  try {
    await requireAdmin();
    const t = read(formData);
    if (!t.title || !t.category || !t.summary) return { error: "Title, category and summary are required" };
    await execute(
      "INSERT INTO trainings (title, category, format, duration, summary, link_url, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, 1)",
      [t.title, t.category, t.format, t.duration, t.summary, t.linkUrl, t.sortOrder]
    );
    refresh();
    return { success: true };
  } catch (e) { return { error: msg(e, "Failed to add training") }; }
}

export async function editTrainingAction(id: number, formData: FormData) {
  try {
    await requireAdmin();
    const t = read(formData);
    if (!t.title || !t.category || !t.summary) return { error: "Title, category and summary are required" };
    await execute(
      "UPDATE trainings SET title = ?, category = ?, format = ?, duration = ?, summary = ?, link_url = ?, sort_order = ? WHERE id = ?",
      [t.title, t.category, t.format, t.duration, t.summary, t.linkUrl, t.sortOrder, id]
    );
    refresh();
    return { success: true };
  } catch (e) { return { error: msg(e, "Failed to update training") }; }
}

export async function deleteTrainingAction(id: number) {
  try {
    await requireAdmin();
    await execute("DELETE FROM trainings WHERE id = ?", [id]);
    refresh();
    return { success: true };
  } catch (e) { return { error: msg(e, "Failed to delete training") }; }
}
