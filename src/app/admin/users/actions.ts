"use server";

import { revalidatePath } from "next/cache";
import { createAdminUser, execute, query, updateAdminUser } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { getAdminContext, guard } from "@/lib/rbac";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

interface RoleRow { id: number; slug: string; is_super: number; status: number }

async function getRole(roleId: number) {
  const rows = await query<RoleRow[]>("SELECT id, slug, is_super, status FROM roles WHERE id = ? LIMIT 1", [roleId]);
  return rows[0] ?? null;
}

interface TargetRow { id: number; status: number; is_super: number | null }

async function getTarget(id: number) {
  const rows = await query<TargetRow[]>(
    "SELECT u.id, u.status, r.is_super FROM admin_users u LEFT JOIN roles r ON r.id = u.role_id WHERE u.id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

/** Active super admins other than `excludeId`. The system must always keep at least one. */
async function otherActiveSupers(excludeId: number) {
  const rows = await query<{ n: number }[]>(
    "SELECT COUNT(*) AS n FROM admin_users u JOIN roles r ON r.id = u.role_id WHERE r.is_super = 1 AND u.status = 1 AND u.id <> ?",
    [excludeId]
  );
  return Number(rows[0]?.n ?? 0);
}

export async function addUserAction(formData: FormData) {
  const denied = await guard("admin_users", "create");
  if (denied) return { error: denied.error };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const roleId = Number(formData.get("roleId"));

  if (!email || !password || !roleId) return { error: "Email, password and role are required" };
  if (password.length < 8) return { error: "Password must be at least 8 characters" };

  try {
    const ctx = await getAdminContext();
    const role = await getRole(roleId);
    if (!role || role.status === 0) return { error: "Choose a valid role" };
    if (role.is_super === 1 && !ctx?.user.isSuper) return { error: "Only a Super Admin can create another Super Admin" };

    await createAdminUser({ email, passwordHash: hashPassword(password), roleId: role.id, roleSlug: role.slug });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error adding user:", error);
    return { error: getErrorMessage(error, "Failed to add user") };
  }
}

export async function editUserAction(id: number, formData: FormData) {
  const denied = await guard("admin_users", "update");
  if (denied) return { error: denied.error };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const roleId = Number(formData.get("roleId"));

  if (!email || !roleId) return { error: "Email and role are required" };
  if (password && password.length < 8) return { error: "Password must be at least 8 characters" };

  try {
    const ctx = await getAdminContext();
    const [target, role] = await Promise.all([getTarget(id), getRole(roleId)]);
    if (!target) return { error: "User not found" };
    if (!role || role.status === 0) return { error: "Choose a valid role" };

    const touchesSuper = target.is_super === 1 || role.is_super === 1;
    if (touchesSuper && !ctx?.user.isSuper) return { error: "Only a Super Admin can change a Super Admin account or assign that role" };
    if (target.is_super === 1 && role.is_super !== 1 && (await otherActiveSupers(id)) === 0) {
      return { error: "This is the last active Super Admin; it cannot be moved to another role" };
    }

    await updateAdminUser(id, {
      email,
      roleId: role.id,
      roleSlug: role.slug,
      ...(password ? { passwordHash: hashPassword(password) } : {}),
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    return { error: getErrorMessage(error, "Failed to update user") };
  }
}

export async function removeUserAction(id: number) {
  const denied = await guard("admin_users", "delete");
  if (denied) return { error: denied.error };

  try {
    const ctx = await getAdminContext();
    if (ctx?.user.id === id) return { error: "You cannot delete your own account" };
    const target = await getTarget(id);
    if (!target) return { error: "User not found" };
    if (target.is_super === 1) {
      if (!ctx?.user.isSuper) return { error: "Only a Super Admin can delete a Super Admin" };
      if ((await otherActiveSupers(id)) === 0) return { error: "This is the last active Super Admin" };
    }
    await execute("DELETE FROM admin_users WHERE id = ?", [id]);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    return { error: getErrorMessage(error, "Failed to delete user") };
  }
}

export async function updateUserStatusAction(id: number, status: number) {
  const denied = await guard("admin_users", "update");
  if (denied) return { error: denied.error };

  try {
    const ctx = await getAdminContext();
    if (status === 0) {
      if (ctx?.user.id === id) return { error: "You cannot deactivate your own account" };
      const target = await getTarget(id);
      if (target?.is_super === 1) {
        if (!ctx?.user.isSuper) return { error: "Only a Super Admin can deactivate a Super Admin" };
        if ((await otherActiveSupers(id)) === 0) return { error: "This is the last active Super Admin" };
      }
    }
    await execute("UPDATE admin_users SET status = ? WHERE id = ?", [status, id]);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating user status:", error);
    return { error: getErrorMessage(error, "Failed to update status") };
  }
}
