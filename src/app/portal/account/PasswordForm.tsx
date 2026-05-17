"use client";

import { useState } from "react";

export default function PasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/portal/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    setLoading(false);

    if (response.ok) {
      form.reset();
      setMessage("Password updated successfully.");
      return;
    }

    const result = await response.json().catch(() => ({}));
    setError(typeof result.error === "string" ? result.error : "Password update failed.");
  }

  const inputClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-[#07133D] outline-none transition-colors placeholder:text-zinc-400 focus:border-[#2B167C] focus:bg-white focus:ring-2 focus:ring-[#2B167C]/10";

  return (
    <form onSubmit={submit} className="mt-8 border-t border-zinc-100 pt-8">
      <h2 className="text-xl font-black text-[#07133D]">Password Change</h2>
      <div className="mt-5 grid gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Current password</label>
          <input name="currentPassword" type="password" required className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">New password</label>
            <input name="newPassword" type="password" required minLength={6} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Confirm new password</label>
            <input name="confirmPassword" type="password" required minLength={6} className={inputClass} />
          </div>
        </div>
      </div>

      {message && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>}
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

      <button disabled={loading} className="mt-5 rounded-lg bg-[#2B167C] px-5 py-3 text-sm font-black text-white disabled:opacity-60">
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
