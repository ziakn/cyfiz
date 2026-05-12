"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import ImageUpload from "@/components/admin/ImageUpload";
import { toggleStatusAction } from "../actions";
import { updateSettingAction, updateStatAction, addPartnerAction, removePartnerAction } from "./actions";

interface Setting {
  id: number;
  setting_key: string;
  setting_value: string;
  status: number;
}

interface Stat {
  id: number;
  value: string;
  label: string;
  status: number;
}

interface Partner {
  id: number;
  name: string;
  image_url?: string | null;
  status: number;
}

export default function SettingsList({ 
  initialSettings, 
  initialStats,
  initialPartners
}: { 
  initialSettings: Setting[], 
  initialStats: Stat[],
  initialPartners: Partner[]
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [stats, setStats] = useState(initialStats);
  const [partners, setPartners] = useState(initialPartners);
  const [newPartner, setNewPartner] = useState("");

  const handleToggle = async (table: string, id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const result = await toggleStatusAction(table, id, newStatus, "/admin/settings");
    return result.success;
  };

  const handleUpdateSetting = async (id: number, value: string) => {
    await updateSettingAction(id, value);
  };

  const handleUpdateStat = async (id: number, value: string, label: string) => {
    await updateStatAction(id, value, label);
  };

  const handleAddPartner = async () => {
    if (!newPartner) return;
    const result = await addPartnerAction(newPartner);
    if (result.success) {
      setNewPartner("");
      window.location.reload();
    }
  };

  const handleRemovePartner = async (id: number) => {
    const result = await removePartnerAction(id);
    if (result.success) {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Site Content Settings */}
      <div className="rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <h2 className="mb-4 text-lg font-bold text-[#3A3541] opacity-[0.87]">Landing Page Content</h2>
        <div className="space-y-6">
          {settings.map((s) => (
            <div key={s.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.38]">
                  {s.setting_key.replace(/_/g, ' ')}
                </label>
                <StatusToggle 
                  initialStatus={s.status} 
                  onToggle={() => handleToggle('site_settings', s.id, s.status)} 
                />
              </div>
              <textarea 
                className="w-full rounded-md border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-4 py-2 text-sm focus:border-[#9155FD] focus:outline-none"
                defaultValue={s.setting_value}
                onBlur={(e) => handleUpdateSetting(s.id, e.target.value)}
                rows={s.setting_key.includes('description') ? 3 : 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Settings */}
      <div className="rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <h2 className="mb-4 text-lg font-bold text-[#3A3541] opacity-[0.87]">Site Statistics</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-4 rounded-md border border-[#3A3541] border-opacity-[0.12] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3A3541] opacity-[0.38]">Stat #{stat.id}</span>
                <StatusToggle 
                  initialStatus={stat.status} 
                  onToggle={() => handleToggle('site_stats', stat.id, stat.status)} 
                />
              </div>
              <input 
                type="text"
                className="w-full rounded-md border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-3 py-2 text-sm font-bold focus:border-[#9155FD] focus:outline-none"
                defaultValue={stat.value}
                placeholder="Value (e.g. 8M+)"
                onBlur={(e) => handleUpdateStat(stat.id, e.target.value, stat.label)}
              />
              <input 
                type="text"
                className="w-full rounded-md border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-3 py-2 text-sm focus:border-[#9155FD] focus:outline-none"
                defaultValue={stat.label}
                placeholder="Label (e.g. Readers)"
                onBlur={(e) => handleUpdateStat(stat.id, stat.value, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Partners Settings */}
      <div className="rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <h2 className="mb-4 text-lg font-bold text-[#3A3541] opacity-[0.87]">Partners (Trusted By)</h2>
        
        <div className="mb-6 flex gap-2">
          <input 
            type="text"
            className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2 text-sm focus:border-[#9155FD] focus:outline-none"
            placeholder="Partner Name"
            value={newPartner}
            onChange={(e) => setNewPartner(e.target.value)}
          />
          <button 
            onClick={handleAddPartner}
            className="rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#804BDF]"
          >
            Add Partner
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {partners.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] p-3">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">{p.name}</span>
                <ImageUpload 
                  table="partners" 
                  id={p.id} 
                  folder="partners" 
                  currentImage={p.image_url} 
                />
              </div>
              <div className="flex flex-col items-center gap-2 border-l border-[#3A3541] border-opacity-[0.12] pl-3">
                <StatusToggle 
                  initialStatus={p.status} 
                  onToggle={() => handleToggle('partners', p.id, p.status)} 
                />
                <button 
                  onClick={() => handleRemovePartner(p.id)}
                  className="text-[#FF4D49] hover:opacity-80"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
