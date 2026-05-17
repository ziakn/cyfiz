"use server";

import { revalidatePath } from "next/cache";
import { getRequiredPortalUser, registerForQuiz } from "@/lib/quizPortal";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Action failed";
}

export async function registerForQuizAction(quizId: number) {
  try {
    const user = await getRequiredPortalUser();
    await registerForQuiz(user.id, quizId);
    revalidatePath("/portal/dashboard");
    revalidatePath("/portal/quizzes");
    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
