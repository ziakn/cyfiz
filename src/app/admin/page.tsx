"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-20">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-black">Admin Login</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Sign in to manage modules, users, and admin content stored in MySQL.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-zinc-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/80"
              required
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/80"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-sm text-zinc-500">
          Note: create an admin user in the `admin_users` MySQL table with a hashed password.
        </div>
      </div>
    </div>
  );
}
