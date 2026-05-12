import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const [leaderboard, pastQuizzes] = await Promise.all([
      query("SELECT rank, name, score, streak FROM quiz_leaderboard WHERE status = 1 ORDER BY rank"),
      query("SELECT week, topic, participants, avg_score as avgScore FROM past_quizzes WHERE status = 1 ORDER BY week DESC")
    ]);
    return NextResponse.json({ leaderboard, pastQuizzes });
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return NextResponse.json({ error: "Failed to fetch quiz data" }, { status: 500 });
  }
}