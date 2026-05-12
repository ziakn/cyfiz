import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import SummaryList from "./SummaryList";

interface SummaryItem {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  source: string;
  image_url?: string | null;
  status: number;
}

export default async function AdminSummariesPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const summaries = (await query<RowDataPacket[]>(
    "SELECT id, tag, date, title, excerpt, read_time as readTime, source, image_url, status FROM research_summaries ORDER BY date DESC"
  )) as SummaryItem[];

  return <SummaryList initialSummaries={summaries} />;
}
