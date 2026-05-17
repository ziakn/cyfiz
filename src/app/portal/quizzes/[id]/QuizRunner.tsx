"use client";

import { useMemo, useState } from "react";

interface Quiz {
  id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  passing_percentage: number;
}

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
  explanation: string | null;
  reference_text: string | null;
  saved?: number;
}

type ViewMode = "single" | "list" | "flashcard";

export default function QuizRunner({ quiz, questions }: { quiz: Quiz; questions: Question[] }) {
  const [mode, setMode] = useState<ViewMode>("single");
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(questions.map((question) => [question.id, Boolean(question.saved)]))
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ percentage: number; correct: number; total: number; passed: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const visibleQuestions = useMemo(() => mode === "list" ? questions : [questions[current]].filter(Boolean), [current, mode, questions]);

  async function toggleSaved(questionId: number) {
    const response = await fetch("/api/portal/save-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId }),
    });
    if (response.ok) {
      const data = await response.json();
      setSaved((value) => ({ ...value, [questionId]: Boolean(data.saved) }));
    }
  }

  async function submitExam() {
    setSubmitting(true);
    const response = await fetch("/api/portal/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: quiz.id,
        mode: "exam",
        answers: Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId: Number(questionId), selectedOption })),
      }),
    });
    setSubmitting(false);
    if (response.ok) {
      setResult(await response.json());
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black">{quiz.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{questions.length} questions · {quiz.duration_minutes} minutes · {quiz.passing_percentage}% passing score</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["single", "list", "flashcard"] as ViewMode[]).map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`rounded-lg border px-4 py-2 text-sm font-bold capitalize ${mode === item ? "border-[#2B167C] bg-[#F1EDFF] text-[#2B167C]" : "border-zinc-200 text-zinc-600"}`}
            >
              {item === "single" ? "Single Question" : item}
            </button>
          ))}
          <button onClick={submitExam} disabled={submitting || questions.length === 0} className="rounded-lg bg-[#0F8B8D] px-4 py-2 text-sm font-black text-white disabled:opacity-60">
            {submitting ? "Submitting..." : "Submit Exam"}
          </button>
        </div>
      </div>

      {result && (
        <div className={`rounded-2xl border p-5 ${result.passed ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          <p className="font-black">Score: {result.percentage.toFixed(0)}% · {result.correct}/{result.total} correct</p>
          <p className="mt-1 text-sm">{result.passed ? "Passed" : "Not passed yet. Review explanations and try again."}</p>
        </div>
      )}

      <div className="space-y-4">
        {visibleQuestions.map((question, index) => {
          const questionNumber = mode === "list" ? index + 1 : current + 1;
          const showAnswer = Boolean(revealed[question.id]) || mode === "flashcard";
          return (
            <div key={question.id} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="rounded-lg bg-[#EDE5FA] px-3 py-2 text-sm font-black text-[#6E38CF]">Q: {questionNumber}</span>
                <div className="flex-1">
                  <p className="text-lg font-semibold leading-7">{question.question}</p>
                  <div className="mt-5 space-y-2">
                    {(["A", "B", "C", "D"] as const).map((option) => {
                      const text = question[`option_${option.toLowerCase()}` as keyof Question] as string;
                      const selected = answers[question.id] === option;
                      const correct = showAnswer && question.correct_option === option;
                      return (
                        <button
                          key={option}
                          onClick={() => setAnswers((value) => ({ ...value, [question.id]: option }))}
                          className={`block w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                            correct ? "border-green-300 bg-green-50" : selected ? "border-[#2B167C] bg-[#F1EDFF]" : "border-zinc-200 hover:bg-zinc-50"
                          }`}
                        >
                          <span className="font-black">{option}:</span> {text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <button onClick={() => toggleSaved(question.id)} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold text-[#2B167C]">
                  {saved[question.id] ? "Saved" : "Save Question"}
                </button>
                <button onClick={() => setRevealed((value) => ({ ...value, [question.id]: !value[question.id] }))} className="rounded-lg bg-[#6E38CF] px-4 py-2 text-sm font-black text-white">
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
              </div>

              {showAnswer && (
                <div className="mt-5 border-t border-zinc-100 pt-5">
                  <p className="text-sm font-black uppercase tracking-widest text-zinc-400">Correct Answer</p>
                  <p className="mt-2 text-sm font-bold">{question.correct_option}</p>
                  {question.explanation && (
                    <>
                      <p className="mt-5 text-sm font-black uppercase tracking-widest text-zinc-400">Explanation</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{question.explanation}</p>
                    </>
                  )}
                  {question.reference_text && (
                    <>
                      <p className="mt-5 text-sm font-black uppercase tracking-widest text-zinc-400">References</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{question.reference_text}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mode !== "list" && (
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5">
          <span className="text-sm font-semibold text-zinc-500">Question {current + 1} of {questions.length}</span>
          <div className="flex gap-2">
            <button onClick={() => setCurrent((value) => Math.max(0, value - 1))} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold">Previous</button>
            <button onClick={() => setCurrent((value) => Math.min(questions.length - 1, value + 1))} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
