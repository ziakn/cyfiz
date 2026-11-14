/* eslint-disable @next/next/no-img-element */
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import ExpertiseIcon from "@/components/site/ExpertiseIcon";
import { getProfileContent, getSiteSettings, parseLinkLines } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Who@m! — Cyfiz",
  description: "Securing the age of AI: cybersecurity, AI governance, AI security and data privacy expertise.",
};

export default async function ProfilePage() {
  const [settings, { credentials: certs, expertise, speaking, research }] = await Promise.all([getSiteSettings(), getProfileContent()]);
  // Drop public/profile-portrait.png in to show the portrait in the hero.
  const hasPortrait = fs.existsSync(path.join(process.cwd(), "public", "profile-portrait.png"));

  return (
    <>
<div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A", background: "#FFFFFF", width: "100%" }}>

{/* HERO (nav sits on the starfield) */}


<section id="top" style={{ position: "relative", overflow: "hidden", backgroundColor: "#0C0D10", color: "#FFFFFF" }}>
<div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: "0", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(115deg, rgba(255,194,26,0) 0%, rgba(255,194,26,0.06) 100%)", clipPath: "polygon(78% 0, 100% 0, 100% 100%, 54% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 45%, #F2A900 100%)", clipPath: "polygon(76% 0, 93% 0, 69% 100%, 52% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(84% 0, 88% 0, 64% 100%, 60% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.35)", clipPath: "polygon(96% 0, 97.4% 0, 73.4% 100%, 72% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "180px", background: "linear-gradient(to bottom, rgba(12,13,16,0) 0%, #0C0D10 100%)", pointerEvents: "none" }}></div>
<SiteNav active="profile" />
<div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "40px 40px 0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px", minHeight: "760px" }}>
<div style={{ flex: "1 1 460px", minWidth: "0", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "32px", zIndex: "2" }}>
<h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "700", fontSize: "64px", lineHeight: "1.08", letterSpacing: "-0.03em" }}>Securing the Age of AI</h1>
<p style={{ margin: "0", fontSize: "22px", lineHeight: "1.6", color: "#C7CCDA", maxWidth: "620px" }}>Helping governments, banks and enterprises build cyber-resilient, compliant and trustworthy AI, from strategy to certification.</p>
<div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "8px" }}>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Expert in</span>
<div style={{ display: "flex", flexWrap: "wrap", gap: "14px 12px" }}>
<span style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "8px 20px 8px 10px", borderRadius: "999px", fontSize: "19px", fontWeight: "600" }}><span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--accent)", flex: "0 0 26px" }}></span>Cybersecurity</span>
<span style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "8px 20px 8px 10px", borderRadius: "999px", fontSize: "19px", fontWeight: "600" }}><span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--accent)", flex: "0 0 26px" }}></span>AI Governance</span>
<span style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "8px 20px 8px 10px", borderRadius: "999px", fontSize: "19px", fontWeight: "600" }}><span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--accent)", flex: "0 0 26px" }}></span>AI Security</span>
<span style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "8px 20px 8px 10px", borderRadius: "999px", fontSize: "19px", fontWeight: "600" }}><span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--accent)", flex: "0 0 26px" }}></span>Data Privacy</span>
<span style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "8px 20px 8px 10px", borderRadius: "999px", fontSize: "19px", fontWeight: "600" }}><span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "var(--accent)", flex: "0 0 26px" }}></span>Robotics</span>
</div>
</div>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", alignSelf: "flex-end", display: "flex", justifyContent: "flex-end", zIndex: "1" }}>
{hasPortrait ? (<img src="/profile-portrait.png" alt="Portrait of Hafiz Saqib" style={{ width: "100%", maxWidth: "540px", height: "auto", display: "block", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55))", WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)" }} />) : null}
</div>
</div>
</section>

