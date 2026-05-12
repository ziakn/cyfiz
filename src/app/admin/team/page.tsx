import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import TeamList from "./TeamList";

interface TeamMember {
  id: number;
  initials: string;
  name: string;
  role: string;
  image_url?: string | null;
  status: number;
}

export default async function AdminTeamPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const team = (await query<RowDataPacket[]>(
    "SELECT id, initials, name, role, image_url, status FROM team_members ORDER BY id ASC"
  )) as TeamMember[];

  return <TeamList initialTeam={team} />;
}
