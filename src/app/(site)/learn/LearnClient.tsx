"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import NewsletterForm from "@/components/site/NewsletterForm";

export interface TrainingItem {
  id: number;
  title: string;
  category: string;
  format: string | null;
  duration: string | null;
  summary: string;
  link_url: string | null;
}

export interface QuizItem {
  id: number;
  title: string;
  description: string | null;
  questions: number;
  minutes: number;
  passing: number;
}

const tabBase: React.CSSProperties = { minHeight: 44, padding: "0 26px", border: 0, borderRadius: 999, font: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer" };
const on: React.CSSProperties = { ...tabBase, background: "var(--accent)", color: "#0C0D10" };
const off: React.CSSProperties = { ...tabBase, background: "transparent", color: "#FFFFFF" };

const quizMeta = (q: QuizItem) =>
  [`${q.questions} question${q.questions === 1 ? "" : "s"}`, `${q.minutes} min`, `${q.passing}% to pass`].join(" · ");

export default function LearnClient({ trainings, quizzes }: { trainings: TrainingItem[]; quizzes: QuizItem[] }) {
  const [tab, setTab] = useState<"trainings" | "quizzes">("trainings");
  const isTrainings = tab === "trainings";
  const isQuizzes = tab === "quizzes";
  const trainingsSelected = isTrainings;
  const quizzesSelected = isQuizzes;
  const trainingsTabStyle = isTrainings ? on : off;
  const quizzesTabStyle = isQuizzes ? on : off;
  const showTrainings = () => setTab("trainings");
  const showQuizzes = () => setTab("quizzes");

  return (
    <>
<div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A", background: "#FFFFFF", width: "100%" }}>

{/* HERO */}
<header style={{ position: "relative", overflow: "hidden", backgroundColor: "#0C0D10", color: "#FFFFFF" }}>
<div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: "0", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(115deg, rgba(255,194,26,0) 0%, rgba(255,194,26,0.06) 100%)", clipPath: "polygon(78% 0, 100% 0, 100% 100%, 54% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 45%, #F2A900 100%)", clipPath: "polygon(80% 0, 94% 0, 74% 100%, 60% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(87% 0, 90% 0, 70% 100%, 67% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.35)", clipPath: "polygon(97% 0, 98.4% 0, 78.4% 100%, 77% 100%)", pointerEvents: "none" }}></div>

<SiteNav active="learn" />

<div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "56px 40px 96px", display: "flex", flexDirection: "column", gap: "26px", boxSizing: "border-box" }}>
<span style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "10px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", padding: "6px 16px 6px 8px", borderRadius: "999px", fontSize: "15px", fontWeight: "600", color: "#E2E4EA" }}><span aria-hidden="true" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--accent)" }}></span>Trainings &amp; Quizzes</span>
<h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "700", fontSize: "62px", lineHeight: "1.08", letterSpacing: "-0.03em", maxWidth: "760px" }}>Learn</h1>
<p style={{ margin: "0", fontSize: "21px", lineHeight: "1.6", color: "#C7CCDA", maxWidth: "680px" }}>Build practical skills in cybersecurity, privacy, AI governance and robotics, then test what you know with short quizzes.</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
<a href="#learn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "15px 26px", borderRadius: "999px", fontWeight: "700", fontSize: "17px" }}>Browse trainings<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
</div>
</header>

{/* TRAININGS & QUIZZES */}
<section id="learn" style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", textAlign: "center" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Learn</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", lineHeight: "1.15", color: "#111318" }}>Trainings &amp; Quizzes</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#4B5160", maxWidth: "680px" }}>Build practical skills in cybersecurity, privacy and AI governance, then test what you know.</p>
</div>

<div role="tablist" aria-label="Learning type" style={{ alignSelf: "center", display: "flex", gap: "6px", padding: "6px", borderRadius: "999px", background: "#0C0D10" }}>
<button type="button" role="tab" aria-selected={trainingsSelected} onClick={showTrainings} style={trainingsTabStyle}>Trainings</button>
<button type="button" role="tab" aria-selected={quizzesSelected} onClick={showQuizzes} style={quizzesTabStyle}>Quizzes</button>
</div>

{isTrainings && (<>
{trainings.length === 0 ? (
<p style={{ margin: 0, textAlign: "center", fontSize: "17px", color: "#4B5160" }}>New trainings are being prepared. <Link href="/contact">Tell us what you need</Link>.</p>
) : (
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
{trainings.map((t) => {
const href = t.link_url || "/contact";
const external = /^https?:\/\//.test(href);
const meta = [t.category, [t.format, t.duration].filter(Boolean).join(" · ")].filter(Boolean).join(" · ");
const inner = (<>
<span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#0C0D10", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5z"></path><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"></path></svg></span>
<span style={{ fontSize: "14px", color: "#5B6170" }}>{meta}</span>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "21px", fontWeight: "800", lineHeight: "1.3" }}>{t.title}</h3>
<p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#4B5160", flexGrow: "1" }}>{t.summary}</p>
<span style={{ color: "#8A5F00", fontWeight: "700" }}>{t.link_url ? "View training →" : "Ask about this training →"}</span>
</>);
const cardStyle = { background: "#F6F6F3", border: "1px solid #E5E7EB", color: "#111318", borderRadius: "22px", padding: "30px", display: "flex", flexDirection: "column" as const, gap: "16px", textDecoration: "none" };
return external
? <a key={t.id} href={href} target="_blank" rel="noopener noreferrer" style={cardStyle}>{inner}</a>
: <Link key={t.id} href={href} style={cardStyle}>{inner}</Link>;
})}
</div>
)}
</>)}

{isQuizzes && (<>
{quizzes.length === 0 ? (
<p style={{ margin: 0, textAlign: "center", fontSize: "17px", color: "#4B5160" }}>No quizzes are published yet. Check back soon.</p>
) : (
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
{quizzes.map((q) => (
<Link key={q.id} href="/portal/quizzes" style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "22px", padding: "30px", display: "flex", flexDirection: "column", gap: "16px", textDecoration: "none" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.10)", clipPath: "polygon(78% 0, 100% 0, 100% 40%, 60% 0)" }}></div>
<span style={{ position: "relative", width: "48px", height: "48px", borderRadius: "14px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"></path><path d="M12 17h.01"></path></svg></span>
<span style={{ position: "relative", fontSize: "14px", color: "#A9AEBB" }}>{quizMeta(q)}</span>
<h3 style={{ position: "relative", margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "21px", fontWeight: "800", lineHeight: "1.3" }}>{q.title}</h3>
<p style={{ position: "relative", margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#C7CCDA", flexGrow: "1" }}>{q.description || "Test your knowledge and find the gaps."}</p>
<span style={{ position: "relative", color: "var(--accent)", fontWeight: "700" }}>Start quiz →</span>
</Link>
))}
</div>
)}
</>)}
</div>
</section>

{/* TEAM TRAINING CTA */}
<section style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 96px" }}>
<div style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "26px", padding: "48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "28px" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(88% 0, 97% 0, 86% 100%, 77% 100%)" }}></div>
<div style={{ position: "relative", flex: "1 1 460px", minWidth: "0", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "12px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>For teams</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "34px", lineHeight: "1.2" }}>Need training for your team?</h2>
<p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#C7CCDA" }}>Tell us about your team and goals, and we’ll get back to you with options.</p>
</div>
<Link href="/contact" style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "16px 28px", borderRadius: "999px", fontWeight: "700", fontSize: "17px" }}>Get in touch<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></Link>
</div>
</div>
</section>

<NewsletterForm variant="dark" />

<SiteFooter />

</div>

    </>
  );
}
