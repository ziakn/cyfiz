"use client";

import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusToggle from "@/components/admin/StatusToggle";
import ImageUpload from "@/components/admin/ImageUpload";
import { toggleStatusAction } from "../actions";

interface SummaryItem {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  source: string;
  image_url?: string | null;
  status: number;
}

export default function SummaryList({ initialSummaries }: { initialSummaries: SummaryItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; summaryId: number | null; title: string }>({
    open: false,
    summaryId: null,
    title: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredSummaries = initialSummaries.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (summary: SummaryItem) => {
    setDeleteModal({
      open: true,
      summaryId: summary.id,
      title: summary.title,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.summaryId) return;
    
    setIsDeleting(true);
    // Placeholder
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setDeleteModal({ open: false, summaryId: null, title: "" });
    alert("Summary deletion is currently a UI placeholder.");
  };

  const handleStatusToggle = async (summaryId: number, newStatus: number) => {
    const result = await toggleStatusAction("research_summaries", summaryId, newStatus, "/admin/summaries");
    return result.success;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <input 
            type="text" 
            placeholder="Search Summary" 
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
          <button className="inline-flex items-center gap-2 rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Summary
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
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Title</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Source</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Tag</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filteredSummaries.map((summary) => (
                <tr key={summary.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD]" />
                  </td>
                  <td className="px-6 py-4">
                    <ImageUpload 
                      table="research_summaries" 
                      id={summary.id} 
                      folder="summaries" 
                      currentImage={summary.image_url} 
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">{summary.title}</span>
                      <span className="line-clamp-1 text-[10px] text-[#3A3541] opacity-[0.38]">{summary.excerpt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#3A3541] opacity-[0.6]">
                    {summary.source}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#03C3EC] bg-opacity-[0.12] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#03C3EC]">
                      {summary.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#3A3541] opacity-[0.6]">
                    {new Date(summary.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusToggle 
                        initialStatus={summary.status} 
                        onToggle={(newStatus) => handleStatusToggle(summary.id, newStatus)} 
                      />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        summary.status === 1 ? "text-[#56CA00]" : "text-gray-400"
                      }`}>
                        {summary.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(summary)}
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
        title="Delete Summary"
        itemName={deleteModal.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
