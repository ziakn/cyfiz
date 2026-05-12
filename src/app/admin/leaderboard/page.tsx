import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import LeaderboardList from "./LeaderboardList";

interface LeaderboardItem {
  id: number;
  rank: number;
  name: string;
  score: number;
  streak: number;
  status: number;
}

export default async function AdminLeaderboardPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const leaderboard = (await query<RowDataPacket[]>(
    "SELECT id, rank, name, score, streak, status FROM quiz_leaderboard ORDER BY rank ASC"
  )) as LeaderboardItem[];

  return <LeaderboardList initialLeaderboard={leaderboard} />;
}
