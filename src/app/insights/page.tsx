import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import InsightsContent from "./InsightsContent";

export const metadata: Metadata = {
  title: "Insights — Cyfiz",
  description:
    "Curated intelligence on AI security, privacy regulation, and emerging cyber threats for professionals and decision-makers.",
};

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <InsightsContent />
      </main>
      <Footer />
    </div>
  );
}
