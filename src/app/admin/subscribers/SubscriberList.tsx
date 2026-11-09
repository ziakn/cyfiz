"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import { toggleStatusAction } from "../actions";
import { deleteSubscriberAction } from "./actions";

export interface SubscriberRow { id: number; email: string; source: string; status: number; created_at: string }

export default function SubscriberList({ initial }: { initial: SubscriberRow[] }) {
  const [q, setQ] = useState("");
  const rows = initial.filter((r) => r.email.toLowerCase().includes(q.toLowerCase()));
  const active = initial.filter((r) => r.status === 1);
  const csv = "data:text/csv;charset=utf-8," + encodeURIComponent("email,source,signed_up\n" + active.map((r) => `${r.email},${r.source},${r.created_at}`).join("\n"));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search email" className="w-full max-w-sm rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2 text-sm outline-none focus:border-[#9155FD]" />
        <div className="flex items-center gap-4 text-sm"><span className="opacity-60">{active.length} active of {initial.length}</span>
          <a href={csv} download="cyfiz-subscribers.csv" className="rounded-md bg-[#9155FD] px-5 py-2 text-xs font-bold uppercase text-white">Export active CSV</a></div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest"><tr><th className="px-6 py-4">Email</th><th className="px-6 py-4">Source</th><th className="px-6 py-4">Joined</th><th className="px-6 py-4">Subscribed</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-3">{r.email}</td><td className="px-6 py-3">{r.source}</td><td className="px-6 py-3">{r.created_at}</td>
                <td className="px-6 py-3"><StatusToggle initialStatus={r.status} onToggle={async (s) => (await toggleStatusAction("newsletter_subscribers", r.id, s, "/admin/subscribers")).success === true} /></td>
                <td className="px-6 py-3 text-right"><button onClick={async () => { if (confirm(`Delete ${r.email}?`)) await deleteSubscriberAction(r.id); }} className="text-xs font-bold text-red-500">Delete</button></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="px-6 py-10 text-center opacity-60">No subscribers.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
