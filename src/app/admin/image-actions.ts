"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

const ALLOWED_IMAGE_TABLES = new Set([
  "articles",
  "research_summaries",
  "team_members",
  "profile_projects",
  "partners",
]);

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to upload image";
}

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const table = formData.get("table") as string;
    const id = formData.get("id") as string;
    const folder = formData.get("folder") as string;

    if (!file || !table || !id || !folder) {
      return { error: "Missing required fields" };
    }

    if (!(file instanceof File) || file.size === 0) {
      return { error: "Please choose a valid image file" };
    }

    if (!file.type.startsWith("image/")) {
      return { error: "Only image files can be uploaded" };
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return { error: "Image must be 10MB or smaller" };
    }

    if (!ALLOWED_IMAGE_TABLES.has(table)) {
      return { error: "Invalid image target" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const publicPath = `/uploads/${folder}/${filename}`;
    const absolutePath = join(process.cwd(), "public", "uploads", folder, filename);

    // Ensure directory exists (just in case)
    await mkdir(join(process.cwd(), "public", "uploads", folder), { recursive: true });

    // Write file
    await writeFile(absolutePath, buffer);

    // Update database
    await query(`UPDATE ${table} SET image_url = ? WHERE id = ?`, [publicPath, id]);

    // Revalidate paths based on table
    if (table === "articles") {
      revalidatePath("/");
      revalidatePath("/insights");
      revalidatePath("/admin/articles");
    } else if (table === "research_summaries") {
      revalidatePath("/");
      revalidatePath("/summaries");
      revalidatePath("/admin/summaries");
    } else if (table === "team_members") {
      revalidatePath("/connect");
      revalidatePath("/admin/team");
    } else if (table === "profile_projects") {
      revalidatePath("/profile");
      revalidatePath("/admin/portfolio");
    } else if (table === "partners") {
      revalidatePath("/");
      revalidatePath("/admin/settings");
    }

    return { success: true, imageUrl: publicPath };
  } catch (error: unknown) {
    console.error("Error uploading image:", error);
    return { error: getErrorMessage(error) };
  }
}
