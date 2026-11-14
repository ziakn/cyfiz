"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import { useModulePerms } from "@/components/admin/AdminPermissions";
import { toggleStatusAction } from "../actions";
import { CONTENT_MODULES } from "@/lib/contentModules";
import { deleteContentAction, saveContentAction } from "./actions";

type Row = Record<string, string | number | null> & { id: number; status: number };

const input = "w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]";
const label = "text-xs font-semibold text-[#3A3541] opacity-[0.6]";

export default function ContentList({ moduleKey, rows }: { moduleKey: string; rows: Row[] }) {
  const cfg = CONTENT_MODULES[moduleKey];
  const perms = useModulePerms(cfg.key);
  const [modal, setModal] = useState<{ open: boolean; row: Row | null }>({ open: false, row: null });
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const row = modal.row;

  const visible = rows.filter((r) => cfg.fields.some((f) => String(r[f.key] ?? "").toLowerCase().includes(q.toLowerCase())));

  async function submit(formData: FormData) {
    setError("");
    const res = await saveContentAction(moduleKey, row ? row.id : null, formData);
    if (res.success) setModal({ open: false, row: null });
    else setError(res.error || "Failed to save");
  }

  async function remove(r: Row) {
    if (!confirm(`Delete this ${cfg.singular}?`)) return;
    const res = await deleteContentAction(moduleKey, r.id);
    if (!res.success) alert(res.error || "Failed to delete");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div>
          <h1 className="text-lg font-bold">{cfg.title}</h1>
          <p className="text-sm opacity-60">{cfg.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className={`${input} w-56`} />
          {perms.create && (
            <button onClick={() => { setError(""); setModal({ open: true, row: null }); }} className="rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white">
              Add {cfg.singular}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest">
            <tr><th className="px-6 py-4">Order</th><th className="px-6 py-4">{cfg.singular}</th><th className="px-6 py-4">Visible</th><th className="px-6 py-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
            {visible.map((r) => (
              <tr key={r.id} className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4">{r.sort_order}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold">{r[cfg.titleField]}</div>
                  {cfg.subtitleField && <div className="max-w-xl truncate text-xs opacity-60">{r[cfg.subtitleField]}</div>}
                </td>
                <td className="px-6 py-4">
                  <StatusToggle initialStatus={r.status} disabled={!perms.update} onToggle={async (s) => (await toggleStatusAction(cfg.table, r.id, s, [cfg.publicPath])).success === true} />
                </td>
                <td className="px-6 py-4 text-right">
                  {perms.update && <button onClick={() => { setError(""); setModal({ open: true, row: r }); }} className="px-2 text-xs font-bold text-[#9155FD]">Edit</button>}
                  {perms.delete && <button onClick={() => remove(r)} className="px-2 text-xs font-bold text-red-500">Delete</button>}
                </td>
              </tr>
            ))}
            {visible.length === 0 && <tr><td colSpan={4} className="px-6 py-10 text-center opacity-60">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-lg font-bold">{row ? `Edit ${cfg.singular}` : `Add ${cfg.singular}`}</h3>
            <form action={submit} className="space-y-4">
              {cfg.fields.map((f) => (
                <div key={f.key} className="space-y-1">
                  <label className={label}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea name={f.key} rows={["bullets", "links", "features"].includes(f.key) ? 5 : 3} required={f.required} defaultValue={String(row?.[f.key] ?? "")} className={input} />
                  ) : f.type === "select" ? (
                    <select name={f.key} defaultValue={String(row?.[f.key] ?? f.default ?? "")} className={input}>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
                  ) : (
                    <input name={f.key} type={f.type === "number" ? "number" : "text"} required={f.required} defaultValue={String(row?.[f.key] ?? f.default ?? "")} className={input} />
                  )}
                  {f.hint && <p className="text-xs opacity-50">{f.hint}</p>}
                </div>
              ))}
              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
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
