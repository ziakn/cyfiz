import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import SettingsList from "./SettingsList";

interface SettingRow extends RowDataPacket {
  id: number;
  setting_key: string;
  setting_value: string;
  status: number;
}

interface StatRow extends RowDataPacket {
  id: number;
  value: string;
  label: string;
  status: number;
}

interface PartnerRow extends RowDataPacket {
  id: number;
  name: string;
  image_url?: string | null;
  status: number;
}

export default async function AdminSettingsPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const [settings, stats, partners] = await Promise.all([
    query<SettingRow[]>("SELECT * FROM site_settings ORDER BY id ASC"),
    query<StatRow[]>("SELECT * FROM site_stats ORDER BY id ASC"),
    query<PartnerRow[]>("SELECT * FROM partners ORDER BY id ASC")
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#3A3541] opacity-[0.87]">Site Settings</h1>
        <p className="text-sm text-[#3A3541] opacity-[0.6]">Manage landing page content, statistics, and partners.</p>
      </div>
      
      <SettingsList 
        initialSettings={settings} 
        initialStats={stats}
        initialPartners={partners}
      />
    </div>
  );
}
