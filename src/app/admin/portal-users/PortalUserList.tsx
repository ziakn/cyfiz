"use client";

import { useState } from "react";
import DeleteConfirmationModal from "@/components/admin/DeleteConfirmationModal";
import StatusToggle from "@/components/admin/StatusToggle";
import { deletePortalUserAction, updatePortalUserStatusAction } from "./actions";
import type { PortalUserAttemptAnswerRow, PortalUserRegistrationRow, PortalUserRow } from "./page";

export default function PortalUserList({
  initialUsers,
  registrations,
  attemptAnswers,
}: {
  initialUsers: PortalUserRow[];
  registrations: PortalUserRegistrationRow[];
  attemptAnswers: PortalUserAttemptAnswerRow[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; userId: number | null; email: string }>({
    open: false,
    userId: null,
    email: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredUsers = initialUsers.filter((user) => {
    const name = `${user.first_name} ${user.last_name}`.toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  async function confirmDelete() {
    if (!deleteModal.userId) return;
    setIsDeleting(true);
    const result = await deletePortalUserAction(deleteModal.userId);
    setIsDeleting(false);
    if (result.success) setDeleteModal({ open: false, userId: null, email: "" });
    else alert(result.error || "Delete failed");
  }

  async function toggleStatus(userId: number, status: number) {
    const result = await updatePortalUserStatusAction(userId, status);
    return result.success;
  }

  function optionText(answer: PortalUserAttemptAnswerRow, option: string | null) {
    if (option === "A") return answer.option_a;
    if (option === "B") return answer.option_b;
    if (option === "C") return answer.option_c;
    if (option === "D") return answer.option_d;
    return "No answer selected";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-[0_2px_10px_0_rgba(58,53,65,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3A3541]">Portal Users</h1>
          <p className="mt-1 text-sm text-[#3A3541] opacity-60">View registered quiz candidates and their activity.</p>
        </div>
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search candidate"
          className="w-full max-w-sm rounded-md border border-[#3A3541] border-opacity-[0.22] px-4 py-2 text-sm outline-none focus:border-[#9155FD]"
        />
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_10px_0_rgba(58,53,65,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#3A3541] border-opacity-[0.12] bg-[#F9FAFB]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Candidate</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Registered Quizzes</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Attempts</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Average Score</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#3A3541] opacity-[0.38]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3541] divide-opacity-[0.12]">
              {filteredUsers.map((user) => {
                const userRegistrations = registrations.filter((item) => item.user_id === user.id);
                const userAnswers = attemptAnswers.filter((item) => item.user_id === user.id);
                const isExpanded = expandedUserId === user.id;
                return (
                  <>
                    <tr key={user.id} className="transition-colors hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9155FD] bg-opacity-[0.12] text-sm font-bold text-[#9155FD]">
                            {user.first_name[0]?.toUpperCase() ?? "U"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#3A3541] opacity-[0.87]">{user.first_name} {user.last_name}</p>
                            <p className="text-[10px] text-[#3A3541] opacity-[0.38]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#3A3541]">{user.registered_quizzes}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#3A3541]">{user.attempt_count}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#3A3541]">{user.avg_score ? `${Number(user.avg_score).toFixed(0)}%` : "-"}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <StatusToggle initialStatus={user.status} onToggle={(status) => toggleStatus(user.id, status)} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${user.status === 1 ? "text-[#56CA00]" : "text-gray-400"}`}>
                            {user.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setExpandedUserId(isExpanded ? null : user.id)} className="rounded-md border border-[#3A3541]/20 px-3 py-1 text-xs font-bold text-[#3A3541]">
                          {isExpanded ? "Hide" : "View"}
                        </button>
                        <button onClick={() => setDeleteModal({ open: true, userId: user.id, email: user.email })} className="ml-2 rounded-md border border-red-200 px-3 py-1 text-xs font-bold text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${user.id}-details`} className="bg-[#F9FAFB]">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="rounded-lg border border-[#3A3541]/10 bg-white p-4">
                            <h3 className="text-sm font-bold text-[#3A3541]">Registered Quizzes</h3>
                            <div className="mt-3 space-y-2">
                              {userRegistrations.length === 0 ? (
                                <p className="text-sm text-[#3A3541] opacity-60">No quiz registrations yet.</p>
                              ) : (
                                userRegistrations.map((registration) => (
                                  <div key={`${user.id}-${registration.quiz_title}`} className="rounded-md border border-[#3A3541]/10 p-3 text-sm">
                                    <div className="grid gap-2 sm:grid-cols-4">
                                      <span className="font-semibold text-[#3A3541] sm:col-span-2">{registration.quiz_title}</span>
                                      <span>{registration.attempts} attempts</span>
                                      <span>{registration.best_score ? `${Number(registration.best_score).toFixed(0)}% best` : "No score"}</span>
                                    </div>

                                    <div className="mt-4 space-y-4">
                                      {Array.from(new Set(userAnswers
                                        .filter((answer) => answer.quiz_id === registration.quiz_id)
                                        .map((answer) => answer.attempt_id)
                                      )).map((attemptId) => {
                                        const answers = userAnswers.filter((answer) => answer.attempt_id === attemptId);
                                        const attempt = answers[0];
                                        return (
                                          <details key={attemptId} className="rounded-lg border border-[#3A3541]/10 bg-[#F9FAFB] p-3">
                                            <summary className="cursor-pointer text-xs font-bold uppercase tracking-wider text-[#3A3541]">
                                              Attempt #{attemptId} · {Number(attempt?.score_percentage ?? 0).toFixed(0)}% · {attempt?.passed ? "Passed" : "Not Passed"}
                                            </summary>
                                            <div className="mt-3 space-y-3">
                                              {answers.map((answer, index) => (
                                                <div key={`${attemptId}-${index}`} className="rounded-md bg-white p-3">
                                                  <p className="text-xs font-bold uppercase tracking-wider text-[#9155FD]">Question {index + 1}</p>
                                                  <p className="mt-1 font-semibold text-[#3A3541]">{answer.question}</p>
                                                  <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                                                    <div className={answer.is_correct ? "rounded-md bg-green-50 p-2 text-green-700" : "rounded-md bg-red-50 p-2 text-red-700"}>
                                                      <span className="font-bold">Selected:</span> {answer.selected_option ?? "-"} · {optionText(answer, answer.selected_option)}
                                                    </div>
                                                    <div className="rounded-md bg-green-50 p-2 text-green-700">
                                                      <span className="font-bold">Correct:</span> {answer.correct_option} · {optionText(answer, answer.correct_option)}
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </details>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={confirmDelete}
        title="Delete Portal User"
        itemName={deleteModal.email}
        isDeleting={isDeleting}
      />
    </div>
  );
}
