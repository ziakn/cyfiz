import type { Metadata } from "next";
import { getPublishedQuizzes } from "@/lib/quizPortal";
import { getPublishedTrainings } from "@/lib/siteData";
import LearnClient, { type QuizItem, type TrainingItem } from "./LearnClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Learn — Cyfiz",
  description: "Trainings and short quizzes on cybersecurity, privacy and AI governance.",
};

export default async function LearnPage() {
  const [trainingRows, quizRows] = await Promise.all([getPublishedTrainings(), getPublishedQuizzes()]);

  const trainings: TrainingItem[] = trainingRows.map((t) => ({
    id: t.id, title: t.title, category: t.category, format: t.format, duration: t.duration, summary: t.summary, link_url: t.link_url,
  }));
  const quizzes: QuizItem[] = quizRows.map((q) => ({
    id: q.id, title: q.title, description: q.description, questions: Number(q.question_count ?? 0), minutes: q.duration_minutes, passing: q.passing_percentage,
  }));

  return <LearnClient trainings={trainings} quizzes={quizzes} />;
}
