import type { ReactNode } from "react";
import "./site.css";
import { SiteSettingsProvider } from "@/components/site/SiteSettingsContext";
import { getSiteSettings } from "@/lib/siteData";

export const dynamic = "force-dynamic";

// Public marketing site (v2 design). /admin and /portal keep their own layouts.
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <SiteSettingsProvider value={settings}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div className="site-root">{children}</div>
    </SiteSettingsProvider>
  );
}
