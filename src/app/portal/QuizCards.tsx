"use client";

import Link from "next/link";
import { useTransition } from "react";
import { registerForQuizAction } from "./actions";

interface QuizCardItem {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  passing_percentage: number;
  question_count?: number;
  registered?: number;
}

export default function QuizCards({ quizzes }: { quizzes: QuizCardItem[] }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#07133D]">{quiz.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{quiz.description}</p>
            </div>
            {quiz.registered ? (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Registered</span>
            ) : null}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-3 py-1">{quiz.question_count ?? 0} questions</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1">{quiz.duration_minutes} minutes</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1">{quiz.passing_percentage}% pass</span>
          </div>
          <div className="mt-6">
            {quiz.registered ? (
              <Link href={`/portal/quizzes/${quiz.id}`} className="inline-flex rounded-lg bg-[#2B167C] px-5 py-3 text-sm font-black text-white">
                Continue Studying
              </Link>
            ) : (
              <button
                disabled={pending}
                onClick={() => startTransition(() => {
                  void registerForQuizAction(quiz.id);
                })}
                className="rounded-lg bg-[#2B167C] px-5 py-3 text-sm font-black text-white disabled:opacity-60"
              >
                Register for Quiz
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
