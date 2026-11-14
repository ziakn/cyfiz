import type { RowDataPacket } from "mysql2";
import { query } from "./db";
import { slugify } from "./utils";
import { DEFAULT_SETTINGS, type SiteSettingKey, type SiteSettings } from "./siteSettings";

export interface SiteArticle extends RowDataPacket {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string | null;
  image_url: string | null;
}

export interface SiteArticleDetail extends SiteArticle {
  content: string | null;
  author_name: string | null;
  author_role: string | null;
  audience: string | null;
}

export interface SiteTraining extends RowDataPacket {
  id: number;
  title: string;
  category: string;
  format: string | null;
  duration: string | null;
  summary: string;
  link_url: string | null;
}

export const articleHref = (a: { id: number; title: string }) => `/insights/${a.id}-${slugify(a.title)}`;

const ARTICLE_COLS =
  "id, tag, DATE_FORMAT(date, '%M %d, %Y') AS date, title, excerpt, read_time AS readTime, image_url";

export async function getPublishedArticles(limit?: number) {
  return query<SiteArticle[]>(
    `SELECT ${ARTICLE_COLS} FROM articles WHERE status = 1 ORDER BY articles.date DESC, id DESC${limit ? ` LIMIT ${Math.floor(limit)}` : ""}`
  );
}

export async function getArticleDetail(id: number) {
  const rows = await query<SiteArticleDetail[]>(
    `SELECT ${ARTICLE_COLS}, content, author_name, author_role, audience FROM articles WHERE id = ? AND status = 1 LIMIT 1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getRelatedArticles(id: number, tag: string, limit = 3) {
  return query<SiteArticle[]>(
    `SELECT ${ARTICLE_COLS} FROM articles WHERE status = 1 AND id <> ?
     ORDER BY (tag = ?) DESC, articles.date DESC, id DESC LIMIT ${Math.floor(limit)}`,
    [id, tag]
  );
}

// The trainings table comes from migration_v2_design.sql; fall back to an empty
// list so the Learn page still renders before the migration has been applied.
export async function getPublishedTrainings() {
  try {
    return await query<SiteTraining[]>(
      "SELECT id, title, category, format, duration, summary, link_url FROM trainings WHERE status = 1 ORDER BY sort_order ASC, id ASC"
    );
  } catch (error) {
    console.error("Could not load trainings:", error);
    return [] as SiteTraining[];
  }
}

// ───────── Site settings (admin → Settings) ─────────
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await query<{ setting_key: string; setting_value: string }[]>(
      "SELECT setting_key, setting_value FROM site_settings WHERE status = 1"
    );
    const out = { ...DEFAULT_SETTINGS };
    for (const r of rows) if (r.setting_key in out) out[r.setting_key as SiteSettingKey] = r.setting_value;
    return out;
  } catch (error) {
    console.error("Could not load site settings:", error);
    return { ...DEFAULT_SETTINGS };
  }
}

// ───────── Who@m! page content (admin → Who@m! page modules) ─────────
export interface ProfileCredential { id: number; name: string; detail: string | null }
export interface ProfileExpertise { id: number; icon: string; title: string; summary: string; highlight_bold: string | null; highlight_text: string | null; bullets: string | null }
export interface ProfileSpeaking { id: number; title: string }
export interface ProfileResearch { id: number; kind: string; year: string | null; title: string; venue: string | null; url: string | null; links: string | null }

async function safeRows<T>(sql: string): Promise<T[]> {
  try {
    return await query<T[]>(sql);
  } catch (error) {
    console.error("Could not load profile content:", error);
    return [];
  }
}

export async function getProfileContent() {
  const [credentials, expertise, speaking, research] = await Promise.all([
    safeRows<ProfileCredential>("SELECT id, name, detail FROM profile_credentials WHERE status = 1 ORDER BY sort_order ASC, id ASC"),
    safeRows<ProfileExpertise>("SELECT id, icon, title, summary, highlight_bold, highlight_text, bullets FROM profile_expertise WHERE status = 1 ORDER BY sort_order ASC, id ASC"),
    safeRows<ProfileSpeaking>("SELECT id, title FROM profile_speaking WHERE status = 1 ORDER BY sort_order ASC, id ASC"),
    safeRows<ProfileResearch>("SELECT id, kind, year, title, venue, url, links FROM profile_research WHERE status = 1 ORDER BY sort_order ASC, id ASC"),
  ]);
  return { credentials, expertise, speaking, research };
}

/** "Button label | https://link" per line -> [{ label, href }] */
export function parseLinkLines(text: string | null) {
  return (text ?? "")
    .split("\n")
    .map((l) => l.split("|").map((p) => p.trim()))
    .filter((p) => p.length >= 2 && p[0] && /^https?:\/\//i.test(p[1]))
    .map((p) => ({ label: p[0], href: p[1] }));
}

// ───────── Packages (admin → Packages) ─────────
export interface SitePackage {
  id: number;
  name: string;
  tier: string;
  price: string | null;
  period: string | null;
  description: string | null;
  features: string | null;
  badge: string | null;
  featured: string;
  cta_label: string | null;
  cta_url: string | null;
}

export async function getPublishedPackages() {
  try {
    return await query<SitePackage[]>(
      "SELECT id, name, tier, price, period, description, features, badge, featured, cta_label, cta_url FROM packages WHERE status = 1 ORDER BY sort_order ASC, id ASC"
    );
  } catch (error) {
    console.error("Could not load packages:", error);
    return [] as SitePackage[];
  }
}
