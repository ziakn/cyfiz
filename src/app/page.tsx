import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Newsletter from "@/components/Newsletter";
import Frameworks from "@/components/Frameworks";
import Research from "@/components/Research";
import Stats from "@/components/Stats";
import Academy from "@/components/Academy";
import Tools from "@/components/Tools";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";

async function getLandingData() {
  const [articles, summaries, stats, settings, partners] = await Promise.all([
    query<RowDataPacket[]>("SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time as readTime, image_url FROM articles WHERE status = 1 ORDER BY date DESC LIMIT 3"),
    query<RowDataPacket[]>("SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time as readTime, source, image_url FROM research_summaries WHERE status = 1 ORDER BY date DESC LIMIT 3"),
    query<RowDataPacket[]>("SELECT value, label FROM site_stats WHERE status = 1 ORDER BY id ASC"),
    query<RowDataPacket[]>("SELECT setting_key, setting_value FROM site_settings WHERE status = 1"),
    query<RowDataPacket[]>("SELECT name, image_url FROM partners WHERE status = 1")
  ]);

  const settingsMap = (settings as any[]).reduce((acc: any, curr: any) => {
    acc[curr.setting_key] = curr.setting_value;
    return acc;
  }, {});

  return { articles, summaries, stats, settings: settingsMap, partners };
}

export default async function Home() {
  const { articles, summaries, stats, settings, partners } = await getLandingData();

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
        <Frameworks articles={articles as any} />
        <Research summaries={summaries as any} />
        <Stats stats={stats as any} />
        {/* <Academy /> */}
        {/* <Tools /> */}
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
}
