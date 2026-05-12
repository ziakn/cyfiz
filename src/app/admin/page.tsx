"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
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
      router.push("/admin/dashboard");
      return;
    }

    const result = await response.json();
    setError(result?.error || "Login failed.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[448px] overflow-hidden rounded-lg bg-white shadow-[0_4px_24px_0_rgba(58,53,65,0.1)]">
        <div className="p-8 sm:p-12">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.00012207 0L13.6749 24H20.325L33.9999 0H27.325L17 18.1408L6.6749 0H0.00012207Z" fill="#9155FD" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6.6749 0H13.6749L17 5.83333L20.325 0H27.325L17 18.1408L6.6749 0Z" fill="url(#paint0_linear)" fillOpacity="0.2" />
              <defs>
                <linearGradient id="paint0_linear" x1="17" y1="0" x2="17" y2="18.1408" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-bold uppercase tracking-tight text-[#3A3541] opacity-[0.87]">Materio</span>
          </div>

          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-semibold text-[#3A3541] opacity-[0.87]">
              Welcome to Materio! 👋
            </h1>
            <p className="text-sm text-[#3A3541] opacity-[0.6]">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm text-[#3A3541] opacity-[0.6]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-3 text-sm outline-none transition-colors focus:border-[#9155FD] focus:border-opacity-100"
                required
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm text-[#3A3541] opacity-[0.6]">Password</label>
                <a href="#" className="text-xs text-[#9155FD] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="············"
                  className="w-full rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-3 text-sm outline-none transition-colors focus:border-[#9155FD] focus:border-opacity-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3A3541] opacity-[0.54]"
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
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-[#3A3541] opacity-[0.6]">New on our platform? </span>
            <a href="#" className="text-[#9155FD] hover:underline">
              Create an account
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-[#3A3541] before:opacity-[0.12] after:h-px after:flex-1 after:bg-[#3A3541] after:opacity-[0.12]">
            <span className="text-sm text-[#3A3541] opacity-[0.38]">or</span>
          </div>

          <div className="mt-6 flex justify-center gap-6">
            <button className="text-[#497CE2] transition-transform hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="text-[#1DA1F2] transition-transform hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button className="text-[#333] transition-transform hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </button>
            <button className="text-[#EA4335] transition-transform hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.908 4.152-1.228 1.228-3.14 2.56-6.14 2.56-4.908 0-8.72-3.972-8.72-8.88s3.812-8.88 8.72-8.88c2.652 0 4.592 1.048 6.012 2.38l2.336-2.336C18.592 1.344 15.912 0 12.48 0 5.616 0 0 5.616 0 12.48s5.616 12.48 12.48 12.48c3.708 0 6.504-1.212 8.664-3.48 2.232-2.232 2.94-5.352 2.94-7.84 0-.768-.06-1.5-.18-2.22h-11.44z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
