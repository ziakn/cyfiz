"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  streak: number;
}

interface PastQuiz {
  week: string;
  topic: string;
  participants: number;
  avgScore: string;
}

interface QuizData {
  leaderboard: LeaderboardEntry[];
  pastQuizzes: PastQuiz[];
  currentQuiz?: {
    week: string;
    topic: string;
    participants: number;
  };
}

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch("/api/quiz");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.details || "Failed to fetch quiz data");
        }
        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz data");
      } finally {
        setLoading(false);
      }
    }

    fetchQuizData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-zinc-500">Loading quiz data...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error: {error || "Failed to load quiz data"}</div>
        </main>
        <Footer />
      </div>
    );
  }

  const { leaderboard, pastQuizzes, currentQuiz } = quizData;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-white px-4 pt-24 pb-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Weekly Quiz</p>
            <h1 className="mt-4 text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl leading-[1.1]">
              Test your expertise. Earn your rank.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-zinc-600 dark:text-zinc-400">
              10 practitioner-developed expert-level questions every Monday on AI security, cybersecurity, privacy and regulations.
            </p>
          </div>
        </section>

        {/* This week's quiz CTA */}
        <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003056] p-8 shadow-2xl md:p-12">
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-xl">
                  <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/70">
                    {currentQuiz ? `${currentQuiz.week} · Live Now` : "Week 19 · Live Now"}
                  </span>
                  <h2 className="mt-4 text-2xl font-black font-serif text-white sm:text-3xl">
                    This Week: {currentQuiz ? currentQuiz.topic : "Agentic AI Threat Models"}
                  </h2>
                  <p className="mt-3 text-white/70">
                    How well do you understand the security implications of autonomous AI agents? 10 questions. 8 minutes. No retries.
                  </p>
                  <div className="mt-4 flex gap-6 text-sm text-white/60">
                    <span>⏱ ~8 minutes</span>
                    <span>🎯 10 questions</span>
                    <span>👥 {currentQuiz ? currentQuiz.participants.toLocaleString() : "2,341"} taken so far</span>
                  </div>
                </div>
                <button className="shrink-0 rounded-full bg-white px-10 py-4 text-sm font-black text-[#001D33] transition-all hover:bg-zinc-100 hover:scale-105 active:scale-95 shadow-lg">
                  Start Quiz →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50 text-center">
              Top Performers
            </h2>
            <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">All-time leaderboard based on cumulative score and accuracy.</p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">Score</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user) => (
                    <tr key={user.rank} className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50">
                      <td className="px-6 py-4">
                        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                          user.rank === 1 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          user.rank === 2 ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" :
                          user.rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                          "text-zinc-500"
                        }`}>
                          {user.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-50">{user.name}</td>
                      <td className="px-6 py-4 font-black text-zinc-900 dark:text-zinc-50">{user.score}</td>
                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">🔥 {user.streak} weeks</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Past Quizzes */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Past Quizzes</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm">Missed a week? Practice with previous editions.</p>
            <div className="mt-8 space-y-3">
              {pastQuizzes.map((q) => (
                <div
                  key={q.week}
                  className="flex flex-col items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{q.week}</span>
                    <h3 className="mt-1 font-bold text-zinc-900 dark:text-zinc-50">{q.topic}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{q.participants.toLocaleString()} participants · Avg score {q.avgScore}</p>
                  </div>
                  <button className="shrink-0 rounded-full border border-zinc-200 px-5 py-2 text-xs font-bold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    Practice Mode
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
