import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import ArticleList from "./ArticleList";
import { truncate } from "@/lib/utils";

interface ArticleItem {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  summary: string;
  content: string | null;
  author_name: string | null;
  author_role: string | null;
  audience: string | null;
  readTime: string;
  image_url?: string | null;
  status: number;
}

export default async function AdminArticlesPage() {
  const articles = (await query<RowDataPacket[]>(
    "SELECT id, tag, date, title, excerpt, content, author_name, author_role, audience, read_time as readTime, image_url, status FROM articles ORDER BY date DESC, id DESC"
  )) as ArticleItem[];
  // Older articles kept the whole body in `excerpt`; show a plain summary for them.
  for (const a of articles) a.summary = truncate(a.excerpt, 240);

  return <ArticleList initialArticles={articles} />;
}
