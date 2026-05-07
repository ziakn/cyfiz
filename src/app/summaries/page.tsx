import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Summaries — Cyfiz",
  description: "Key ideas from complex cybersecurity, privacy, and AI research papers — simplified into 2-minute actionable briefings.",
};

const summaries = [
  {
    tag: "AI Safety",
    date: "May 05, 2026",
    title: "Securing LLM Production Pipelines at Scale",
    excerpt: "A deep dive into adversarial attacks and mitigation strategies for enterprise AI deployments. Covers prompt injection, model poisoning, and inference-time defences.",
    readTime: "2 min read",
    source: "arXiv:2405.0234",
  },
  {
    tag: "Privacy",
    date: "Apr 28, 2026",
    title: "Differential Privacy: From Theory to Large-Scale Deployment",
    excerpt: "How tech giants implement privacy-first machine learning at scale. Key trade-offs between privacy budgets and model utility.",
    readTime: "2 min read",
    source: "IEEE S&P 2026",
  },
  {
    tag: "Agents",
    date: "Apr 20, 2026",
    title: "The Rise of Autonomous Agents in Cybersecurity Operations",
    excerpt: "Analysing multi-agent system performance in threat detection. Benchmark results across 14 enterprise environments.",
    readTime: "2 min read",
    source: "USENIX Security 2026",
  },
  {
    tag: "ML Security",
    date: "Apr 14, 2026",
    title: "Backdoor Attacks on Foundation Models: A Systematic Review",
    excerpt: "Comprehensive taxonomy of backdoor attack vectors targeting pre-trained models and the defences that work in practice.",
    readTime: "2 min read",
    source: "arXiv:2404.1892",
  },
  {
    tag: "Privacy",
    date: "Apr 08, 2026",
    title: "Membership Inference Attacks Against Fine-Tuned LLMs",
    excerpt: "Researchers demonstrate that fine-tuning dramatically increases membership inference risk. Practical mitigations evaluated.",
    readTime: "2 min read",
    source: "CCS 2026",
  },
  {
    tag: "AI Policy",
    date: "Apr 01, 2026",
    title: "Auditing AI Systems: A Framework for Independent Evaluators",
    excerpt: "A practical audit methodology bridging the gap between regulatory requirements and technical AI system evaluation.",
    readTime: "2 min read",
    source: "MIT CSAIL Technical Report",
  },
];

const categories = ["All", "AI Safety", "Privacy", "ML Security", "Agents", "AI Policy", "Cryptography"];

export default function SummariesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-white px-4 pt-24 pb-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Research Summaries</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl leading-[1.1]">
              Complex research. Two-minute summaries.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-zinc-600 dark:text-zinc-400">
              Key ideas from important cybersecurity, privacy, and AI papers — simplified into actionable briefings for busy practitioners.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: "240+", label: "Papers summarised" },
                { value: "50k+", label: "Monthly readers" },
                { value: "18", label: "Venues covered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50 sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white px-4 pt-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all ${
                    cat === "All"
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Summaries list */}
        <section className="bg-white px-4 py-10 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-4">
            {summaries.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{s.tag}</span>
                    <span>{s.date}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline font-mono text-zinc-300 dark:text-zinc-600">{s.source}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-black font-serif text-zinc-900 dark:text-zinc-50">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{s.excerpt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-xs text-zinc-400">{s.readTime}</span>
                  <Link
                    href="#"
                    className="rounded-full bg-zinc-900 px-5 py-2 text-xs font-bold text-white transition-all hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    View Summary
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-7xl text-center">
            <button className="rounded-full border-2 border-zinc-200 px-10 py-3 text-sm font-bold text-zinc-700 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600">
              Load more summaries
            </button>
          </div>
        </section>

        {/* Browse by Category */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Browse by Category</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {["Cybersecurity", "Machine Learning", "Data Privacy", "Quantum Computing", "AI Ethics", "Robotics", "NLP", "Computer Vision"].map((cat) => (
                <button
                  key={cat}
                  className="rounded-xl border border-zinc-200 px-6 py-4 text-center text-sm font-bold text-zinc-700 transition-all hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
