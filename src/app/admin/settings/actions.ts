"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { guard } from "@/lib/rbac";
import { SETTING_FIELDS } from "@/lib/siteSettings";

export async function saveSettingsAction(formData: FormData) {
  const denied = await guard("settings", "update");
  if (denied) return { error: denied.error };
  try {
    for (const f of SETTING_FIELDS) {
      const value = String(formData.get(f.key) ?? "").trim();
      if (f.key.endsWith("_url") && value && !/^https?:\/\//i.test(value)) {
        return { error: `${f.label} must start with http:// or https://` };
      }
      await execute(
        "INSERT INTO site_settings (setting_key, setting_value, status) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), status = 1",
        [f.key, value]
      );
    }
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to save settings" };
  }
}
