"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch(`/api/portal/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (response.ok) {
      router.replace("/portal/dashboard");
      router.refresh();
      return;
    }

    const result = await response.json().catch(() => ({}));
    setError(typeof result.error === "string" ? result.error : "Something went wrong.");
  }

  const isRegister = mode === "register";
  const inputClass = "mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-[#07133D] outline-none transition-colors placeholder:text-zinc-400 focus:border-[#2B167C] focus:bg-white focus:ring-2 focus:ring-[#2B167C]/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5FA] px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm font-bold text-[#2B167C]">← Main Website</Link>
        <h1 className="mt-8 text-3xl font-black text-[#07133D]">
          {isRegister ? "Create your quiz account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {isRegister ? "Register once, then attend any available Cyfiz quiz." : "Sign in to continue your quizzes and attempts."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {isRegister && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">First name</label>
                <input name="firstName" required className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Last name</label>
                <input name="lastName" required className={inputClass} />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email</label>
            <input name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Password</label>
              {!isRegister && (
                <Link href="/portal/forgot-password" className="text-xs font-bold text-[#2B167C]">
                  Forgot password?
                </Link>
              )}
            </div>
            <input name="password" type="password" required minLength={6} className={inputClass} />
          </div>

          {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">{error}</p>}

          <button disabled={loading} className="w-full rounded-lg bg-[#2B167C] px-5 py-3 text-sm font-black text-white disabled:opacity-60">
            {loading ? "Please wait..." : isRegister ? "Register" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-500">
          {isRegister ? "Already registered?" : "Need an account?"}{" "}
          <Link href={isRegister ? "/portal/login" : "/portal/register"} className="font-bold text-[#2B167C]">
            {isRegister ? "Sign in" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
}
