"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

export async function updatePortalUserStatusAction(id: number, status: number) {
  try {
    await execute("UPDATE portal_users SET status = ? WHERE id = ?", [status, id]);
    revalidatePath("/admin/portal-users");
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function deletePortalUserAction(id: number) {
  try {
    await execute("DELETE FROM portal_users WHERE id = ?", [id]);
    revalidatePath("/admin/portal-users");
    revalidatePath("/admin/quiz");
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
