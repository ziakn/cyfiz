"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

function revalidateTeam() {
  revalidatePath("/admin/team");
  revalidatePath("/connect");
}

export async function deleteTeamMemberAction(id: number) {
  try {
    await query("DELETE FROM team_members WHERE id = ?", [id]);
    revalidateTeam();
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}

export async function addTeamMemberAction(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const initials = formData.get("initials") as string;
  const bio = formData.get("bio") as string;
  const expertise = formData.get("expertise") as string;
  const portfolioHighlights = formData.get("portfolio_highlights") as string;
  const portfolioUrl = formData.get("portfolio_url") as string;

  if (!name || !role) return { error: "Name and Role are required" };

  try {
    await query(
      "INSERT INTO team_members (name, role, initials, bio, expertise, portfolio_highlights, portfolio_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, 1)",
      [name, role, initials || name.split(' ').map(n => n[0]).join('').toUpperCase(), bio, expertise, portfolioHighlights, portfolioUrl]
    );
    revalidateTeam();
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}

export async function editTeamMemberAction(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const initials = formData.get("initials") as string;
  const bio = formData.get("bio") as string;
  const expertise = formData.get("expertise") as string;
  const portfolioHighlights = formData.get("portfolio_highlights") as string;
  const portfolioUrl = formData.get("portfolio_url") as string;

  try {
    await query(
      "UPDATE team_members SET name = ?, role = ?, initials = ?, bio = ?, expertise = ?, portfolio_highlights = ?, portfolio_url = ? WHERE id = ?",
      [name, role, initials, bio, expertise, portfolioHighlights, portfolioUrl, id]
    );
    revalidateTeam();
    return { success: true };
  } catch (e: unknown) {
    return { error: getErrorMessage(e) };
  }
}
