"use client";

import { useState } from "react";
import { SETTING_FIELDS, type SiteSettings } from "@/lib/siteSettings";
import { saveSettingsAction } from "./actions";

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save(formData: FormData) {
    const res = await saveSettingsAction(formData);
    setMsg(res.success ? { ok: true, text: "Settings saved." } : { ok: false, text: res.error || "Failed to save." });
  }

  return (
    <form action={save} className="space-y-5 rounded-lg bg-white p-8 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
      {SETTING_FIELDS.map((f) => (
        <div key={f.key} className="space-y-1">
          <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">{f.label}</label>
          <input name={f.key} defaultValue={initial[f.key]} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
          <p className="text-xs opacity-50">{f.hint}</p>
        </div>
      ))}
      {msg && <p className={`text-sm font-semibold ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</p>}
      <button type="submit" className="rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white">Save settings</button>
    </form>
  );
}
