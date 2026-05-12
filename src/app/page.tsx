import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Frameworks from "@/components/Frameworks";
import Research from "@/components/Research";
import Stats from "@/components/Stats";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

interface LandingArticle extends RowDataPacket {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image_url?: string | null;
}

interface LandingSummary extends LandingArticle {
  source: string;
}

interface LandingStat extends RowDataPacket {
  value: string;
  label: string;
}

interface SiteSetting extends RowDataPacket {
  setting_key: string;
  setting_value: string;
}

async function getLandingData() {
  const [articles, summaries, stats, settings] = await Promise.all([
    query<LandingArticle[]>("SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time as readTime, image_url FROM articles WHERE status = 1 ORDER BY date DESC LIMIT 3"),
    query<LandingSummary[]>("SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time as readTime, source, image_url FROM research_summaries WHERE status = 1 ORDER BY date DESC LIMIT 3"),
    query<LandingStat[]>("SELECT value, label FROM site_stats WHERE status = 1 ORDER BY id ASC"),
    query<SiteSetting[]>("SELECT setting_key, setting_value FROM site_settings WHERE status = 1")
  ]);

  const settingsMap = settings.reduce<Record<string, string>>((acc, curr) => {
    acc[curr.setting_key] = curr.setting_value;
    return acc;
  }, {});

  return { articles, summaries, stats, settings: settingsMap };
}

export default async function Home() {
  const { articles, summaries, stats, settings } = await getLandingData();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          title={settings.hero_title}
          subtitle={settings.hero_subtitle}
          description={settings.hero_description}
        />
        {/* <TrustedBy partners={partners as any} /> */}
        {/* <Newsletter
          title={settings.newsletter_title}
          description={settings.newsletter_description}
        /> */}
        <Frameworks articles={articles} />
        <Research summaries={summaries} />
        <Stats stats={stats} />
        {/* <Academy /> */}
        {/* <Tools /> */}
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
