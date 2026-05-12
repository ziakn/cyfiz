"use server";

import { revalidatePath } from "next/cache";
import { updateStatus } from "@/lib/db";

export async function toggleStatusAction(table: string, id: number | string, status: number, path: string) {
  try {
    await updateStatus(table, id, status);
    revalidatePath(path);
    return { success: true };
  } catch (error: any) {
    console.error(`Error updating status for ${table}:`, error);
    return { error: error.message || "Failed to update status" };
  }
}
