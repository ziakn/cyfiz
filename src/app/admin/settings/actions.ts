"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSettingAction(id: number, value: string) {
  try {
    await query("UPDATE site_settings SET setting_value = ? WHERE id = ?", [value, id]);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating setting:", error);
    return { success: false, error: "Failed to update setting" };
  }
}

export async function updateStatAction(id: number, value: string, label: string) {
  try {
    await query("UPDATE site_stats SET value = ?, label = ? WHERE id = ?", [value, label, id]);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating stat:", error);
    return { success: false, error: "Failed to update stat" };
  }
}

export async function addPartnerAction(name: string) {
  try {
    await query("INSERT INTO partners (name) VALUES (?)", [name]);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error adding partner:", error);
    return { success: false, error: "Failed to add partner" };
  }
}

export async function removePartnerAction(id: number) {
  try {
    await query("DELETE FROM partners WHERE id = ?", [id]);
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error removing partner:", error);
    return { success: false, error: "Failed to remove partner" };
  }
}
