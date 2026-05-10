import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import SummariesContent from "./SummariesContent";

export const metadata: Metadata = {
  title: "Research Summaries — Cyfiz",
  description:
    "Key ideas from important cybersecurity, privacy, and AI research papers simplified into actionable briefings for busy practitioners.",
};

export default function SummariesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SummariesContent />
      </main>
      <Footer />
    </div>
  );
}
