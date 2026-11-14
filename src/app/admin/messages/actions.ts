"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { guard } from "@/lib/rbac";

const msg = (e: unknown) => (e instanceof Error ? e.message : "Action failed");

export async function setMessageHandledAction(id: number, handled: boolean) {
  const denied = await guard("messages", "update");
  if (denied) return { error: denied.error };
  try {
    await execute("UPDATE contact_messages SET status = ? WHERE id = ?", [handled ? 0 : 1, id]);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (e) { return { error: msg(e) }; }
}

export async function deleteMessageAction(id: number) {
  const denied = await guard("messages", "delete");
  if (denied) return { error: denied.error };
  try {
    await execute("DELETE FROM contact_messages WHERE id = ?", [id]);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (e) { return { error: msg(e) }; }
}
