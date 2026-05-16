"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      router.replace("/admin/dashboard");
      router.refresh();
      return;
    }

    const result = await response.json();
    setError(result?.error || "Login failed.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[448px] overflow-hidden rounded-lg bg-white shadow-[0_4px_24px_0_rgba(58,53,65,0.1)]">
        <div className="p-8 sm:p-12">
          <div className="mb-8 flex items-center justify-center gap-3">
            <img src="/logo-transparent.png" alt="Cyfiz Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold uppercase tracking-tight text-[#3A3541] opacity-[0.87]">Cyfiz Admin</span>
          </div>

          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-semibold text-[#3A3541] opacity-[0.87]">
              Welcome back
            </h1>
            <p className="text-sm text-[#3A3541] opacity-[0.6]">
              Sign in to manage Cyfiz content and settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm text-[#3A3541] opacity-[0.6]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-3 text-sm text-[#3A3541] outline-none transition-colors placeholder:text-gray-400 focus:border-[#9155FD] focus:border-opacity-100"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-[#3A3541] opacity-[0.6]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-3 pr-12 text-sm text-[#3A3541] outline-none transition-colors placeholder:text-gray-400 focus:border-[#9155FD] focus:border-opacity-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3A3541] opacity-[0.54]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember-me" className="h-4 w-4 rounded border-[#3A3541] border-opacity-[0.22] text-[#9155FD] focus:ring-[#9155FD]" />
              <label htmlFor="remember-me" className="text-sm text-[#3A3541] opacity-[0.6]">
                Remember me
              </label>
            </div>

            {error && (
              <p className="rounded-md bg-red-50 p-3 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#9155FD] py-2.5 text-sm font-medium uppercase tracking-wider text-white shadow-[0_2px_10px_0_rgba(145,85,253,0.3)] transition-all hover:bg-[#804BDF] hover:shadow-[0_4px_14px_0_rgba(145,85,253,0.4)] disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
