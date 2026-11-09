"use client";

import { useState } from "react";
import { deleteMessageAction, setMessageHandledAction } from "./actions";

export interface MessageRow {
  id: number;
  topic: string | null;
  name: string;
  email: string;
  organisation: string | null;
  role: string | null;
  message: string;
  subscribe: number;
  status: number; // 1 = new, 0 = handled
  created_at: string;
}

export default function MessageList({ initial }: { initial: MessageRow[] }) {
  const [filter, setFilter] = useState<"new" | "all">("new");
  const rows = initial.filter((m) => filter === "all" || m.status === 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <h1 className="text-lg font-bold">Contact messages <span className="ml-2 text-sm font-normal opacity-60">{initial.filter((m) => m.status === 1).length} new</span></h1>
        <div className="flex gap-2 text-xs font-bold uppercase">
          {(["new", "all"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-md px-4 py-2 ${filter === f ? "bg-[#9155FD] text-white" : "border border-[#3A3541] border-opacity-[0.22]"}`}>{f}</button>
          ))}
        </div>
      </div>

      {rows.map((m) => (
        <div key={m.id} className={`rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] ${m.status === 0 ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-semibold">{m.name} <a className="font-normal text-[#9155FD]" href={`mailto:${m.email}`}>&lt;{m.email}&gt;</a></div>
              <div className="text-xs opacity-60">{[m.role, m.organisation].filter(Boolean).join(" · ") || "—"} · {m.created_at}</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              {m.topic && <span className="rounded-full bg-[#F4EEFF] px-3 py-1 text-[#9155FD]">{m.topic}</span>}
              {m.subscribe === 1 && <span className="rounded-full bg-[#E8F8DD] px-3 py-1 text-[#3C9A00]">Subscribed</span>}
            </div>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
          <div className="mt-4 flex gap-4 text-xs font-bold uppercase">
            <a href={`mailto:${m.email}?subject=Re: your message to Cyfiz`} className="text-[#9155FD]">Reply</a>
            <button onClick={() => setMessageHandledAction(m.id, m.status === 1)} className="text-[#3A3541]">{m.status === 1 ? "Mark handled" : "Mark new"}</button>
            <button onClick={async () => { if (confirm("Delete this message?")) await deleteMessageAction(m.id); }} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
      {rows.length === 0 && <div className="rounded-lg bg-white p-10 text-center opacity-60">No messages.</div>}
    </div>
  );
}
