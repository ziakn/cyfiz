"use server";
import { revalidatePath } from "next/cache";
import { createAdminUser, updateAdminUser, deleteAdminUser, updateUserStatus } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function addUserAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!email || !password || !role) {
    return { error: "All fields are required" };
  }

  try {
    const passwordHash = hashPassword(password);
    await createAdminUser({ email, passwordHash, role });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error adding user:", error);
    return { error: error.message || "Failed to add user" };
  }
}

export async function editUserAction(id: number, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!email || !role) {
    return { error: "Email and role are required" };
  }

  try {
    const data: any = { email, role };
    if (password) {
      data.passwordHash = hashPassword(password);
    }
    await updateAdminUser(id, data);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating user:", error);
    return { error: error.message || "Failed to update user" };
  }
}

export async function removeUserAction(id: number) {
  try {
    await deleteAdminUser(id);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return { error: error.message || "Failed to delete user" };
  }
}

export async function updateUserStatusAction(id: number, status: number) {
  try {
    await updateUserStatus(id, status);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating user status:", error);
    return { error: error.message || "Failed to update status" };
  }
}
