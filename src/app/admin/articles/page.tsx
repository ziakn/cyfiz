import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import ArticleList from "./ArticleList";

interface ArticleItem {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image_url?: string | null;
  status: number;
}

export default async function AdminArticlesPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const articles = (await query<RowDataPacket[]>(
    "SELECT id, tag, date, title, excerpt, read_time as readTime, image_url, status FROM articles ORDER BY date DESC"
  )) as ArticleItem[];

  return <ArticleList initialArticles={articles} />;
}
