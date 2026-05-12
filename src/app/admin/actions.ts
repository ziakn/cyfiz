"use server";

import { revalidatePath } from "next/cache";
import { updateStatus } from "@/lib/db";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to update status";
}

export async function toggleStatusAction(table: string, id: number | string, status: number, path: string) {
  try {
    await updateStatus(table, id, status);
    revalidatePath(path);
    return { success: true };
  } catch (error: unknown) {
    console.error(`Error updating status for ${table}:`, error);
    return { error: getErrorMessage(error) };
  }
}
