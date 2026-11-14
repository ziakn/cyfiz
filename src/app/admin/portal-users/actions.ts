"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { guard } from "@/lib/rbac";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

export async function updatePortalUserStatusAction(id: number, status: number) {
  const denied = await guard("portal_users", "update");
  if (denied) return { error: denied.error };
  try {
    await execute("UPDATE portal_users SET status = ? WHERE id = ?", [status, id]);
    revalidatePath("/admin/portal-users");
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deletePortalUserAction(id: number) {
  const denied = await guard("portal_users", "delete");
  if (denied) return { error: denied.error };
  try {
    await execute("DELETE FROM portal_users WHERE id = ?", [id]);
    revalidatePath("/admin/portal-users");
    revalidatePath("/admin/quiz");
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
