"use server";

import { revalidatePath } from "next/cache";
import { updateStatus } from "@/lib/db";
import { guard } from "@/lib/rbac";
import { TABLE_MODULE } from "@/lib/permissions";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to update status";
}

export async function toggleStatusAction(table: string, id: number | string, status: number, paths: string | string[]) {
  const moduleKey = TABLE_MODULE[table];
  if (!moduleKey) return { error: "Invalid table for status update" };
  const denied = await guard(moduleKey, "update");
  if (denied) return { error: denied.error };

  try {
    await updateStatus(table, id, status);
    const revalidateTargets = Array.isArray(paths) ? paths : [paths];
    revalidateTargets.forEach((path) => revalidatePath(path));
    return { success: true };
  } catch (error: unknown) {
    console.error(`Error updating status for ${table}:`, error);
    return { error: getErrorMessage(error) };
  }
}
