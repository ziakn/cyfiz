"use client";

import { useState } from "react";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusToggle from "@/components/admin/StatusToggle";
import ImageUpload from "@/components/admin/ImageUpload";
import { toggleStatusAction } from "../actions";
import { deleteArticleAction, addArticleAction, editArticleAction } from "./actions";

interface ArticleItem {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image_url?: string | null;
  status: number;
}

export default function ArticleList({ initialArticles }: { initialArticles: ArticleItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; articleId: number | null; title: string }>({
    open: false,
    articleId: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState<{ open: boolean; article: ArticleItem | null }>({
    open: false,
    article: null,
  });

  const filteredArticles = initialArticles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (article: ArticleItem) => {
    setDeleteModal({
      open: true,
      articleId: article.id,
      title: article.title,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.articleId) return;
    
    setIsDeleting(true);
    const result = await deleteArticleAction(deleteModal.articleId);
    
    setIsDeleting(false);
    if (result.success) {
      setDeleteModal({ open: false, articleId: null, title: "" });
    } else {
      alert(result.error || "Failed to delete article");
    }
  };

  const handleStatusToggle = async (articleId: number, newStatus: number) => {
    const result = await toggleStatusAction("articles", articleId, newStatus, "/admin/articles");
    return result.success;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <input 
            type="text" 
            placeholder="Search Article" 
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
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Article
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
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Image</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Article</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Read Time</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                  </td>
                  <td className="px-6 py-4">
                    <ImageUpload 
                      table="articles" 
                      id={article.id} 
                      folder="articles" 
                      currentImage={article.image_url} 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">{article.title}</span>
                      <span className="line-clamp-1 text-[10px] text-[#3A3541] opacity-[0.38]">{article.excerpt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#9155FD] bg-opacity-[0.12] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9155FD]">
                      {article.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#3A3541] opacity-[0.6]">
                    {new Date(article.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#3A3541] opacity-[0.6]">
                    {article.readTime}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusToggle 
                        initialStatus={article.status} 
                        onToggle={(newStatus) => handleStatusToggle(article.id, newStatus)} 
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        article.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                      }`}>
                        {article.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => setEditModal({ open: true, article })}
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(article)}
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
        title="Delete Article"
        itemName={deleteModal.title}
        isDeleting={isDeleting}
      />

      {/* Add Article Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
          <div className="w-full max-w-2xl scale-100 rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">Add New Article</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form action={async (formData) => {
              const result = await addArticleAction(formData);
              if (result.success) {
                setAddModalOpen(false);
              } else {
                alert(result.error || "Failed to add article");
              }
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Title</label>
                  <input name="title" required className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Category/Tag</label>
                  <select name="tag" required className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]">
                    <option value="AI Security">AI Security</option>
                    <option value="Privacy">Privacy</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="AI Policy">AI Policy</option>
                    <option value="Research">Research</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Excerpt</label>
                <textarea name="excerpt" required rows={3} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Read Time (e.g. 5 min read)</label>
                  <input name="readTime" required className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Date (Optional)</label>
                  <input type="date" name="date" className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Article Modal */}
      {editModal.open && editModal.article && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
          <div className="w-full max-w-2xl scale-100 rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">Edit Article</h3>
              <button onClick={() => setEditModal({ open: false, article: null })} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <form action={async (formData) => {
              const result = await editArticleAction(editModal.article!.id, formData);
              if (result.success) {
                setEditModal({ open: false, article: null });
              } else {
                alert(result.error || "Failed to update article");
              }
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Title</label>
                  <input name="title" required defaultValue={editModal.article.title} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Category/Tag</label>
                  <select name="tag" required defaultValue={editModal.article.tag} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]">
                    <option value="AI Security">AI Security</option>
                    <option value="Privacy">Privacy</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="AI Policy">AI Policy</option>
                    <option value="Research">Research</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Excerpt</label>
                <textarea name="excerpt" required rows={3} defaultValue={editModal.article.excerpt} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Read Time (e.g. 5 min read)</label>
                  <input name="readTime" required defaultValue={editModal.article.readTime} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Date</label>
                  <input type="date" name="date" required defaultValue={new Date(editModal.article.date).toISOString().split('T')[0]} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setEditModal({ open: false, article: null })}
                  className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
                >
                  Update Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
