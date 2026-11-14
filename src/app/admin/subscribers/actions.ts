"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { guard } from "@/lib/rbac";

export async function deleteSubscriberAction(id: number) {
  const denied = await guard("subscribers", "delete");
  if (denied) return { error: denied.error };
  try {
    await execute("DELETE FROM newsletter_subscribers WHERE id = ?", [id]);
    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (e) { return { error: e instanceof Error ? e.message : "Action failed" }; }
}
