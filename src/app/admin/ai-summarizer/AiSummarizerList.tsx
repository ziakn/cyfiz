"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import { stripHtml } from "@/lib/utils";
import {
  uploadPaperAction,
  updateDraftAction,
  publishSummaryAction,
  deletePaperAction,
  retrySummaryAction,
} from "./actions";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
  loading: () => <div className="h-[160px] w-full animate-pulse rounded-md bg-gray-100" />,
});

const TAGS = ["Research", "Case Study", "Whitepaper", "Technical"];

export interface AiSummaryItem {
  id: number;
  original_filename: string;
  pdf_url: string;
  source: string | null;
  ai_title: string | null;
  ai_tag: string | null;
  ai_excerpt: string | null;
  ai_key_findings: string | null;
  ai_read_time: string | null;
  ai_model: string | null;
  process_status: "processing" | "draft" | "published" | "error";
  error_message: string | null;
  published_summary_id: number | null;
  created_at: string;
}

const STATUS_STYLES: Record<AiSummaryItem["process_status"], string> = {
  processing: "bg-[#FFB400] bg-opacity-[0.12] text-[#FFB400]",
  draft: "bg-[#03C3EC] bg-opacity-[0.12] text-[#03C3EC]",
  published: "bg-[#56CA00] bg-opacity-[0.12] text-[#56CA00]",
  error: "bg-[#FF4D49] bg-opacity-[0.12] text-[#FF4D49]",
};

