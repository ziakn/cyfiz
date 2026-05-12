import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const [socials, team, stats] = await Promise.all([
      query("SELECT name, handle, description, icon, href, cta FROM social_links WHERE status = 1 ORDER BY id ASC"),
      query("SELECT initials, name, role, image_url FROM team_members WHERE status = 1 ORDER BY id ASC"),
      query("SELECT value, label FROM site_stats WHERE status = 1 ORDER BY id ASC")
    ]);

    return NextResponse.json({ socials, team, stats });
  } catch (error) {
    console.error("Error fetching connect data:", error);
    return NextResponse.json({ error: "Failed to fetch connect data" }, { status: 500 });
  }
}