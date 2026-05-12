import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const summaries = await query(
      "SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time as readTime, source, citations, image_url FROM research_summaries WHERE status = 1 ORDER BY date DESC"
    );
    return NextResponse.json({ summaries });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json({ error: "Failed to fetch summaries" }, { status: 500 });
  }
}