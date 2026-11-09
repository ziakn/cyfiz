"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteSettings } from "@/lib/siteSettings";

const defaults: SiteSettings = {
  contact_email: "cyfiz@cyfiz.com", linkedin_url: "", x_url: "", youtube_url: "", discord_url: "", subscriber_label: "1,000+",
};

const Ctx = createContext<SiteSettings>(defaults);

export function SiteSettingsProvider({ value, children }: { value: SiteSettings; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSiteSettings = () => useContext(Ctx);
