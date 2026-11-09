"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { requireAdmin } from "@/lib/adminGuard";

const msg = (e: unknown) => (e instanceof Error ? e.message : "Action failed");

export async function setMessageHandledAction(id: number, handled: boolean) {
  try {
    await requireAdmin();
    await execute("UPDATE contact_messages SET status = ? WHERE id = ?", [handled ? 0 : 1, id]);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (e) { return { error: msg(e) }; }
}

export async function deleteMessageAction(id: number) {
  try {
    await requireAdmin();
    await execute("DELETE FROM contact_messages WHERE id = ?", [id]);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (e) { return { error: msg(e) }; }
}
