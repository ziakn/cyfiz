import type { Metadata } from "next";
import { articleHref, getPublishedArticles } from "@/lib/siteData";
import { truncate } from "@/lib/utils";
import InsightsClient, { type InsightItem } from "./InsightsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights — Cyfiz",
  description:
    "Curated intelligence on AI security, privacy regulation and emerging cyber threats for professionals and decision-makers.",
};

export default async function InsightsPage() {
  const rows = await getPublishedArticles();
  const articles: InsightItem[] = rows.map((a) => ({
    id: a.id,
    href: articleHref(a),
    cat: a.tag,
    date: a.date,
    read: a.readTime ? (/read/i.test(a.readTime) ? a.readTime : `${a.readTime} read`) : "",
    title: a.title,
    excerpt: truncate(a.excerpt, 200),
  }));

  return <InsightsClient articles={articles} />;
}
