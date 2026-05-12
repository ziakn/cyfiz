"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTeamMemberAction(id: number) {
  try {
    await query("DELETE FROM team_members WHERE id = ?", [id]);
    revalidatePath("/admin/team");
    revalidatePath("/about"); // Assuming team is shown on about page
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function addTeamMemberAction(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const initials = formData.get("initials") as string;

  if (!name || !role) return { error: "Name and Role are required" };

  try {
    await query(
      "INSERT INTO team_members (name, role, initials, status) VALUES (?, ?, ?, 1)",
      [name, role, initials || name.split(' ').map(n => n[0]).join('').toUpperCase()]
    );
    revalidatePath("/admin/team");
    revalidatePath("/about");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function editTeamMemberAction(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const initials = formData.get("initials") as string;

  try {
    await query(
      "UPDATE team_members SET name = ?, role = ?, initials = ? WHERE id = ?",
      [name, role, initials, id]
    );
    revalidatePath("/admin/team");
    revalidatePath("/about");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}
