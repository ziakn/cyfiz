"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

const REVALIDATE_PATHS = ["/", "/profile", "/admin/portfolio"];

function revalidateAll() {
  REVALIDATE_PATHS.forEach(path => revalidatePath(path));
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

// Experience Actions
export async function addExperienceAction(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const period = formData.get("period") as string;
  const location = formData.get("location") as string;
  const bullets = formData.get("bullets") as string;

  if (!company || !role || !period || !location || !bullets) return { error: "Missing fields" };

  try {
    await query(
      "INSERT INTO profile_experience (company, role, period, location, bullets, status) VALUES (?, ?, ?, ?, ?, 1)",
      [company, role, period, location, bullets]
    );
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

export async function editExperienceAction(id: number, formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const period = formData.get("period") as string;
  const location = formData.get("location") as string;
  const bullets = formData.get("bullets") as string;

  if (!company || !role || !period || !location || !bullets) return { error: "Missing fields" };

  try {
    await query(
      "UPDATE profile_experience SET company = ?, role = ?, period = ?, location = ?, bullets = ? WHERE id = ?",
      [company, role, period, location, bullets, id]
    );
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

export async function deleteExperienceAction(id: number) {
  try {
    await query("DELETE FROM profile_experience WHERE id = ?", [id]);
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

// Project Actions
export async function addProjectAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const href = formData.get("href") as string;

  if (!name || !description || !tags) return { error: "Missing fields" };

  try {
    await query(
      "INSERT INTO profile_projects (name, description, tags, href, status) VALUES (?, ?, ?, ?, 1)",
      [name, description, tags, href || "#"]
    );
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

export async function editProjectAction(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const href = formData.get("href") as string;

  if (!name || !description || !tags) return { error: "Missing fields" };

  try {
    await query(
      "UPDATE profile_projects SET name = ?, description = ?, tags = ?, href = ? WHERE id = ?",
      [name, description, tags, href || "#", id]
    );
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

export async function deleteProjectAction(id: number) {
  try {
    await query("DELETE FROM profile_projects WHERE id = ?", [id]);
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

// Skill Actions
export async function addSkillAction(formData: FormData) {
  const category = formData.get("category") as string;
  const items = formData.get("items") as string;

  if (!category || !items) return { error: "Missing fields" };

  try {
    await query("INSERT INTO profile_skills (category, items, status) VALUES (?, ?, 1)", [category, items]);
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

export async function editSkillAction(id: number, formData: FormData) {
  const category = formData.get("category") as string;
  const items = formData.get("items") as string;

  try {
    await query("UPDATE profile_skills SET category = ?, items = ? WHERE id = ?", [category, items, id]);
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}

export async function deleteSkillAction(id: number) {
  try {
    await query("DELETE FROM profile_skills WHERE id = ?", [id]);
    revalidateAll();
    return { success: true };
  } catch (e: unknown) { return { error: getErrorMessage(e) }; }
}
