import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const articles = await query(
      "SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time as readTime, image_url FROM articles WHERE status = 1 ORDER BY date DESC"
    );
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}