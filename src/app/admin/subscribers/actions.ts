"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { requireAdmin } from "@/lib/adminGuard";

export async function deleteSubscriberAction(id: number) {
  try {
    await requireAdmin();
    await execute("DELETE FROM newsletter_subscribers WHERE id = ?", [id]);
    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (e) { return { error: e instanceof Error ? e.message : "Action failed" }; }
}
