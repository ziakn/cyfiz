"use client";

import { useState, useRef } from "react";
import { uploadImageAction } from "@/app/admin/image-actions";

interface ImageUploadProps {
  table: string;
  id: number | string;
  folder: string;
  currentImage?: string | null;
  onSuccess?: (imageUrl: string) => void;
}

export default function ImageUpload({ table, id, folder, currentImage, onSuccess }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previousPreview = preview;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("table", table);
    formData.append("id", id.toString());
    formData.append("folder", folder);

    try {
      const result = await uploadImageAction(formData);

      if (result.success && result.imageUrl) {
        setPreview(result.imageUrl);
        if (onSuccess) onSuccess(result.imageUrl);
      } else {
        setPreview(previousPreview);
        alert(result.error || "Upload failed");
      }
    } catch (error) {
      setPreview(previousPreview);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-[#3A3541] border-opacity-[0.22] transition-colors hover:border-[#9155FD]"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#3A3541] opacity-[0.38]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#9155FD] border-t-transparent"></div>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        </div>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}
