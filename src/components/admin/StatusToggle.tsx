"use client";

import { useState } from "react";

interface StatusToggleProps {
  initialStatus: number;
  onToggle: (newStatus: number) => Promise<boolean | undefined>;
}

export default function StatusToggle({ initialStatus, onToggle }: StatusToggleProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isChanging, setIsChanging] = useState(false);

  const handleToggle = async () => {
    if (isChanging) return;
    
    const newStatus = status === 1 ? 0 : 1;
    setIsChanging(true);
    
    const success = await onToggle(newStatus);
    if (success === true) {
      setStatus(newStatus);
    }
    
    setIsChanging(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isChanging}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        status === 1 ? "bg-[#9155FD]" : "bg-gray-200"
      } ${isChanging ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
          status === 1 ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