{/* DISTINCTIVE VOICE */}
<section id="about" style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "48px" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "40px" }}>
<div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Credentials</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#111318" }}>A Distinctive Voice in Cybersecurity &amp; AI Governance</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.7", color: "#4B5160" }}>Over 14 years across security engineering, GRC and privacy, from hands-on infrastructure in Pakistan and the UAE to Big 4 advisory in Qatar. A UK law degree and 14 professional certifications bring the technical, legal and governance sides of AI risk together.</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "32px", paddingTop: "8px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "36px", fontWeight: "800", color: "#111318" }}>14+</span><span style={{ fontSize: "14px", color: "#5B6170" }}>Years of experience</span></div>
<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "36px", fontWeight: "800", color: "#111318" }}>14</span><span style={{ fontSize: "14px", color: "#5B6170" }}>Professional certifications</span></div>
<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "36px", fontWeight: "800", color: "#111318" }}>Big 4</span><span style={{ fontSize: "14px", color: "#5B6170" }}>Advisory experience</span></div>
</div>
</div>
<div style={{ flex: "1 1 420px", minWidth: "0", position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "22px", boxSizing: "border-box" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(82% 0, 100% 0, 100% 100%, 64% 100%)" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(74% 0, 77% 0, 59% 100%, 56% 100%)" }}></div>
<span style={{ position: "relative", alignSelf: "flex-start", padding: "6px 12px", borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", fontSize: "13px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>Education</span>
<div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "74%" }}>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "44px", fontWeight: "800", lineHeight: "1" }}>LLM</span>
<span style={{ fontSize: "19px", fontWeight: "600", lineHeight: "1.45" }}>International Business, IT &amp; Intellectual Property Law</span>
<span style={{ fontSize: "15px", color: "#C7CCDA" }}>Cardiff Metropolitan University · United Kingdom</span>
</div>
<div style={{ position: "relative", maxWidth: "74%", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.14)", display: "flex", flexDirection: "column", gap: "4px" }}>
<span style={{ fontSize: "16px", fontWeight: "600" }}>Master of Computer Science</span>
<span style={{ fontSize: "14px", color: "#C7CCDA" }}>Pakistan</span>
</div>
</div>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: "800", color: "#111318" }}>Professional certifications</h3>
<div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "28px 36px" }}>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", columnGap: "48px" }}>
{certs.map((c) => (
<li key={c.id} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 0" }}><span aria-hidden="true" style={{ flex: "0 0 26px", width: "26px", height: "26px", marginTop: "1px", borderRadius: "50%", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span><span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "16px", lineHeight: "1.45", color: "#111318" }}><strong style={{ fontWeight: "700" }}>{c.name}</strong>{c.detail ? " · " + c.detail : null}</span></span></li>
))}
</ul>
</div>
</div>
</div>
</section>

{/* COMMUNITY */}
<section id="expertise">
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", textAlign: "center" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>What I do</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", color: "#111318" }}>Core Expertise</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#4B5160", maxWidth: "680px" }}>From the boardroom to the cloud: strategy, governance and the technical controls that make them real.</p>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
{expertise.map((e, i) => (
<div key={e.id} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column", gap: "18px" }}>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
<span style={{ width: "52px", height: "52px", borderRadius: "14px", background: "#0C0D10", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><ExpertiseIcon name={e.icon} /></span>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", fontWeight: "800", color: "#8A5F00" }}>{String(i + 1).padStart(2, "0")}</span>
</div>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "23px", fontWeight: "800", lineHeight: "1.25", color: "#111318" }}>{e.title}</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#4B5160" }}>{e.summary}</p>
{(e.highlight_bold || e.highlight_text) ? (<div style={{ padding: "12px 14px", borderRadius: "12px", background: "#FFF6D6", fontSize: "14px", lineHeight: "1.5", color: "#3D3000" }}><strong style={{ fontWeight: "700" }}>{e.highlight_bold}</strong> {e.highlight_text}</div>) : null}
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
{(e.bullets ?? "").split("\n").map((x) => x.trim()).filter(Boolean).map((b, bi) => (
<li key={bi} style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#2A2E37" }}><span aria-hidden="true" style={{ flex: "0 0 22px", width: "22px", height: "22px", marginTop: "1px", borderRadius: "50%", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span><span>{b}</span></li>
))}
</ul>
</div>
))}
</div>
</div>
</section>

