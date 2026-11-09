import { getSiteSettings } from "@/lib/siteData";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#3A3541] opacity-[0.87]">Site Settings</h1>
        <p className="text-sm text-[#3A3541] opacity-[0.6]">Contact details and social links used in the footer, Contact page and newsletter forms.</p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
