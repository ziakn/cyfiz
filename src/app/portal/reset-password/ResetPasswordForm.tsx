"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token, tokenValid }: { token: string; tokenValid: boolean }) {
  const router = useRouter();
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
    const response = await fetch("/api/portal/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(formData.entries()), token }),
    });

    setLoading(false);

    if (response.ok) {
      form.reset();
      setMessage("Password updated. You can now sign in.");
      setTimeout(() => router.replace("/portal/login"), 1200);
      return;
    }

    const result = await response.json().catch(() => ({}));
    setError(typeof result.error === "string" ? result.error : "Unable to reset password.");
  }

  const inputClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-[#07133D] outline-none transition-colors placeholder:text-zinc-400 focus:border-[#2B167C] focus:bg-white focus:ring-2 focus:ring-[#2B167C]/10";

  if (!token || !tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5FA] px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-[#07133D]">{token ? "Reset link expired" : "Reset link missing"}</h1>
          <p className="mt-2 text-sm text-zinc-500">Please request a new password reset link.</p>
          <Link href="/portal/forgot-password" className="mt-6 inline-flex rounded-lg bg-[#2B167C] px-5 py-3 text-sm font-black text-white">
            Request reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5FA] px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <Link href="/portal/login" className="text-sm font-bold text-[#2B167C]">Back to sign in</Link>
        <h1 className="mt-8 text-3xl font-black text-[#07133D]">Create new password</h1>
        <p className="mt-2 text-sm text-zinc-500">This reset link is verified before your password is changed.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">New password</label>
            <input name="newPassword" type="password" required minLength={6} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Confirm new password</label>
            <input name="confirmPassword" type="password" required minLength={6} className={inputClass} />
          </div>

          {message && <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>}
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

          <button disabled={loading} className="w-full rounded-lg bg-[#2B167C] px-5 py-3 text-sm font-black text-white disabled:opacity-60">
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
