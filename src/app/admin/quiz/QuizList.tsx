"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import { toggleStatusAction } from "../actions";
import * as actions from "./actions";

interface AdminQuiz {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  passing_percentage: number;
  question_order: "sequential" | "random";
  status: number;
  question_count: number;
  registered_count: number;
  attempt_count: number;
  completed_attempt_count: number;
}

interface AdminQuestion {
  id: number;
  quiz_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
  explanation: string | null;
  reference_text: string | null;
  sort_order: number;
  status: number;
}

export default function QuizList({
  initialQuizzes,
  initialQuestions,
}: {
  initialQuizzes: AdminQuiz[];
  initialQuestions: AdminQuestion[];
}) {
  const [quizModal, setQuizModal] = useState<{ open: boolean; data: Partial<AdminQuiz> | null }>({ open: false, data: null });
  const [questionModal, setQuestionModal] = useState<{ open: boolean; data: Partial<AdminQuestion> | null; quizId?: number }>({ open: false, data: null });
  const [selectedQuizId, setSelectedQuizId] = useState(initialQuizzes[0]?.id ?? 0);
  const selectedQuestions = initialQuestions.filter((question) => question.quiz_id === selectedQuizId);

  async function toggleQuiz(id: number, status: number) {
    const result = await toggleStatusAction("quizzes", id, status, ["/admin/quiz", "/portal/quizzes", "/quiz"]);
    return result.success;
  }

  async function toggleQuestion(id: number, status: number) {
    const result = await toggleStatusAction("quiz_questions", id, status, ["/admin/quiz", "/portal/quizzes", "/quiz"]);
    return result.success;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div>
          <h1 className="text-2xl font-bold text-[#3A3541]">Quiz Bank</h1>
          <p className="mt-1 text-sm text-[#3A3541] opacity-60">Manage portal quizzes, questions, answers, explanations, and publishing.</p>
        </div>
        <button onClick={() => setQuizModal({ open: true, data: null })} className="rounded-md bg-[#9155FD] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
          Add Quiz
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="space-y-4">
          {initialQuizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => setSelectedQuizId(quiz.id)}
              className={`block w-full rounded-lg border bg-white p-5 text-left shadow-sm ${selectedQuizId === quiz.id ? "border-[#9155FD]" : "border-transparent"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#3A3541]">{quiz.title}</h2>
                  <p className="mt-1 line-clamp-2 text-xs text-[#3A3541] opacity-60">{quiz.description}</p>
                </div>
                <StatusToggle initialStatus={quiz.status} onToggle={(status) => toggleQuiz(quiz.id, status)} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-[#3A3541] opacity-60">
                <span>{quiz.question_count} questions</span>
                <span>{quiz.registered_count} candidates</span>
                <span>{quiz.attempt_count} attempts</span>
                <span>{quiz.duration_minutes} min</span>
                <span>{quiz.passing_percentage}% pass</span>
              </div>
              <div className="mt-4 flex gap-2">
                <span onClick={(event) => { event.stopPropagation(); setQuizModal({ open: true, data: quiz }); }} className="rounded-md border border-[#3A3541]/20 px-3 py-1 text-xs font-bold text-[#3A3541]">Edit</span>
                <span onClick={(event) => { event.stopPropagation(); actions.deleteQuizAction(quiz.id); }} className="rounded-md border border-red-200 px-3 py-1 text-xs font-bold text-red-500">Delete</span>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#3A3541]">Questions</h2>
            <button
              disabled={!selectedQuizId}
              onClick={() => setQuestionModal({ open: true, data: null, quizId: selectedQuizId })}
              className="rounded-md bg-[#9155FD] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50"
            >
              Add Question
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {selectedQuestions.length === 0 ? (
              <p className="rounded-lg bg-[#F9FAFB] p-4 text-sm text-[#3A3541] opacity-60">No questions yet.</p>
            ) : (
              selectedQuestions.map((question) => (
                <div key={question.id} className="rounded-lg border border-[#3A3541]/10 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#9155FD]">Q{question.sort_order || question.id} · Answer {question.correct_option}</p>
                      <p className="mt-2 text-sm font-semibold text-[#3A3541]">{question.question}</p>
                    </div>
                    <StatusToggle initialStatus={question.status} onToggle={(status) => toggleQuestion(question.id, status)} />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setQuestionModal({ open: true, data: question })} className="rounded-md border border-[#3A3541]/20 px-3 py-1 text-xs font-bold text-[#3A3541]">Edit</button>
                    <button onClick={() => actions.deleteQuestionAction(question.id)} className="rounded-md border border-red-200 px-3 py-1 text-xs font-bold text-red-500">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {quizModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-lg bg-white p-6">
            <h3 className="text-xl font-bold">{quizModal.data?.id ? "Edit" : "Add"} Quiz</h3>
            <form action={async (formData) => {
              const result = quizModal.data?.id ? await actions.editQuizAction(quizModal.data.id, formData) : await actions.addQuizAction(formData);
              if (result.success) setQuizModal({ open: false, data: null });
              else alert(result.error);
            }} className="mt-5 space-y-4">
              <input name="title" required defaultValue={quizModal.data?.title} placeholder="Quiz title" className="w-full rounded-md border px-3 py-2 text-sm" />
              <textarea name="description" defaultValue={quizModal.data?.description ?? ""} placeholder="Description" rows={3} className="w-full rounded-md border px-3 py-2 text-sm" />
              <div className="grid gap-4 sm:grid-cols-3">
                <input name="duration_minutes" type="number" defaultValue={quizModal.data?.duration_minutes ?? 60} className="w-full rounded-md border px-3 py-2 text-sm" />
                <input name="passing_percentage" type="number" defaultValue={quizModal.data?.passing_percentage ?? 70} className="w-full rounded-md border px-3 py-2 text-sm" />
                <select name="question_order" defaultValue={quizModal.data?.question_order ?? "sequential"} className="w-full rounded-md border px-3 py-2 text-sm">
                  <option value="sequential">Sequential</option>
                  <option value="random">Random</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setQuizModal({ open: false, data: null })} className="flex-1 rounded-md border py-2 text-sm font-bold">Cancel</button>
                <button className="flex-1 rounded-md bg-[#9155FD] py-2 text-sm font-bold text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {questionModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-3xl rounded-lg bg-white p-6">
            <h3 className="text-xl font-bold">{questionModal.data?.id ? "Edit" : "Add"} Question</h3>
            <form action={async (formData) => {
              if (!questionModal.data?.id && questionModal.quizId) formData.set("quiz_id", String(questionModal.quizId));
              const result = questionModal.data?.id ? await actions.editQuestionAction(questionModal.data.id, formData) : await actions.addQuestionAction(formData);
              if (result.success) setQuestionModal({ open: false, data: null });
              else alert(result.error);
            }} className="mt-5 space-y-4">
              <input type="hidden" name="quiz_id" value={questionModal.data?.quiz_id ?? questionModal.quizId ?? ""} />
              <textarea name="question" required defaultValue={questionModal.data?.question ?? ""} placeholder="Question" rows={3} className="w-full rounded-md border px-3 py-2 text-sm" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="option_a" required defaultValue={questionModal.data?.option_a ?? ""} placeholder="Option A" className="rounded-md border px-3 py-2 text-sm" />
                <input name="option_b" required defaultValue={questionModal.data?.option_b ?? ""} placeholder="Option B" className="rounded-md border px-3 py-2 text-sm" />
                <input name="option_c" required defaultValue={questionModal.data?.option_c ?? ""} placeholder="Option C" className="rounded-md border px-3 py-2 text-sm" />
                <input name="option_d" required defaultValue={questionModal.data?.option_d ?? ""} placeholder="Option D" className="rounded-md border px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <select name="correct_option" defaultValue={questionModal.data?.correct_option ?? "A"} className="rounded-md border px-3 py-2 text-sm">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                <input name="sort_order" type="number" defaultValue={questionModal.data?.sort_order ?? selectedQuestions.length + 1} className="rounded-md border px-3 py-2 text-sm" />
              </div>
              <textarea name="explanation" defaultValue={questionModal.data?.explanation ?? ""} placeholder="Explanation" rows={4} className="w-full rounded-md border px-3 py-2 text-sm" />
              <textarea name="reference_text" defaultValue={questionModal.data?.reference_text ?? ""} placeholder="References" rows={3} className="w-full rounded-md border px-3 py-2 text-sm" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setQuestionModal({ open: false, data: null })} className="flex-1 rounded-md border py-2 text-sm font-bold">Cancel</button>
                <button className="flex-1 rounded-md bg-[#9155FD] py-2 text-sm font-bold text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
