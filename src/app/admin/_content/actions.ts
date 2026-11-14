"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";
import { guard } from "@/lib/rbac";
import { CONTENT_MODULES } from "@/lib/contentModules";

const msg = (e: unknown, fb: string) => (e instanceof Error ? e.message : fb);

function readValues(moduleKey: string, formData: FormData) {
  const cfg = CONTENT_MODULES[moduleKey];
  const values: (string | number | null)[] = [];
  for (const f of cfg.fields) {
    const raw = String(formData.get(f.key) ?? "").trim();
    if (f.required && !raw) return { error: `${f.label} is required` } as const;
    if (f.type === "number") values.push(raw === "" ? Number(f.default ?? 0) : Number(raw) || 0);
    else if (f.type === "select") values.push(f.options?.includes(raw) ? raw : String(f.default ?? f.options?.[0] ?? ""));
    else values.push(raw || null);
  }
  return { values } as const;
}

export async function saveContentAction(moduleKey: string, id: number | null, formData: FormData) {
  const cfg = CONTENT_MODULES[moduleKey];
  if (!cfg) return { error: "Unknown module" };
  const denied = await guard(cfg.key, id ? "update" : "create");
  if (denied) return { error: denied.error };

  const parsed = readValues(moduleKey, formData);
  if ("error" in parsed) return { error: parsed.error };

  try {
    const cols = cfg.fields.map((f) => f.key);
    if (id) {
      await execute(`UPDATE ${cfg.table} SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, [...parsed.values, id]);
    } else {
      await execute(`INSERT INTO ${cfg.table} (${cols.join(", ")}, status) VALUES (${cols.map(() => "?").join(", ")}, 1)`, parsed.values);
    }
    revalidatePath(cfg.publicPath);
    return { success: true };
  } catch (e) { return { error: msg(e, `Failed to save ${cfg.singular}`) }; }
}

export async function deleteContentAction(moduleKey: string, id: number) {
  const cfg = CONTENT_MODULES[moduleKey];
  if (!cfg) return { error: "Unknown module" };
  const denied = await guard(cfg.key, "delete");
  if (denied) return { error: denied.error };

  try {
    await execute(`DELETE FROM ${cfg.table} WHERE id = ?`, [id]);
    revalidatePath(cfg.publicPath);
    return { success: true };
  } catch (e) { return { error: msg(e, `Failed to delete ${cfg.singular}`) }; }
}
