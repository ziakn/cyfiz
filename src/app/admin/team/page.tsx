import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import TeamList from "./TeamList";

interface TeamMember {
  id: number;
  initials: string;
  name: string;
  role: string;
  image_url?: string | null;
  bio?: string | null;
  expertise?: string | null;
  portfolio_highlights?: string | null;
  portfolio_url?: string | null;
  status: number;
}

export default async function AdminTeamPage() {
  const team = (await query<RowDataPacket[]>(
    "SELECT id, initials, name, role, image_url, bio, expertise, portfolio_highlights, portfolio_url, status FROM team_members ORDER BY id ASC"
  )) as TeamMember[];

  return <TeamList initialTeam={team} />;
}
