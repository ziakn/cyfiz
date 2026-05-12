"use client";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  isDeleting?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  isDeleting = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3541] bg-opacity-50 p-4 transition-opacity">
      <div className="w-full max-w-md scale-100 rounded-lg bg-white p-8 shadow-[0_12px_40px_rgba(58,53,65,0.2)] transition-transform">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4D49] bg-opacity-[0.12] text-[#FF4D49]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#3A3541] opacity-[0.87]">{title}</h3>
          <p className="mt-3 text-sm text-[#3A3541] opacity-[0.6]">
            Are you sure you want to delete <span className="font-semibold text-[#3A3541] opacity-[0.87]">&quot;{itemName}&quot;</span>? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-md border border-[#3A3541] border-opacity-[0.22] py-2.5 text-xs font-bold uppercase tracking-wider text-[#3A3541] opacity-[0.6] transition-all hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-md bg-[#FF4D49] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(255,77,73,0.3)] transition-all hover:bg-[#E54541] disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
