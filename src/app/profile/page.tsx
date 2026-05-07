import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile — Cyfiz",
  description: "Track your learning journey, quiz performance, and activity on the Cyfiz platform.",
};

const recentActivity = [
  { type: "quiz", title: "Week 18 Quiz: LLM Security", score: "9/10", date: "May 06, 2026" },
  { type: "summary", title: "Securing LLM Production Pipelines", date: "May 05, 2026" },
  { type: "insight", title: "Zero-trust in the age of LLMs", date: "May 04, 2026" },
  { type: "quiz", title: "Week 17 Quiz: EU AI Act", score: "8/10", date: "Apr 29, 2026" },
  { type: "summary", title: "Differential Privacy at Scale", date: "Apr 28, 2026" },
];

const badges = [
  { emoji: "🏆", name: "Top 1%", desc: "Ranked in the top 1% this month" },
  { emoji: "🔥", name: "12-Week Streak", desc: "Completed quiz 12 weeks in a row" },
  { emoji: "🔬", name: "Research Reader", desc: "Read 50+ paper summaries" },
  { emoji: "⚡", name: "Speed Reader", desc: "Completed a quiz in under 4 minutes" },
];

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero / User Card */}
        <section className="bg-white px-4 pt-24 pb-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003056] text-2xl font-black text-white shadow-lg">
                LW
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Your Profile</p>
                <h1 className="mt-1 text-3xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                  Lewis Walker
                </h1>
                <p className="mt-2 text-zinc-500 dark:text-zinc-400">Member since Jan 2025 · Pro Membership</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "12", label: "Quizzes Completed" },
                { value: "85%", label: "Avg Accuracy" },
                { value: "47", label: "Summaries Read" },
                { value: "#142", label: "Global Rank" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50">Achievements</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {badges.map((badge) => (
                <div key={badge.name} className="rounded-xl border border-zinc-200 bg-white p-5 text-center transition-all hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-3xl">{badge.emoji}</div>
                  <div className="mt-2 font-black text-zinc-900 dark:text-zinc-50 text-sm">{badge.name}</div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{badge.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50">Recent Activity</h2>
            <div className="mt-6 space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                      item.type === "quiz" ? "bg-[#001D33] text-white" :
                      item.type === "summary" ? "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300" :
                      "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}>
                      {item.type === "quiz" ? "Q" : item.type === "summary" ? "S" : "I"}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{item.title}</div>
                      <div className="text-xs text-zinc-400">{item.date}</div>
                    </div>
                  </div>
                  {item.score && (
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {item.score}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership CTA */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003056] p-10 text-center shadow-2xl">
            <h2 className="text-2xl font-black font-serif text-white sm:text-3xl">Upgrade to Pro</h2>
            <p className="mt-3 text-white/70">
              Unlock unlimited summaries, priority quiz access, certificate downloads, and the full course library.
            </p>
            <button className="mt-8 rounded-full bg-white px-10 py-3 text-sm font-black text-[#001D33] transition-all hover:bg-zinc-100 hover:scale-105 shadow-lg">
              View Pro Plans →
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
