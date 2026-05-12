"use client";

import { useState } from "react";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusToggle from "@/components/admin/StatusToggle";
import { toggleStatusAction } from "../actions";
import * as actions from "./actions";

interface LeaderboardItem {
  id: number;
  rank: number;
  name: string;
  score: number;
  streak: number;
  status: number;
}

export default function LeaderboardList({ initialLeaderboard }: { initialLeaderboard: LeaderboardItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; entryId: number | null; name: string }>({
    open: false,
    entryId: null,
    name: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; action: 'add' | 'edit'; data: any }>({
    open: false,
    action: 'add',
    data: null,
  });

  const filteredLeaderboard = initialLeaderboard.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (item: LeaderboardItem) => {
    setDeleteModal({
      open: true,
      entryId: item.id,
      name: item.name,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.entryId) return;
    setIsDeleting(true);
    const result = await actions.deleteLeaderboardEntryAction(deleteModal.entryId);
    setIsDeleting(false);
    if (result.success) setDeleteModal({ open: false, entryId: null, name: "" });
    else alert(result.error || "Delete failed");
  };

  const handleStatusToggle = async (entryId: number, newStatus: number) => {
    const result = await toggleStatusAction("quiz_leaderboard", entryId, newStatus, "/admin/leaderboard");
    return result.success;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <input 
            type="text" 
            placeholder="Search Player" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2 text-sm outline-none transition-colors focus:border-[#9155FD]"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md border border-[#3A3541] border-opacity-[0.12] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] hover:bg-gray-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Export
          </button>
          <button 
            onClick={() => setModal({ open: true, action: 'add', data: null })}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Entry
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-[#3A3541] border-opacity-[0.12]">
              <tr>
                <th className="px-6 py-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Rank</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">User</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Score</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Streak</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filteredLeaderboard.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                      item.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                      item.rank === 2 ? 'bg-gray-100 text-gray-700' :
                      item.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {item.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#3A3541] opacity-[0.87]">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#9155FD]">
                    {item.score.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#FF4D49]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 10-6 12-6 16a6 6 0 0 0 12 0c0-4-6-6-6-16Z"/></svg>
                      {item.streak} Day Streak
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusToggle 
                        initialStatus={item.status} 
                        onToggle={(newStatus) => handleStatusToggle(item.id, newStatus)} 
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                      }`}>
                        {item.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => setModal({ open: true, action: 'edit', data: item })}
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(item)}
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FF4D49] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leaderboard Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
          <div className="w-full max-w-lg scale-100 rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">
                {modal.action === 'add' ? 'Add New' : 'Edit'} Entry
              </h3>
              <button onClick={() => setModal({ ...modal, open: false })} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form action={async (formData) => {
              const result = modal.action === 'add' 
                ? await actions.addLeaderboardEntryAction(formData) 
                : await actions.editLeaderboardEntryAction(modal.data.id, formData);
              
              if (result.success) setModal({ ...modal, open: false });
              else alert(result.error || "Action failed");
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Rank</label>
                  <input name="rank" type="number" required defaultValue={modal.data?.rank} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">User Name</label>
                  <input name="name" required defaultValue={modal.data?.name} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Score</label>
                  <input name="score" type="number" required defaultValue={modal.data?.score} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Streak (Days)</label>
                  <input name="streak" type="number" required defaultValue={modal.data?.streak} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button type="button" onClick={() => setModal({ ...modal, open: false })} className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] hover:bg-[#804BDF]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmationModal 
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={confirmDelete}
        title="Remove Entry"
        itemName={deleteModal.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}
