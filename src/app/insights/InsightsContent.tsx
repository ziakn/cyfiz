"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { slugify, truncate } from "@/lib/utils";

/* ─── Data ──────────────────────────────────────────────────── */

interface Article {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime?: string;
  image_url?: string | null;
}

const topics = [
  "All",
  "AI Security",
  "Privacy",
  "Cybersecurity",
  "AI Policy",
  "Research",
  "Tools",
] as const;

const trending = [
  {
    rank: 1,
    title: "Why prompt injection remains unsolved in 2026",
    tag: "AI Security",
  },
  {
    rank: 2,
    title: "Inside the SEC's new AI disclosure rules",
    tag: "AI Policy",
  },
  {
    rank: 3,
    title: "Post-quantum cryptography migration guide",
    tag: "Cybersecurity",
  },
  {
    rank: 4,
    title: "Data residency laws reshaping cloud architecture",
    tag: "Privacy",
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */

const tagColor: Record<string, string> = {
  "AI Security":
    "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  Privacy:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  Cybersecurity:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  "AI Policy":
    "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  Research:
    "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  Tools:
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  "Deep Dive":
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

function TagBadge({ tag }: { tag: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
        tagColor[tag] ?? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
      }`}
    >
      {tag}
    </span>
  );
}

/* ─── Arrow Icon ────────────────────────────────────────────── */

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

export default function InsightsContent() {
  const [activeTopic, setActiveTopic] = useState<string>("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const filtered =
    activeTopic === "All"
      ? articles
      : articles.filter((a) => a.tag === activeTopic);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-zinc-500">Loading articles...</div>
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
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2">
          <div className="h-[600px] w-[900px] rounded-full bg-gradient-to-br from-blue-100/60 via-violet-100/40 to-transparent blur-3xl dark:from-blue-900/20 dark:via-violet-900/10" />
        </div>
        <div className="pointer-events-none absolute -bottom-20 right-0">
          <div className="h-[300px] w-[400px] rounded-full bg-gradient-to-tl from-emerald-100/40 to-transparent blur-3xl dark:from-emerald-900/10" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Cyfiz Insights
            </p>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Intelligence for the people{" "}
            <br className="hidden sm:block" />
            building the future.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-zinc-500 dark:text-zinc-400 sm:text-xl">
            Curated analysis on AI security, privacy regulation, and emerging
            cyber threats — distilled for decision-makers.
          </p>

          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-zinc-100 pt-8 dark:border-zinc-800/60">
            {[
              { value: "200+", label: "Articles published" },
              { value: "50K+", label: "Weekly readers" },
              { value: "6", label: "Core topics" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Article ────────────────────────────────── */}
      <section className="bg-zinc-50/60 px-4 py-16 dark:bg-zinc-900/20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Featured
            </p>
          </div>

          <Link href={`/insights/${articles[0]?.id}-${slugify(articles[0]?.title || '')}`} className="group block">
            <div className="grid overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 lg:grid-cols-5">
              {/* Visual side */}
              <div className="relative flex items-end overflow-hidden lg:col-span-2 min-h-[300px]">
                {articles.length > 0 && articles[0].image_url ? (
                  <img src={articles[0].image_url} alt={articles[0].title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001D33] via-[#002845] to-[#003A60]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                
                <div className="relative p-8 lg:p-10 z-10 w-full">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Featured report
                  </div>
                  <p className="mt-6 text-3xl font-black font-serif text-white leading-tight lg:text-4xl">
                    {articles.length > 0 ? articles[0].title : "State of AI Security 2026"}
                  </p>
                </div>
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
                <div className="flex items-center gap-3">
                  <TagBadge tag={articles.length > 0 ? articles[0].tag : "Deep Dive"} />
                  <span className="text-[10px] font-medium text-zinc-400">
                    {articles.length > 0 ? articles[0].date : "May 07, 2026"}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50 leading-snug sm:text-3xl">
                  {articles.length > 0 ? articles[0].title : "The 2026 State of AI Security: What 500 CISOs told us"}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {articles.length > 0 ? truncate(articles[0].excerpt, 200) : "..."}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-50 transition-all group-hover:gap-3">
                  Read the full report
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Topics + Content ────────────────────────────────── */}
      <section className="bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Topic filter bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 pb-6 dark:border-zinc-800/60">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`rounded-full border px-5 py-2 text-xs font-bold transition-all duration-200 ${
                  topic === activeTopic
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Main grid + sidebar */}
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            {/* Article grid — 2 col */}
            <div className="lg:col-span-2">
              <div className="grid gap-8 sm:grid-cols-2">
                {filtered.map((article, i) => (
                  <Link href={`/insights/${article.id}-${slugify(article.title)}`} key={i} className="group block">
                    <article className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                      <div className="flex items-center justify-between">
                        <TagBadge tag={article.tag} />
                        <span className="text-[10px] font-medium text-zinc-400">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-black font-serif leading-snug text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {truncate(article.excerpt, 150)}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
                        <span className="text-[10px] font-medium text-zinc-400">
                          {article.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-zinc-50 transition-all group-hover:gap-2">
                          Read
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load more */}
              {filtered.length > 0 && (
                <div className="mt-12 text-center">
                  <button className="rounded-full border-2 border-zinc-200 px-10 py-3 text-sm font-bold text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200">
                    Load more articles
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg font-medium text-zinc-400 dark:text-zinc-500">
                    No articles found for &ldquo;{activeTopic}&rdquo; yet.
                  </p>
                  <button
                    onClick={() => setActiveTopic("All")}
                    className="mt-4 text-sm font-bold text-zinc-900 hover:underline dark:text-zinc-50"
                  >
                    View all articles
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              {/* Trending */}
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center gap-2 mb-6">
                  <svg
                    className="h-4 w-4 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M13 7l5 5-5 5M6 7l5 5-5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Trending
                  </h3>
                </div>
                <div className="space-y-5">
                  {trending.map((item) => (
                    <Link
                      href="#"
                      key={item.rank}
                      className="group flex gap-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-200/60 text-xs font-black text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        {String(item.rank).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-zinc-800 leading-snug group-hover:text-zinc-600 transition-colors dark:text-zinc-200 dark:group-hover:text-zinc-400">
                          {item.title}
                        </p>
                        <span className="mt-1 block text-[10px] font-medium text-zinc-400">
                          {item.tag}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Topics breakdown */}
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-5">
                  Browse by topic
                </h3>
                <div className="space-y-3">
                  {topics.filter((t) => t !== "All").map((topic) => {
                    const count = articles.filter(
                      (a) => a.tag === topic
                    ).length;
                    return (
                      <button
                        key={topic}
                        onClick={() => setActiveTopic(topic)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                      >
                        <span>{topic}</span>
                        <span className="rounded-full bg-zinc-200/60 px-2.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar newsletter */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#001D33] via-[#002845] to-[#003A60] p-6">
                {/* Pattern overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative">
                  <h3 className="text-lg font-black font-serif text-white">
                    Weekly Brief
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    5-minute intelligence briefing every Monday morning.
                  </p>
                  <div className="mt-5 space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                    <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#001D33] transition-all hover:bg-white/90">
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-3 text-[10px] text-white/40">
                    Join 50,000+ professionals. No spam, ever.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Bottom Newsletter CTA ───────────────────────────── */}
      <section className="bg-zinc-50/60 px-4 py-24 dark:bg-zinc-900/20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Stay informed
            </p>
            <span className="inline-block h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <h2 className="text-3xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Never miss an insight
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-500 dark:text-zinc-400">
            Join 50,000+ professionals. Get the Weekly 5-Minute Brief every
            Monday morning.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-sm rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
            <button className="w-full rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
