import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights — Cyfiz",
  description: "Expert cybersecurity, privacy, and AI insights for modern digital leaders.",
};

const articles = [
  {
    tag: "AI Security",
    date: "May 06, 2026",
    title: "How agentic AI systems are reshaping the enterprise attack surface",
    excerpt: "As autonomous agents gain persistent memory and tool access, the threat model fundamentally changes. Here's what security teams must prepare for.",
    readTime: "8 min read",
  },
  {
    tag: "Privacy",
    date: "May 04, 2026",
    title: "The EU AI Act's privacy implications: A practical breakdown",
    excerpt: "Beyond compliance checkboxes — what the regulation actually requires from data teams building AI pipelines.",
    readTime: "6 min read",
  },
  {
    tag: "Cybersecurity",
    date: "May 01, 2026",
    title: "Zero-trust in the age of LLMs: rethinking perimeter assumptions",
    excerpt: "Language models break classical authentication assumptions. This is how the industry is responding.",
    readTime: "7 min read",
  },
  {
    tag: "AI Policy",
    date: "Apr 28, 2026",
    title: "NIST's AI Risk Management Framework: what practitioners need to know",
    excerpt: "A field guide to applying the RMF to your organisation's AI deployment pipeline.",
    readTime: "5 min read",
  },
  {
    tag: "Cybersecurity",
    date: "Apr 24, 2026",
    title: "Supply chain attacks targeting ML model registries are rising",
    excerpt: "Adversaries are increasingly poisoning open-source model weights. Detection strategies and mitigations.",
    readTime: "9 min read",
  },
  {
    tag: "Privacy",
    date: "Apr 20, 2026",
    title: "Federated learning in practice: lessons from three enterprise deployments",
    excerpt: "Privacy-preserving ML sounds great in theory. Real-world performance trade-offs tell a different story.",
    readTime: "10 min read",
  },
];

const topics = ["All", "AI Security", "Privacy", "Cybersecurity", "AI Policy", "Research", "Tools"];

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-white px-4 pt-24 pb-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cyfiz Insights</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl leading-[1.1]">
              Intelligence for the people building the future.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-zinc-600 dark:text-zinc-400">
              Curated analysis on AI security, privacy regulation, and emerging cyber threats — distilled for decision-makers.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-400">Featured</p>
            <div className="group grid gap-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 lg:grid-cols-2">
              <div className="h-64 bg-gradient-to-br from-[#001D33] to-[#003056] lg:h-auto" />
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  Deep Dive · May 07, 2026
                </span>
                <h2 className="mt-4 text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50 sm:text-3xl leading-snug">
                  The 2026 State of AI Security: What 500 CISOs told us
                </h2>
                <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                  We surveyed 500 security leaders across Fortune 1000 companies. The results reveal a widening gap between AI adoption speed and security readiness.
                </p>
                <Link
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-50 hover:underline"
                >
                  Read the full report
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Filter */}
        <section className="bg-white px-4 pt-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${
                    topic === "All"
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="bg-white px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <article
                  key={i}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {article.tag}
                    </span>
                    <span className="text-[10px] text-zinc-400">{article.date}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-black font-serif text-zinc-900 dark:text-zinc-50 leading-snug">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-zinc-500 dark:text-zinc-400">{article.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{article.readTime}</span>
                    <Link href="#" className="text-xs font-bold text-zinc-900 hover:underline dark:text-zinc-50 flex items-center gap-1">
                      Read
                      <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="rounded-full border-2 border-zinc-200 px-10 py-3 text-sm font-bold text-zinc-700 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600">
                Load more articles
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-zinc-50 px-4 py-24 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50">
              Never miss an insight
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Join 50,000+ professionals. Get the Weekly 5-Minute Brief every Monday morning.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-sm rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
              />
              <button className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                Subscribe
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
