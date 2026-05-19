"use client";

import { useState } from "react";
import StatusToggle from "@/components/admin/StatusToggle";
import { toggleStatusAction } from "../actions";
import * as actions from "./actions";

const CSV_TEMPLATE = [
  "question,option_a,option_b,option_c,option_d,correct_option,sort_order,explanation,reference_text",
  '"What is AI governance?","Policies and controls for AI systems","A firewall setting","A database backup","A router protocol","A",1,"Optional explanation","Optional reference"',
].join("\n");

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
  const csvTemplateHref = `data:text/csv;charset=utf-8,${encodeURIComponent(CSV_TEMPLATE)}`;

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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="text-lg font-bold text-[#3A3541]">Questions</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={csvTemplateHref}
                download="quiz-questions-template.csv"
                className="rounded-md border border-[#3A3541]/20 px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-[#3A3541]"
              >
                CSV Template
              </a>
              <form
                action={async (formData) => {
                  const result = await actions.importQuestionsCsvAction(formData);
                  const fileInput = document.getElementById("questions_csv") as HTMLInputElement | null;
                  if (result.success) {
                    if (fileInput) fileInput.value = "";
                    alert(`Imported ${result.importedCount} questions.`);
                  } else {
                    alert(result.error);
                  }
                }}
                className="flex flex-col gap-2 sm:flex-row sm:items-center"
              >
                <input type="hidden" name="quiz_id" value={selectedQuizId} />
                <input
                  id="questions_csv"
                  name="questions_csv"
                  type="file"
                  accept=".csv,text/csv"
                  required
                  disabled={!selectedQuizId}
                  className="max-w-52 text-xs text-[#3A3541] file:mr-3 file:rounded-md file:border-0 file:bg-[#F4F5FA] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#3A3541] disabled:opacity-50"
                />
                <button
                  disabled={!selectedQuizId}
                  className="rounded-md border border-[#9155FD] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#9155FD] disabled:opacity-50"
                >
                  Import
                </button>
              </form>
              <button
                disabled={!selectedQuizId}
                onClick={() => setQuestionModal({ open: true, data: null, quizId: selectedQuizId })}
                className="rounded-md bg-[#9155FD] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50"
              >
                Add Question
              </button>
            </div>
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
