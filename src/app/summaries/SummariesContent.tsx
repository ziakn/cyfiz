"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

/* ─── Data ──────────────────────────────────────────────────── */

interface Summary {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime?: string;
  source?: string;
  citations?: number;
  image_url?: string | null;
}

const categories = [
  "All",
  "AI Security",
  "Data Privacy",
  "Regulations",
  "Cybersecurity",
  "Embodied AI",
] as const;

/* ─── Helpers ───────────────────────────────────────────────── */

const tagColor: Record<string, string> = {
  "AI Security":
    "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40",
  "Data Privacy":
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
  Regulations:
    "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900/40",
  Cybersecurity:
    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/40",
  "Embodied AI":
    "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40",
};

const catIconColor: Record<string, string> = {
  "AI Security": "from-blue-500 to-blue-600",
  "Data Privacy": "from-emerald-500 to-emerald-600",
  Regulations: "from-violet-500 to-violet-600",
  Cybersecurity: "from-amber-500 to-amber-600",
  "Embodied AI": "from-rose-500 to-rose-600",
};

const catIcon: Record<string, React.ReactNode> = {
  "AI Security": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Data Privacy": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Regulations: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Cybersecurity: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Embodied AI": (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function TagBadge({ tag }: { tag: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
        tagColor[tag] ?? "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
      }`}
    >
      {tag}
    </span>
  );
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────────── */

export default function SummariesContent() {
  const [activeCat, setActiveCat] = useState<string>("All");
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummaries() {
      try {
        const response = await fetch("/api/summaries");
        if (!response.ok) throw new Error("Failed to fetch summaries");
        const data = await response.json();
        setSummaries(data.summaries || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load summaries");
      } finally {
        setLoading(false);
      }
    }

    fetchSummaries();
  }, []);

  const filtered =
    activeCat === "All"
      ? summaries
      : summaries.filter((s) => s.tag === activeCat);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-500">Loading summaries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 pt-28 pb-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/3 -translate-x-1/2">
          <div className="h-[500px] w-[700px] rounded-full bg-gradient-to-br from-violet-100/50 via-blue-100/30 to-transparent blur-3xl dark:from-violet-900/15 dark:via-blue-900/10" />
        </div>
        <div className="pointer-events-none absolute -bottom-20 right-10">
          <div className="h-[250px] w-[350px] rounded-full bg-gradient-to-tl from-emerald-100/30 to-transparent blur-3xl dark:from-emerald-900/10" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-12 lg:grid-cols-5">
            {/* Left — headline */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
                  Research Summaries
                </p>
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Complex research.{" "}
                <br className="hidden sm:block" />
                <span className="text-zinc-400">5-minute summaries.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium text-zinc-500 dark:text-zinc-400">
                Key ideas from important cybersecurity, privacy and AI research
                papers simplified into actionable briefings for busy
                practitioners.
              </p>
            </div>

            {/* Right — stat card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black font-serif text-zinc-900 dark:text-zinc-50">
                    5k+
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    Monthly Readers
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-zinc-200/60 pt-4 dark:border-zinc-800/60">
                  {[
                    { value: "240+", label: "Papers" },
                    { value: "18", label: "Venues" },
                    { value: "5 min", label: "Avg. read" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-lg font-black font-serif text-zinc-900 dark:text-zinc-50">
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ─────────────────────────────── */}
      <section className="sticky top-16 z-40 border-y border-zinc-200/60 bg-white/90 backdrop-blur-md px-4 dark:border-zinc-800/60 dark:bg-zinc-950/90 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto py-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 rounded-full border px-5 py-2 text-xs font-bold transition-all duration-200 ${
                cat === activeCat
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="ml-auto shrink-0 text-xs font-medium text-zinc-400">
            {filtered.length} {filtered.length === 1 ? "paper" : "papers"}
          </span>
        </div>
      </section>

      {/* ── Summaries List ──────────────────────────────────── */}
      <section className="bg-white px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-4">
          {filtered.map((s, i) => (
            <Link href={`/summaries/${s.id}-${slugify(s.title)}`} key={i} className="group block">
              <article className="flex flex-col gap-5 rounded-2xl border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 sm:flex-row sm:items-center sm:p-8">
                {/* Number or Image column */}
                <div className="hidden shrink-0 sm:flex">
                  {s.image_url ? (
                    <div className="h-16 w-16 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <img src={s.image_url} alt={s.title} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-lg font-black font-serif text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <TagBadge tag={s.tag} />
                    <span className="text-[10px] font-medium text-zinc-400">
                      {s.date}
                    </span>
                    <span className="hidden text-[10px] text-zinc-300 dark:text-zinc-600 sm:inline">
                      ·
                    </span>
                    <span className="hidden font-mono text-[10px] text-zinc-400 dark:text-zinc-500 sm:inline">
                      {s.source}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-black font-serif text-zinc-900 leading-snug transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                    {s.title}
                  </h2>

                  <div 
                    className="mt-3 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base"
                    dangerouslySetInnerHTML={{ __html: s.excerpt }}
                  />

                  {/* Meta row */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-medium text-zinc-400">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" strokeLinecap="round" />
                      </svg>
                      {s.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {s.citations} citations
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white transition-all group-hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:group-hover:bg-zinc-200">
                    Read Summary
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-zinc-400 dark:text-zinc-500">
                No summaries found for &ldquo;{activeCat}&rdquo; yet.
              </p>
              <button
                onClick={() => setActiveCat("All")}
                className="mt-4 text-sm font-bold text-zinc-900 hover:underline dark:text-zinc-50"
              >
                View all summaries
              </button>
            </div>
          )}

          {/* Load more */}
          {filtered.length > 0 && (
            <div className="pt-8 text-center">
              <button className="rounded-full border-2 border-zinc-200 px-10 py-3 text-sm font-bold text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200">
                Load more summaries
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Browse by Category ──────────────────────────────── */}
      <section className="bg-zinc-50/60 px-4 py-20 dark:bg-zinc-900/20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-block h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Browse by Category
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.filter((c) => c !== "All").map((cat) => {
              const count = summaries.filter((s) => s.tag === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCat(cat);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 text-left transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white ${
                      catIconColor[cat] ?? "from-zinc-500 to-zinc-600"
                    }`}
                  >
                    {catIcon[cat]}
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {cat}
                  </h3>

                  <p className="mt-1 text-[10px] font-medium text-zinc-400">
                    {count} {count === 1 ? "paper" : "papers"} summarised
                  </p>

                  {/* Hover arrow */}
                  <div className="absolute right-4 top-4 text-zinc-300 transition-all group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ──────────────────────────────────── */}
      <section className="bg-white px-4 py-24 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001D33] via-[#002845] to-[#003A60] p-10 sm:p-14">
            {/* Pattern overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Floating accents */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                Stay informed
              </p>
              <h2 className="mt-4 text-3xl font-black font-serif tracking-tight text-white sm:text-4xl">
                Never miss a summary
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-white/60">
                Get the latest research briefings delivered every Monday. Join
                5,000+ practitioners who read Cyfiz.
              </p>

              <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                <button className="w-full shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#001D33] transition-all hover:bg-white/90 sm:w-auto">
                  Subscribe
                </button>
              </div>

              <p className="mt-4 text-[10px] text-white/30">
                No spam, ever. Unsubscribe in one click.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