{/* AVAILABLE FOR */}
<section id="available">
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "48px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", textAlign: "center" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Thought leadership</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", lineHeight: "1.15", color: "#111318" }}>Speaker · Researcher</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#4B5160", maxWidth: "680px" }}>Sharing practical insight on securing and governing AI with regulators, academia and industry across the Gulf and Europe.</p>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: "28px" }}>
<div style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "18px" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.10)", clipPath: "polygon(78% 0, 100% 0, 100% 40%, 60% 0)" }}></div>
<span style={{ position: "relative", width: "56px", height: "56px", borderRadius: "16px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10a7 7 0 0 0 14 0"></path><path d="M12 17v5"></path><path d="M8 22h8"></path></svg></span>
<h3 style={{ position: "relative", margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: "800" }}>Speaker</h3>
<p style={{ position: "relative", margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#E2E4EA" }}>Keynotes, roundtables and workshops for executives, practitioners and students.</p>
<ul style={{ position: "relative", margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", flexGrow: "1" }}>{speaking.map((t) => (
<li key={t.id} style={{ display: "flex", gap: "10px", fontSize: "15px", lineHeight: "1.5", color: "#C7CCDA" }}><span aria-hidden="true" style={{ flex: "0 0 6px", height: "6px", marginTop: "9px", borderRadius: "50%", background: "var(--accent)" }}></span><span>{t.title}</span></li>
))}
</ul>
<Link href="/contact" style={{ position: "relative", color: "var(--accent)", fontWeight: "700", textDecoration: "none" }}>Invite me to speak →</Link>
</div>
<div style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "18px" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.10)", clipPath: "polygon(78% 0, 100% 0, 100% 40%, 60% 0)" }}></div>
<span style={{ position: "relative", width: "56px", height: "56px", borderRadius: "16px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 3h6"></path><path d="M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3"></path><path d="M7.5 15h9"></path></svg></span>
<h3 style={{ position: "relative", margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: "800" }}>Researcher</h3>
<p style={{ position: "relative", margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#E2E4EA" }}>Peer-reviewed research on how regulation, security and privacy shape emerging AI technologies.</p>
<ul style={{ position: "relative", margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", flexGrow: "1" }}>
{research.map((r) => {
const links = parseLinkLines(r.links);
const published = r.kind === "Published";
return (
<li key={r.id} style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "14px 0" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px" }}><span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", ...(published ? { background: "var(--accent)", color: "#0C0D10" } : { background: "transparent", color: "#E2E4EA", border: "1px solid #4A4E58" }) }}>{r.kind}</span><span style={{ fontSize: "14px", fontWeight: "600", color: "#A9AEBB" }}>{r.year}</span></div>
{r.url ? (
<a href={r.url} style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: "600", lineHeight: "1.5", color: "#FFFFFF", textDecoration: "none" }}>{r.title}</a>
) : (
<span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: "600", lineHeight: "1.5", color: "#FFFFFF" }}>{r.title}</span>
)}
{r.venue ? <span style={{ fontSize: "14px", lineHeight: "1.5", color: "#A9AEBB" }}>{r.venue}</span> : null}
{links.length > 0 ? (
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "4px" }}>
{links.map((l) => (
<a key={l.href} href={l.href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "999px", border: "1px solid var(--accent)", color: "var(--accent)", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>{l.label}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"></path></svg></a>
))}
</div>
) : null}
</li>
);
})}
</ul>
</div>
</div>

</div>
</section>

{/* BOOK */}
<section id="book" style={{ background: "#0C0D10", color: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "56px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", textAlign: "center" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Latest book</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px" }}>Book and Publications</h2>
</div>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "64px" }}>
<div style={{ flex: "0 1 340px", minWidth: "260px", display: "flex", justifyContent: "center" }}>
<div role="img" aria-label="Book cover: AIGP Exam Survival Guide by Hafiz Saqib" style={{ position: "relative", overflow: "hidden", width: "300px", height: "440px", borderRadius: "6px 14px 14px 6px", background: "#14161B", boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 6px 0 0 rgba(255,255,255,0.06)", padding: "32px 28px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(62% 0, 100% 0, 100% 54%, 20% 100%, 0 100%, 0 88%)" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(52% 0, 57% 0, 0 82%, 0 75%)" }}></div>
<div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "10px" }}>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "64px", fontWeight: "800", lineHeight: "0.95", letterSpacing: "-0.03em", color: "#FFFFFF" }}>AIGP</span>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "26px", fontWeight: "700", lineHeight: "1.1", color: "#FFFFFF" }}>Exam Survival Guide</span>
<span style={{ fontSize: "14px", lineHeight: "1.4", color: "#C7CCDA", maxWidth: "160px" }}>The Concepts That Matter Most</span>
</div>
<span style={{ position: "relative", alignSelf: "flex-end", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px", fontWeight: "800", letterSpacing: "0.06em", textTransform: "uppercase", color: "#0C0D10" }}>Hafiz Saqib</span>
</div>
</div>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
<span style={{ background: "var(--accent)", color: "#0C0D10", padding: "6px 12px", borderRadius: "6px", fontSize: "14px", fontWeight: "700" }}>Kindle Edition</span>
<span style={{ border: "1px solid #3A3D45", color: "#E2E4EA", padding: "6px 12px", borderRadius: "6px", fontSize: "14px", fontWeight: "600" }}>IAPP AIGP · Body of Knowledge v2.1</span>
</div>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "46px", lineHeight: "1.08", letterSpacing: "-0.02em" }}>AIGP Exam Survival Guide</h3>
<p style={{ margin: "0", fontSize: "22px", fontWeight: "500", color: "#D5D8E0" }}>The Concepts That Matter Most</p>
<p style={{ margin: "0", fontSize: "17px", lineHeight: "1.7", color: "#A9AEBB" }}>The AIGP exam asks you to speak two languages at once: the law (EU AI Act risk tiers, GDPR, provider and deployer duties) and the engineering (data drift, fairness metrics, red teaming, model documentation). This guide connects them, distilling the Body of Knowledge into the concepts most likely to decide your score, written by a practitioner who applies these frameworks with clients every day.</p>
<div style={{ padding: "24px", borderRadius: "16px", background: "#16181D", border: "1px solid #23262C", display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "17px", fontWeight: "700" }}>Who it’s for</span>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
<li style={{ display: "flex", gap: "10px", fontSize: "16px", lineHeight: "1.5", color: "#D5D8E0" }}><span aria-hidden="true" style={{ flex: "0 0 6px", height: "6px", marginTop: "9px", borderRadius: "50%", background: "var(--accent)" }}></span><span>AIGP candidates in their final weeks of preparation</span></li>
<li style={{ display: "flex", gap: "10px", fontSize: "16px", lineHeight: "1.5", color: "#D5D8E0" }}><span aria-hidden="true" style={{ flex: "0 0 6px", height: "6px", marginTop: "9px", borderRadius: "50%", background: "var(--accent)" }}></span><span>Privacy, legal, risk and security professionals moving into AI governance</span></li>
<li style={{ display: "flex", gap: "10px", fontSize: "16px", lineHeight: "1.5", color: "#D5D8E0" }}><span aria-hidden="true" style={{ flex: "0 0 6px", height: "6px", marginTop: "9px", borderRadius: "50%", background: "var(--accent)" }}></span><span>Practitioners who want a compact reference to the major AI laws and frameworks</span></li>
</ul>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "12px", paddingTop: "4px" }}>
<a href="https://a.co/d/05LyONnJ" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "15px 26px", borderRadius: "999px", fontWeight: "700" }}>Buy on Amazon<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
</div>
</div>
</div>
</section>

