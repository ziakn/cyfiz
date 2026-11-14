"use client";

import { useState } from "react";
import { useModulePerms } from "@/components/admin/AdminPermissions";
import { ACTIONS, MODULES, type Action, type PermissionMap } from "@/lib/permissions";
import { createRoleAction, deleteRoleAction, updateRoleAction } from "./actions";

export interface RoleRow {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_super: number;
  is_system: number;
  userCount: number;
  permissions: PermissionMap;
}

const input = "w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]";
const label = "text-xs font-semibold text-[#3A3541] opacity-[0.6]";
const groups = Array.from(new Set(MODULES.map((m) => m.group)));

function emptyMatrix(): PermissionMap {
  return Object.fromEntries(MODULES.map((m) => [m.key, { view: false, create: false, update: false, delete: false }]));
}

export default function RoleList({ initial, actorIsSuper }: { initial: RoleRow[]; actorIsSuper: boolean }) {
  const perms = useModulePerms("roles");
  const [modal, setModal] = useState<{ open: boolean; role: RoleRow | null }>({ open: false, role: null });
  const [matrix, setMatrix] = useState<PermissionMap>(emptyMatrix());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const editing = modal.role;

  function openModal(role: RoleRow | null) {
    setMatrix({ ...emptyMatrix(), ...(role?.permissions ?? {}) });
    setError("");
    setModal({ open: true, role });
  }

  function toggle(module: string, action: Action, on: boolean) {
    setMatrix((m) => {
      const cur = { ...m[module] };
      cur[action] = on;
      if (action === "view" && !on) { cur.create = false; cur.update = false; cur.delete = false; }
      if (action !== "view" && on) cur.view = true;
      return { ...m, [module]: cur };
    });
  }

  function toggleRow(module: string, on: boolean) {
    setMatrix((m) => ({ ...m, [module]: { view: on, create: on, update: on, delete: on } }));
  }

  function toggleColumn(action: Action, on: boolean) {
    setMatrix((m) => Object.fromEntries(MODULES.map((mod) => {
      const cur = { ...m[mod.key] };
      cur[action] = on;
      if (action === "view" && !on) { cur.create = false; cur.update = false; cur.delete = false; }
      if (action !== "view" && on) cur.view = true;
      return [mod.key, cur];
    })));
  }

  async function submit(formData: FormData) {
    setSaving(true);
    setError("");
    formData.set("permissions", JSON.stringify(matrix));
    const res = editing ? await updateRoleAction(editing.id, formData) : await createRoleAction(formData);
    setSaving(false);
    if (res.success) setModal({ open: false, role: null });
    else setError(res.error || "Failed to save role");
  }

  async function remove(r: RoleRow) {
    if (!confirm(`Delete the role "${r.name}"?`)) return;
    const res = await deleteRoleAction(r.id);
    if (!res.success) alert(res.error || "Failed to delete");
  }

  const summary = (r: RoleRow) => {
    if (r.is_super) return "Everything";
    const n = Object.values(r.permissions).filter((p) => p.view).length;
    return `${n} of ${MODULES.length} modules`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div>
          <h1 className="text-lg font-bold">Roles &amp; Permissions</h1>
          <p className="text-sm opacity-60">Choose what each role can view, add, change and delete in every module.</p>
        </div>
        {perms.create && (
          <button onClick={() => openModal(null)} className="rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white">Add Role</button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest">
            <tr><th className="px-6 py-4">Role</th><th className="px-6 py-4">Access</th><th className="px-6 py-4">Users</th><th className="px-6 py-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
            {initial.map((r) => (
              <tr key={r.id} className="hover:bg-[#F9FAFB]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-semibold">{r.name}
                    {r.is_super === 1 && <span className="rounded-full bg-[#0C0D10] px-2 py-0.5 text-[10px] font-bold uppercase text-[#FFC21A]">Full access</span>}
                    {r.is_system === 1 && r.is_super !== 1 && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-500">Built-in</span>}
                  </div>
                  <div className="text-xs opacity-60">{r.description}</div>
                </td>
                <td className="px-6 py-4">{summary(r)}</td>
                <td className="px-6 py-4">{r.userCount}</td>
                <td className="px-6 py-4 text-right">
                  {perms.update && r.is_super !== 1 && <button onClick={() => openModal(r)} className="px-2 text-xs font-bold text-[#9155FD]">Edit</button>}
                  {perms.delete && r.is_system !== 1 && <button onClick={() => remove(r)} className="px-2 text-xs font-bold text-red-500">Delete</button>}
                  {r.is_super === 1 && <span className="px-2 text-xs opacity-40">Locked</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl">
            <h3 className="mb-1 text-lg font-bold">{editing ? `Edit role: ${editing.name}` : "Add Role"}</h3>
            {!actorIsSuper && <p className="mb-4 text-xs opacity-60">You can only grant permissions that you have yourself.</p>}
            <form action={submit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className={label}>Role name</label><input name="name" required defaultValue={editing?.name} className={input} /></div>
                <div className="space-y-1"><label className={label}>Description</label><input name="description" defaultValue={editing?.description ?? ""} className={input} /></div>
              </div>

              <div className="overflow-hidden rounded-md border border-[#3A3541] border-opacity-[0.12]">
                <table className="w-full text-sm">
                  <thead className="bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="px-4 py-3 text-left">Module</th>
                      {ACTIONS.map((a) => (
                        <th key={a} className="px-3 py-3 text-center">
                          <label className="flex cursor-pointer flex-col items-center gap-1">
                            {a}
                            <input type="checkbox" checked={MODULES.every((m) => matrix[m.key]?.[a])} onChange={(e) => toggleColumn(a, e.target.checked)} />
                          </label>
                        </th>
                      ))}
                      <th className="px-3 py-3 text-center">All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((g) => (
                      <>
                        <tr key={g} className="bg-[#FAFAFA]"><td colSpan={6} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest opacity-50">{g}</td></tr>
                        {MODULES.filter((m) => m.group === g).map((m) => {
                          const row = matrix[m.key];
                          return (
                            <tr key={m.key} className="border-t border-[#3A3541] border-opacity-[0.08]">
                              <td className="px-4 py-2"><div className="font-medium">{m.label}</div><div className="text-[11px] opacity-50">{m.description}</div></td>
                              {ACTIONS.map((a) => (
                                <td key={a} className="px-3 py-2 text-center">
                                  <input type="checkbox" checked={!!row?.[a]} onChange={(e) => toggle(m.key, a, e.target.checked)} />
                                </td>
                              ))}
                              <td className="px-3 py-2 text-center">
                                <input type="checkbox" checked={ACTIONS.every((a) => row?.[a])} onChange={(e) => toggleRow(m.key, e.target.checked)} />
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs opacity-50">Add, change and delete need &ldquo;view&rdquo;; ticking one turns view on automatically.</p>

              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setModal({ open: false, role: null })} className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2 text-xs font-bold uppercase">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 rounded-md bg-[#9155FD] py-2 text-xs font-bold uppercase text-white disabled:opacity-50">{saving ? "Saving…" : "Save role"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
