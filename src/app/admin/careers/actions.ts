"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function deleteCareerAction(id: number) {
  try {
    await query("DELETE FROM careers WHERE id = ?", [id]);
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting career:", error);
    return { error: getErrorMessage(error, "Failed to delete career") };
  }
}

export async function addCareerAction(formData: FormData) {
  const title = formData.get("title") as string;
  const department = formData.get("department") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const requirements = formData.get("requirements") as string;
  const salaryRange = formData.get("salaryRange") as string;
  const applyUrl = formData.get("applyUrl") as string;

  if (!title || !location || !description) {
    return { error: "Missing required fields" };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

  try {
    await query(
      "INSERT INTO careers (title, slug, department, location, type, description, requirements, salary_range, apply_url, source, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'internal', 1)",
      [title, slug, department, location, type, description, requirements, salaryRange, applyUrl]
    );
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error adding career:", error);
    return { error: getErrorMessage(error, "Failed to add career") };
  }
}

export async function editCareerAction(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const department = formData.get("department") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const requirements = formData.get("requirements") as string;
  const salaryRange = formData.get("salaryRange") as string;
  const applyUrl = formData.get("applyUrl") as string;

  if (!title || !location || !description) {
    return { error: "Missing required fields" };
  }

  try {
    await query(
      "UPDATE careers SET title = ?, department = ?, location = ?, type = ?, description = ?, requirements = ?, salary_range = ?, apply_url = ? WHERE id = ?",
      [title, department, location, type, description, requirements, salaryRange, applyUrl, id]
    );
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error editing career:", error);
    return { error: getErrorMessage(error, "Failed to edit career") };
  }
}