{/* CORE EXPERTISE */}
<section id="newsletter" style={{ background: "#F8FAFC", color: "#111318" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Learn with me</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", lineHeight: "1.15" }}>Building a community of AI governance learners</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#4B5160" }}>Practical insight on AI governance, privacy and cybersecurity for professionals preparing for the AIGP and moving into AI risk roles.</p>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "16px", maxWidth: "980px" }}>
<div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "6px", padding: "24px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E5E7EB" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "40px", fontWeight: "800", lineHeight: "1", color: "#111318" }}>14+</span><span style={{ fontSize: "15px", color: "#5B6170" }}>Years in cybersecurity</span></div>
<div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "6px", padding: "24px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E5E7EB" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "40px", fontWeight: "800", lineHeight: "1", color: "#111318" }}>14</span><span style={{ fontSize: "15px", color: "#5B6170" }}>Professional certifications</span></div>
<div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "6px", padding: "24px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E5E7EB" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "40px", fontWeight: "800", lineHeight: "1", color: "#111318" }}>3</span><span style={{ fontSize: "15px", color: "#5B6170" }}>Research papers</span></div>
<div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "6px", padding: "24px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E5E7EB" }}><span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "40px", fontWeight: "800", lineHeight: "1", color: "#111318" }}>1</span><span style={{ fontSize: "15px", color: "#5B6170" }}>AIGP exam guide</span></div>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
<a href={settings.linkedin_url || "/contact"} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "15px 26px", borderRadius: "999px", fontWeight: "700" }}>Follow on LinkedIn<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
<a href="https://a.co/d/05LyONnJ" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318", textDecoration: "none", padding: "15px 26px", borderRadius: "999px", fontWeight: "600" }}>Get the AIGP guide</a>
<a href="#available" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318", textDecoration: "none", padding: "15px 26px", borderRadius: "999px", fontWeight: "600" }}>Read my research</a>
</div>
</div>
</section>

{/* CONTACT CTA */}
<section id="contact" style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(86% 0, 96% 0, 82% 100%, 72% 100%)", pointerEvents: "none" }}></div>
<div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", maxWidth: "660px", display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Work together</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1.15" }}>Start a conversation</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#C7CCDA" }}>Speaking, consultation, training or research collaboration: tell me what you have in mind.</p>
</div>
<Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "16px 28px", borderRadius: "999px", fontWeight: "700", fontSize: "17px" }}>Get in touch<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></Link>
</div>
</section>

<SiteFooter />

</div>

    </>
  );
}
