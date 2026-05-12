"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

const REVALIDATE_PATHS = ["/", "/profile", "/portfolio", "/admin/portfolio"];

function revalidateAll() {
  REVALIDATE_PATHS.forEach(path => revalidatePath(path));
}

// Experience Actions
export async function addExperienceAction(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const period = formData.get("period") as string;

  if (!company || !role || !period) return { error: "Missing fields" };

  try {
    await query("INSERT INTO profile_experience (company, role, period, status) VALUES (?, ?, ?, 1)", [company, role, period]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}

export async function editExperienceAction(id: number, formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const period = formData.get("period") as string;

  try {
    await query("UPDATE profile_experience SET company = ?, role = ?, period = ? WHERE id = ?", [company, role, period, id]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}

export async function deleteExperienceAction(id: number) {
  try {
    await query("DELETE FROM profile_experience WHERE id = ?", [id]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}

// Project Actions
export async function addProjectAction(formData: FormData) {
  const name = formData.get("name") as string;
  const tags = formData.get("tags") as string;

  if (!name || !tags) return { error: "Missing fields" };

  try {
    await query("INSERT INTO profile_projects (name, tags, status) VALUES (?, ?, 1)", [name, tags]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}

export async function editProjectAction(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const tags = formData.get("tags") as string;

  try {
    await query("UPDATE profile_projects SET name = ?, tags = ? WHERE id = ?", [name, tags, id]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}

export async function deleteProjectAction(id: number) {
  try {
    await query("DELETE FROM profile_projects WHERE id = ?", [id]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
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
  } catch (e: any) { return { error: e.message }; }
}

export async function editSkillAction(id: number, formData: FormData) {
  const category = formData.get("category") as string;
  const items = formData.get("items") as string;

  try {
    await query("UPDATE profile_skills SET category = ?, items = ? WHERE id = ?", [category, items, id]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}

export async function deleteSkillAction(id: number) {
  try {
    await query("DELETE FROM profile_skills WHERE id = ?", [id]);
    revalidateAll();
    return { success: true };
  } catch (e: any) { return { error: e.message }; }
}