export default function AiSummarizerList({ initialItems }: { initialItems: AiSummaryItem[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [review, setReview] = useState<AiSummaryItem | null>(null);
  const [reviewExcerpt, setReviewExcerpt] = useState("");
  const [reviewFindings, setReviewFindings] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [deleteItem, setDeleteItem] = useState<AiSummaryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [retryingId, setRetryingId] = useState<number | null>(null);

  const filtered = initialItems.filter((item) => {
    const haystack = `${item.original_filename} ${item.ai_title ?? ""} ${item.source ?? ""}`.toLowerCase();
    return haystack.includes(searchQuery.toLowerCase());
  });

  const openReview = (item: AiSummaryItem) => {
    setReviewExcerpt(item.ai_excerpt ?? "");
    setReviewFindings(item.ai_key_findings ?? "");
    setReview(item);
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUploadError("");
    setIsUploading(true);
    const result = await uploadPaperAction(formData);
    setIsUploading(false);
    if (result.success) {
      setUploadOpen(false);
      router.refresh();
    } else {
      setUploadError(result.error || "Upload failed");
      router.refresh();
    }
  };

  const handleSaveDraft = async (formData: FormData) => {
    if (!review) return;
    setIsSaving(true);
    const result = await updateDraftAction(review.id, formData);
    setIsSaving(false);
    if (result.success) {
      setReview(null);
      router.refresh();
    } else {
      alert(result.error || "Failed to save draft");
    }
  };

  const handlePublish = async (formData: FormData) => {
    if (!review) return;
    setIsSaving(true);
    const result = await publishSummaryAction(review.id, formData);
    setIsSaving(false);
    if (result.success) {
      setReview(null);
      router.refresh();
    } else {
      alert(result.error || "Failed to publish");
    }
  };

  const handleRetry = async (id: number) => {
    setRetryingId(id);
    const result = await retrySummaryAction(id);
    setRetryingId(null);
    if (!result.success) alert(result.error || "Retry failed");
    router.refresh();
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    const result = await deletePaperAction(deleteItem.id);
    setIsDeleting(false);
    if (result.success) {
      setDeleteItem(null);
      router.refresh();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#3A3541] opacity-[0.87]">AI Paper Summarizer</h2>
          <p className="text-xs text-[#3A3541] opacity-[0.5]">Upload a research PDF, review the AI draft, then publish to Summaries.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <input
              type="text"
              placeholder="Search papers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2 text-sm outline-none transition-colors focus:border-[#9155FD]"
            />
          </div>
          <button
            onClick={() => {
              setUploadError("");
              setUploadOpen(true);
            }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-[#9155FD] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            Upload Paper
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Paper</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Tag</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Model</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#3A3541] opacity-[0.5]">
                    No papers yet. Upload a PDF to get started.
                  </td>
                </tr>
              )}
              {filtered.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">
                        {item.ai_title || item.original_filename}
                      </span>
                      <span className="line-clamp-1 text-[10px] text-[#3A3541] opacity-[0.38]">
                        {item.process_status === "error"
                          ? item.error_message
                          : stripHtml(item.ai_excerpt ?? "") || item.original_filename}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.ai_tag ? (
                      <span className="rounded-full bg-[#03C3EC] bg-opacity-[0.12] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#03C3EC]">
                        {item.ai_tag}
                      </span>
                    ) : (
                      <span className="text-xs text-[#3A3541] opacity-[0.3]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[item.process_status]}`}>
                      {item.process_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#3A3541] opacity-[0.6]">{item.ai_model ?? "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open PDF"
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                      </a>
                      {item.process_status === "error" && (
                        <button
                          onClick={() => handleRetry(item.id)}
                          disabled={retryingId === item.id}
                          title="Retry summarization"
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FFB400] hover:opacity-100 disabled:opacity-30"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                        </button>
                      )}
                      {(item.process_status === "draft" || item.process_status === "published") && (
                        <button
                          onClick={() => openReview(item)}
                          title="Review & publish"
                          className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#9155FD] hover:opacity-100"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteItem(item)}
                        title="Delete"
                        className="p-1.5 text-[#3A3541] opacity-[0.54] hover:text-[#FF4D49] hover:opacity-100"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)]">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">Upload Research Paper</h3>
              {!isUploading && (
                <button onClick={() => setUploadOpen(false)} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              )}
            </div>

            {isUploading ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#9155FD] border-t-transparent" />
                <p className="text-sm font-semibold text-[#3A3541] opacity-[0.8]">Summarizing with Gemini…</p>
                <p className="text-xs text-[#3A3541] opacity-[0.5]">This can take up to a minute for longer papers. Please keep this open.</p>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4">
                {uploadError && (
                  <div className="rounded-md bg-[#FF4D49] bg-opacity-[0.08] px-3 py-2 text-xs font-medium text-[#FF4D49]">
                    {uploadError}
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">PDF File</label>
                  <input
                    type="file"
                    name="file"
                    accept="application/pdf"
                    required
                    className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none file:mr-3 file:rounded file:border-0 file:bg-[#9155FD] file:px-3 file:py-1 file:text-xs file:font-bold file:uppercase file:text-white focus:border-[#9155FD]"
                  />
                  <p className="text-[10px] text-[#3A3541] opacity-[0.4]">PDF only, up to 15MB.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Source / Journal (optional)</label>
                  <input
                    name="source"
                    placeholder="e.g. IEEE S&P 2024"
                    className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">AI Instructions (optional)</label>
                  <textarea
                    name="instructions"
                    rows={3}
                    placeholder="e.g. Focus on the practical defensive takeaways, keep it non-technical, and limit the summary to 3 sentences."
                    className="w-full resize-y rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]"
                  />
                  <p className="text-[10px] text-[#3A3541] opacity-[0.4]">Steer the tone, focus, length, or audience of the AI summary.</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setUploadOpen(false)}
                    className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF]"
                  >
                    Upload & Summarize
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Review / publish modal */}
      {review && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">Review AI Summary</h3>
                <p className="text-[10px] text-[#3A3541] opacity-[0.4]">{review.original_filename}</p>
              </div>
              <button onClick={() => setReview(null)} className="text-[#3A3541] opacity-[0.54] hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Title</label>
                  <input name="title" required defaultValue={review.ai_title ?? ""} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Category/Tag</label>
                  <select name="tag" required defaultValue={review.ai_tag ?? "Research"} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]">
                    {TAGS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Source (Journal/Company)</label>
                  <input name="source" defaultValue={review.source ?? ""} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Read Time</label>
                  <input name="readTime" defaultValue={review.ai_read_time ?? ""} className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-3 py-2 text-sm outline-none focus:border-[#9155FD]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Summary</label>
                <Editor value={reviewExcerpt} onChange={setReviewExcerpt} placeholder="AI-generated summary…" />
                <input type="hidden" name="excerpt" value={reviewExcerpt} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3A3541] opacity-[0.6]">Key Findings</label>
                <Editor value={reviewFindings} onChange={setReviewFindings} placeholder="Key findings…" />
                <input type="hidden" name="keyFindings" value={reviewFindings} />
              </div>

              <p className="rounded-md bg-[#9155FD] bg-opacity-[0.06] px-3 py-2 text-[11px] text-[#3A3541] opacity-[0.7]">
                Verify the AI output above before publishing. <strong>Verify &amp; Publish</strong> pushes this into Summaries (homepage + /summaries).
                {review.process_status === "published" && " This paper is already published — publishing again updates the live summary."}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReview(null)}
                  className="rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  formAction={handleSaveDraft}
                  className="flex-1 rounded-md border border-[#9155FD] py-2.5 text-xs font-bold uppercase tracking-wider text-[#9155FD] transition-all hover:bg-[#9155FD] hover:bg-opacity-[0.06] disabled:opacity-50"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  formAction={handlePublish}
                  className="flex-1 rounded-md bg-[#56CA00] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(86,202,0,0.3)] transition-all hover:bg-[#4CB300] disabled:opacity-50"
                >
                  {isSaving ? "Working…" : "Verify & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={Boolean(deleteItem)}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Paper"
        itemName={deleteItem?.ai_title || deleteItem?.original_filename || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
