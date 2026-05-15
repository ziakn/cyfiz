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
  const articles = (await query<RowDataPacket[]>(
    "SELECT id, tag, date, title, excerpt, read_time as readTime, image_url, status FROM articles ORDER BY date DESC"
  )) as ArticleItem[];

  return <ArticleList initialArticles={articles} />;
}
