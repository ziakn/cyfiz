"use client";

import { useState } from "react";
import { addUserAction, editUserAction, removeUserAction, updateUserStatusAction } from "./actions";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusToggle from "@/components/admin/StatusToggle";

interface AdminUser {
  id: number;
  email: string;
  role: string;
  status: number;
  createdAt: string;
}

export default function UserList({ initialUsers, currentUserEmail }: { initialUsers: AdminUser[], currentUserEmail: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; userId: number | null; email: string }>({
    open: false,
    userId: null,
    email: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredUsers = initialUsers.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    let result;

    if (editingUser) {
      result = await editUserAction(editingUser.id, formData);
    } else {
      result = await addUserAction(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      setEditingUser(null);
    } else {
      setError(result.error || "An error occurred");
    }
    setIsSubmitting(false);
  };

  const handleDeleteClick = (user: AdminUser) => {
    setDeleteModal({
      open: true,
      userId: user.id,
      email: user.email,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.userId) return;
    
    setIsDeleting(true);
    const result = await removeUserAction(deleteModal.userId);
    setIsDeleting(false);
    
    if (result.success) {
      setDeleteModal({ open: false, userId: null, email: "" });
    } else {
      alert(result.error);
    }
  };

  const handleStatusToggle = async (userId: number, newStatus: number) => {
    const result = await updateUserStatusAction(userId, newStatus);
    return result.success;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <input 
            type="text" 
            placeholder="Search User" 
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
            onClick={() => { setEditingUser(null); setIsModalOpen(true); }}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New User
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
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">User</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Joined</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filteredUsers.map((admin) => (
                <tr key={admin.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9155FD] bg-opacity-[0.12] text-sm font-bold text-[#9155FD]">
                        {admin.email[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">{admin.email.split('@')[0]}</span>
                        <span className="text-[10px] text-[#3A3541] opacity-[0.38]">{admin.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#3A3541] opacity-[0.6]">
                    {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusToggle 
                        initialStatus={admin.status} 
                        onToggle={(newStatus) => handleStatusToggle(admin.id, newStatus)} 
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        admin.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                      }`}>
                        {admin.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#3A3541] opacity-[0.6]">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => { setEditingUser(admin); setIsModalOpen(true); }}
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      {admin.email !== currentUserEmail && (
                        <button 
                          onClick={() => handleDeleteClick(admin)}
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FF4D49] hover:opacity-100"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="flex items-center justify-between border-t border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-6 py-4">
          <div className="flex items-center gap-4 text-xs text-[#3A3541] opacity-[0.6]">
            <span>Rows Per Page:</span>
            <select className="bg-transparent font-bold focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold text-[#3A3541] opacity-[0.87]">
            <span>1 - {filteredUsers.length} of {filteredUsers.length}</span>
            <div className="flex items-center gap-4">
              <button disabled className="opacity-30"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
              <button disabled className="opacity-30"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={confirmDelete}
        title="Delete User"
        itemName={deleteModal.email}
        isDeleting={isDeleting}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-[#3A3541] opacity-[0.87] mb-6">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded bg-red-50 p-3 text-xs text-red-600">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-[#3A3541] opacity-[0.38] uppercase mb-1">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  defaultValue={editingUser?.email}
                  required 
                  className="w-full rounded-md border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-4 py-2.5 text-sm focus:border-[#9155FD] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#3A3541] opacity-[0.38] uppercase mb-1">
                  Password {editingUser && "(Leave blank to keep current)"}
                </label>
                <input 
                  name="password" 
                  type="password" 
                  required={!editingUser}
                  className="w-full rounded-md border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-4 py-2.5 text-sm focus:border-[#9155FD] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#3A3541] opacity-[0.38] uppercase mb-1">Role</label>
                <select 
                  name="role" 
                  defaultValue={editingUser?.role || "editor"}
                  className="w-full rounded-md border border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB] px-4 py-2.5 text-sm focus:border-[#9155FD] focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.12] py-2.5 text-xs font-bold uppercase text-[#3A3541] opacity-[0.6] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase text-white shadow-md hover:bg-[#804BDF] disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : (editingUser ? "Save Changes" : "Create User")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
