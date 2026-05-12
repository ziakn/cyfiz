import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, getSessionUserFromCookie } from "@/lib/auth";
import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import SettingsList from "./SettingsList";

export default async function AdminSettingsPage() {
  const cookiesStore = await cookies();
  const cookieValue = cookiesStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  const user = getSessionUserFromCookie(cookieValue);
  if (!user) {
    redirect("/admin");
  }

  const [settings, stats, partners] = await Promise.all([
    query<RowDataPacket[]>("SELECT * FROM site_settings ORDER BY id ASC"),
    query<RowDataPacket[]>("SELECT * FROM site_stats ORDER BY id ASC"),
    query<RowDataPacket[]>("SELECT * FROM partners ORDER BY id ASC")
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#3A3541] opacity-[0.87]">Site Settings</h1>
        <p className="text-sm text-[#3A3541] opacity-[0.6]">Manage landing page content, statistics, and partners.</p>
      </div>
      
      <SettingsList 
        initialSettings={settings as any} 
        initialStats={stats as any}
        initialPartners={partners as any}
      />
    </div>
  );
}
