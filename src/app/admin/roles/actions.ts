"use server";

import { revalidatePath } from "next/cache";
import { execute, query } from "@/lib/db";
import { getAdminContext, guard } from "@/lib/rbac";
import { ACTIONS, MODULE_KEYS, type PermissionMap } from "@/lib/permissions";

const msg = (e: unknown, fb: string) => (e instanceof Error ? e.message : fb);

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

/** Parses the matrix sent by the form and drops anything the acting admin could not grant themselves. */
async function readPermissions(formData: FormData): Promise<PermissionMap> {
  const ctx = await getAdminContext();
  let raw: Record<string, Partial<Record<string, boolean>>> = {};
  try { raw = JSON.parse(String(formData.get("permissions") ?? "{}")); } catch { /* ignore */ }

  const out: PermissionMap = {};
  for (const key of MODULE_KEYS) {
    const r = raw[key] ?? {};
    const view = !!r.view;
    const p = {
      view,
      create: view && !!r.create,
      update: view && !!r.update,
      delete: view && !!r.delete,
    };
    for (const a of ACTIONS) {
      if (!ctx?.user.isSuper && !ctx?.perms[key]?.[a]) p[a] = false; // cannot hand out what you do not have
    }
    out[key] = p;
  }
  return out;
}

async function writePermissions(roleId: number, perms: PermissionMap) {
  await execute("DELETE FROM role_permissions WHERE role_id = ?", [roleId]);
  for (const key of MODULE_KEYS) {
    const p = perms[key];
    if (!p || !(p.view || p.create || p.update || p.delete)) continue;
    await execute(
      "INSERT INTO role_permissions (role_id, module, can_view, can_create, can_update, can_delete) VALUES (?, ?, ?, ?, ?, ?)",
      [roleId, key, p.view ? 1 : 0, p.create ? 1 : 0, p.update ? 1 : 0, p.delete ? 1 : 0]
    );
  }
}

export async function createRoleAction(formData: FormData) {
  const denied = await guard("roles", "create");
  if (denied) return { error: denied.error };

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!name) return { error: "Role name is required" };
  const slug = slugify(name);
  if (!slug) return { error: "Role name must contain letters or numbers" };

  try {
    const exists = await query<{ id: number }[]>("SELECT id FROM roles WHERE slug = ? OR name = ? LIMIT 1", [slug, name]);
    if (exists.length) return { error: "A role with this name already exists" };

    const res = await execute("INSERT INTO roles (name, slug, description, is_super, is_system) VALUES (?, ?, ?, 0, 0)", [name, slug, description]);
    await writePermissions(res.insertId, await readPermissions(formData));
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (e) { return { error: msg(e, "Failed to create role") }; }
}

export async function updateRoleAction(id: number, formData: FormData) {
  const denied = await guard("roles", "update");
  if (denied) return { error: denied.error };

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!name) return { error: "Role name is required" };

  try {
    const rows = await query<{ id: number; is_super: number; is_system: number; slug: string }[]>("SELECT id, is_super, is_system, slug FROM roles WHERE id = ? LIMIT 1", [id]);
    const role = rows[0];
    if (!role) return { error: "Role not found" };
    if (role.is_super === 1) return { error: "Super Admin always has full access and cannot be edited" };

    const dup = await query<{ id: number }[]>("SELECT id FROM roles WHERE name = ? AND id <> ? LIMIT 1", [name, id]);
    if (dup.length) return { error: "Another role already uses this name" };

    // system roles keep their slug (users reference it); custom roles follow the name
    await execute("UPDATE roles SET name = ?, description = ?" + (role.is_system ? "" : ", slug = ?") + " WHERE id = ?",
      role.is_system ? [name, description, id] : [name, description, slugify(name) || role.slug, id]);
    if (!role.is_system) await execute("UPDATE admin_users SET role = ? WHERE role_id = ?", [slugify(name) || role.slug, id]);
    await writePermissions(id, await readPermissions(formData));
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (e) { return { error: msg(e, "Failed to update role") }; }
}

export async function deleteRoleAction(id: number) {
  const denied = await guard("roles", "delete");
  if (denied) return { error: denied.error };

  try {
    const rows = await query<{ is_system: number }[]>("SELECT is_system FROM roles WHERE id = ? LIMIT 1", [id]);
    if (!rows[0]) return { error: "Role not found" };
    if (rows[0].is_system === 1) return { error: "Built-in roles cannot be deleted" };
    const used = await query<{ n: number }[]>("SELECT COUNT(*) AS n FROM admin_users WHERE role_id = ?", [id]);
    if (Number(used[0]?.n) > 0) return { error: `This role is assigned to ${used[0].n} user(s). Move them to another role first.` };

    await execute("DELETE FROM roles WHERE id = ?", [id]);
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (e) { return { error: msg(e, "Failed to delete role") }; }
}
