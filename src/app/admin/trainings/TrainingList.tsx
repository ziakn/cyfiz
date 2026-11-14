"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import { toggleStatusAction } from "../actions";
import { useModulePerms } from "@/components/admin/AdminPermissions";
import { addTrainingAction, deleteTrainingAction, editTrainingAction } from "./actions";

export interface TrainingRow {
  id: number;
  title: string;
  category: string;
  format: string | null;
  duration: string | null;
  summary: string;
  link_url: string | null;
  sort_order: number;
  status: number;
}

const input = "w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]";
const label = "text-xs font-semibold text-[#3A3541] opacity-[0.6]";
const CATEGORIES = ["Cybersecurity", "Privacy", "AI Governance", "AI Security", "Robotics"];

export default function TrainingList({ initial }: { initial: TrainingRow[] }) {
  const perms = useModulePerms("trainings");
  const [modal, setModal] = useState<{ open: boolean; row: TrainingRow | null }>({ open: false, row: null });
  const [q, setQ] = useState("");
  const rows = initial.filter((r) => (r.title + r.category).toLowerCase().includes(q.toLowerCase()));
  const row = modal.row;

  async function submit(formData: FormData) {
    const res = row ? await editTrainingAction(row.id, formData) : await addTrainingAction(formData);
    if (res.success) setModal({ open: false, row: null });
    else alert(res.error || "Failed to save training");
  }

  async function remove(r: TrainingRow) {
    if (!confirm(`Delete "${r.title}"?`)) return;
    const res = await deleteTrainingAction(r.id);
    if (!res.success) alert(res.error || "Failed to delete");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trainings" className={`${input} max-w-sm`} />
        {perms.create && (
        <button onClick={() => setModal({ open: true, row: null })} className="rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#804BDF]">
          Add Training
        </button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <table className="w-full text-left">
          <thead className="border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#3A3541]">
            <tr><th className="px-6 py-4">Training</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Format</th><th className="px-6 py-4">Order</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12] text-sm">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4"><div className="font-semibold">{r.title}</div><div className="max-w-md truncate text-xs opacity-60">{r.summary}</div></td>
                <td className="px-6 py-4">{r.category}</td>
                <td className="px-6 py-4">{[r.format, r.duration].filter(Boolean).join(" · ") || "—"}</td>
                <td className="px-6 py-4">{r.sort_order}</td>
                <td className="px-6 py-4">
                  <StatusToggle initialStatus={r.status} disabled={!perms.update} onToggle={async (s) => (await toggleStatusAction("trainings", r.id, s, ["/admin/trainings", "/learn"])).success === true} />
                </td>
                <td className="px-6 py-4 text-right">
                  {perms.update && <button onClick={() => setModal({ open: true, row: r })} className="px-2 text-xs font-bold text-[#9155FD]">Edit</button>}
                  {perms.delete && <button onClick={() => remove(r)} className="px-2 text-xs font-bold text-red-500">Delete</button>}
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="px-6 py-10 text-center opacity-60">No trainings yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-lg font-bold">{row ? "Edit Training" : "Add Training"}</h3>
            <form action={submit} className="space-y-4">
              <div className="space-y-1"><label className={label}>Title</label><input name="title" required defaultValue={row?.title} className={input} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className={label}>Category</label>
                  <select name="category" required defaultValue={row?.category ?? CATEGORIES[0]} className={input}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
                <div className="space-y-1"><label className={label}>Sort order</label><input type="number" name="sortOrder" defaultValue={row?.sort_order ?? 0} className={input} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className={label}>Format (e.g. Online, Workshop)</label><input name="format" defaultValue={row?.format ?? ""} className={input} /></div>
                <div className="space-y-1"><label className={label}>Duration (e.g. 2 days)</label><input name="duration" defaultValue={row?.duration ?? ""} className={input} /></div>
              </div>
              <div className="space-y-1"><label className={label}>One-line summary</label><textarea name="summary" required rows={3} defaultValue={row?.summary} className={input} /></div>
              <div className="space-y-1"><label className={label}>Link (optional, opens when the card is clicked)</label><input name="linkUrl" defaultValue={row?.link_url ?? ""} placeholder="https://" className={input} /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal({ open: false, row: null })} className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2 text-xs font-bold uppercase">Cancel</button>
                <button type="submit" className="flex-1 rounded-md bg-[#9155FD] py-2 text-xs font-bold uppercase text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
