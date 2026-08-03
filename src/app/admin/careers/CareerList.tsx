"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusToggle from "@/components/admin/StatusToggle";
import { toggleStatusAction } from "../actions";
import { deleteCareerAction, addCareerAction, editCareerAction } from "./actions";
import type { CareerItem } from "./page";

const Editor = dynamic(() => import("@/components/admin/Editor"), { 
  ssr: false,
  loading: () => <div className="h-[200px] w-full animate-pulse rounded-md bg-gray-100" />
});

export default function CareerList({ initialCareers }: { initialCareers: CareerItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; careerId: number | null; title: string }>({
    open: false,
    careerId: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addDescription, setAddDescription] = useState("");
  const [addRequirements, setAddRequirements] = useState("");
  
  const [editModal, setEditModal] = useState<{ open: boolean; career: CareerItem | null }>({
    open: false,
    career: null,
  });
  const [editDescription, setEditDescription] = useState("");
  const [editRequirements, setEditRequirements] = useState("");

  const filteredCareers = initialCareers.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (career: CareerItem) => {
    setDeleteModal({
      open: true,
      careerId: career.id,
      title: career.title,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.careerId) return;
    
    setIsDeleting(true);
    const result = await deleteCareerAction(deleteModal.careerId);
    
    setIsDeleting(false);
    if (result.success) {
      setDeleteModal({ open: false, careerId: null, title: "" });
    } else {
      alert(result.error || "Failed to delete career");
    }
  };

  const handleStatusToggle = async (careerId: number, newStatus: number) => {
    const result = await toggleStatusAction("careers", careerId, newStatus, ["/admin/careers", "/careers"]);
    return result.success;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <input 
            type="text" 
            placeholder="Search Careers" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2 text-sm outline-none transition-colors focus:border-[#9155FD]"
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setAddDescription("");
              setAddRequirements("");
              setAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Career
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-[#3A3541] border-opacity-[0.12]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Title / Dept</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Location / Type</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Source</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filteredCareers.map((career) => (
                <tr key={career.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">{career.title}</span>
                      <span className="text-[10px] text-[#3A3541] opacity-[0.38]">{career.company_name || "Internal"} • {career.department || "No Dept"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#3A3541] opacity-[0.87]">{career.location}</span>
                      <span className="text-[10px] text-[#3A3541] opacity-[0.38]">{career.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#9155FD] bg-opacity-[0.12] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9155FD]">
                      {career.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusToggle 
                        initialStatus={career.status} 
                        onToggle={(newStatus) => handleStatusToggle(career.id, newStatus)} 
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        career.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                      }`}>
                        {career.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => {
                          setEditDescription(career.description || "");
                          setEditRequirements(career.requirements || "");
                          setEditModal({ open: true, career });
                        }}
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(career)}
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

      <DeleteConfirmationModal 
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={confirmDelete}
        title="Delete Career"
        itemName={deleteModal.title}
        isDeleting={isDeleting}
      />

      {/* Add Career Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-3xl scale-100 overflow-y-auto rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">Add New Career</h3>
              <button onClick={() => {
                setAddDescription("");
                setAddRequirements("");
                setAddModalOpen(false);
              }} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form action={async (formData) => {
              const result = await addCareerAction(formData);
              if (result.success) {
                setAddDescription("");
                setAddRequirements("");
                setAddModalOpen(false);
              } else {
                alert(result.error || "Failed to add career");
              }
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Title *</label>
                  <input name="title" required className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Company Name</label>
                  <input name="companyName" className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Department</label>
                  <input name="department" className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Location *</label>
                  <input name="location" required className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Type</label>
                  <select name="type" className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Salary Range</label>
                  <input name="salaryRange" placeholder="e.g. $80,000 - $120,000" className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Apply URL</label>
                  <input name="applyUrl" placeholder="https://..." className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Description *</label>
                <Editor 
                  value={addDescription} 
                  onChange={setAddDescription} 
                  placeholder="Job description..."
                />
                <input type="hidden" name="description" value={addDescription} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Requirements</label>
                <Editor 
                  value={addRequirements} 
                  onChange={setAddRequirements} 
                  placeholder="Job requirements..."
                />
                <input type="hidden" name="requirements" value={addRequirements} />
              </div>
              
              <div className="mt-8 flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setAddDescription("");
                    setAddRequirements("");
                    setAddModalOpen(false);
                  }}
                  className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
                >
                  Save Career
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Career Modal */}
      {editModal.open && editModal.career && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-3xl scale-100 overflow-y-auto rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">Edit Career</h3>
              <button onClick={() => setEditModal({ open: false, career: null })} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form action={async (formData) => {
              const result = await editCareerAction(editModal.career!.id, formData);
              if (result.success) {
                setEditModal({ open: false, career: null });
              } else {
                alert(result.error || "Failed to update career");
              }
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Title *</label>
                  <input name="title" required defaultValue={editModal.career.title} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Company Name</label>
                  <input name="companyName" defaultValue={editModal.career.company_name || ""} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Department</label>
                  <input name="department" defaultValue={editModal.career.department || ""} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Location *</label>
                  <input name="location" required defaultValue={editModal.career.location} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Type</label>
                  <select name="type" defaultValue={editModal.career.type} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Salary Range</label>
                  <input name="salaryRange" defaultValue={editModal.career.salary_range || ""} placeholder="e.g. $80,000 - $120,000" className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Apply URL</label>
                  <input name="applyUrl" defaultValue={editModal.career.apply_url || ""} placeholder="https://..." className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Description *</label>
                <Editor 
                  value={editDescription} 
                  onChange={setEditDescription} 
                  placeholder="Job description..."
                />
                <input type="hidden" name="description" value={editDescription} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Requirements</label>
                <Editor 
                  value={editRequirements} 
                  onChange={setEditRequirements} 
                  placeholder="Job requirements..."
                />
                <input type="hidden" name="requirements" value={editRequirements} />
              </div>
              
              <div className="mt-8 flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModal({ open: false, career: null })}
                  className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
                >
                  Update Career
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
