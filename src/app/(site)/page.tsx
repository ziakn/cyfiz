import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import NewsletterForm from "@/components/site/NewsletterForm";
import { articleHref, getPublishedArticles } from "@/lib/siteData";
import { truncate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cyfiz - Cyber Intelligence & Research",
  description: "Security, privacy and AI insights you can actually apply: expert articles, frameworks, toolkits and knowledge quizzes.",
};

export default async function HomePage() {
  const articles = await getPublishedArticles(3);

  return (
    <>
<div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A", background: "#FFFFFF", width: "100%" }}>

{/* HERO */}
<section id="top" style={{ position: "relative", overflow: "hidden", backgroundColor: "#0C0D10", color: "#FFFFFF" }}>
<div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: "0", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(115deg, rgba(255,194,26,0) 0%, rgba(255,194,26,0.06) 100%)", clipPath: "polygon(78% 0, 100% 0, 100% 100%, 54% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 45%, #F2A900 100%)", clipPath: "polygon(76% 0, 93% 0, 69% 100%, 52% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(84% 0, 88% 0, 64% 100%, 60% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.35)", clipPath: "polygon(96% 0, 97.4% 0, 73.4% 100%, 72% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "180px", background: "linear-gradient(to bottom, rgba(12,13,16,0) 0%, #0C0D10 100%)", pointerEvents: "none" }}></div>

<SiteNav active="home" />

<div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "56px 40px 112px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", minHeight: "620px", boxSizing: "border-box" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", maxWidth: "700px", display: "flex", flexDirection: "column", gap: "30px", zIndex: "2" }}>
<span style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "10px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", padding: "6px 16px 6px 8px", borderRadius: "999px", fontSize: "15px", fontWeight: "600", color: "#E2E4EA" }}><span aria-hidden="true" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--accent)" }}></span>Cyber Intelligence &amp; Research</span>
<h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "700", fontSize: "62px", lineHeight: "1.08", letterSpacing: "-0.03em" }}>Security, Privacy and AI Insights You Can Actually Apply</h1>
<p style={{ margin: "0", fontSize: "21px", lineHeight: "1.6", color: "#C7CCDA", maxWidth: "620px" }}>Explore expert insights, practical frameworks and toolkits, and knowledge quizzes designed for modern professionals and technology leaders.</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
<a href="#insights" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "15px 26px", borderRadius: "999px", fontWeight: "700", fontSize: "17px" }}>Explore Insights<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
</div>

<div style={{ flex: "1 1 420px", minWidth: "0", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "16px", zIndex: "2" }}>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "24px", fontWeight: "700", letterSpacing: "-0.01em" }}>What you&apos;ll find</span>
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
<Link href="/insights" style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(20,22,27,0.9)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "16px 20px", borderRadius: "18px", textDecoration: "none" }}><span aria-hidden="true" style={{ flex: "0 0 44px", width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4"></path><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3z"></path></svg></span><span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "18px", fontWeight: "700" }}>Explore Insights</span><span style={{ fontSize: "14px", color: "#A9AEBB" }}>Expert analysis on security, privacy and AI</span></span></Link>
<a href="#insights" style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(20,22,27,0.9)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "16px 20px", borderRadius: "18px", textDecoration: "none" }}><span aria-hidden="true" style={{ flex: "0 0 44px", width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg></span><span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "18px", fontWeight: "700" }}>Frameworks &amp; Toolkits</span><span style={{ fontSize: "14px", color: "#A9AEBB" }}>Practical models you can put to work</span></span></a>
<Link href="/learn" style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(20,22,27,0.9)", border: "1px solid rgba(255,255,255,0.14)", color: "#FFFFFF", padding: "16px 20px", borderRadius: "18px", textDecoration: "none" }}><span aria-hidden="true" style={{ flex: "0 0 44px", width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"></path><path d="M12 17h.01"></path></svg></span><span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "18px", fontWeight: "700" }}>Knowledge &amp; Quizzes</span><span style={{ fontSize: "14px", color: "#A9AEBB" }}>Test what you know, find the gaps</span></span></Link>
</div>
</div>
</div>
</section>

{/* LATEST FRAMEWORKS */}
<section id="insights" style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "44px" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Blog</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", lineHeight: "1.15", letterSpacing: "-0.01em", color: "#111318" }}>Latest Insights</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#4B5160" }}>Expert articles and perspectives on cybersecurity, privacy and AI, written to help you make informed decisions.</p>
</div>
<Link href="/insights" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318", textDecoration: "none", padding: "13px 22px", borderRadius: "999px", fontWeight: "600" }}>View all insights<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></Link>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>

{articles.map((a, i) => i === 0 ? (
<Link key={a.id} href={articleHref(a)} style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "22px", padding: "32px", display: "flex", flexDirection: "column", gap: "18px", textDecoration: "none" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(84% 0, 100% 0, 100% 34%, 72% 0)" }}></div>
<div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}><span style={{ padding: "5px 11px", borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>{a.tag}</span><span style={{ fontSize: "14px", color: "#A9AEBB" }}>{a.date}</span></div>
<h3 style={{ position: "relative", margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "24px", fontWeight: "800", lineHeight: "1.25" }}>{a.title}</h3>
<p style={{ position: "relative", margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#C7CCDA", flexGrow: "1" }}>{truncate(a.excerpt, 180)}</p>
<span style={{ position: "relative", color: "var(--accent)", fontWeight: "700" }}>Read insight →</span>
</Link>
) : (
<Link key={a.id} href={articleHref(a)} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", color: "#111318", borderRadius: "22px", padding: "32px", display: "flex", flexDirection: "column", gap: "18px", textDecoration: "none" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}><span style={{ padding: "5px 11px", borderRadius: "999px", background: "#FFF6D6", color: "#3D3000", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>{a.tag}</span><span style={{ fontSize: "14px", color: "#5B6170" }}>{a.date}</span></div>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "24px", fontWeight: "800", lineHeight: "1.25" }}>{a.title}</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#4B5160", flexGrow: "1" }}>{truncate(a.excerpt, 180)}</p>
<span style={{ color: "#8A5F00", fontWeight: "700" }}>Read insight →</span>
</Link>
))}

</div>
</div>
</section>

{/* LEARN TEASER */}
<section id="learn" style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Learn</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "42px", lineHeight: "1.15", color: "#111318" }}>Trainings &amp; Quizzes</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#4B5160" }}>Build practical skills in cybersecurity, privacy and AI governance, then test what you know.</p>
</div>
<Link href="/learn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318", textDecoration: "none", padding: "13px 22px", borderRadius: "999px", fontWeight: "600" }}>Visit Learn<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></Link>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
<Link href="/learn" style={{ background: "#F6F6F3", border: "1px solid #E5E7EB", color: "#111318", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "18px", textDecoration: "none" }}>
<span aria-hidden="true" style={{ width: "60px", height: "60px", borderRadius: "16px", background: "#0C0D10", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5z"></path><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"></path></svg></span>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "30px", fontWeight: "800", lineHeight: "1.2" }}>Trainings</h3>
<p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#4B5160", flexGrow: "1" }}>Practical courses on cybersecurity, privacy and AI governance, built for professionals who need to apply what they learn.</p>
<span style={{ color: "#8A5F00", fontWeight: "700", fontSize: "17px" }}>Browse trainings →</span>
</Link>
<Link href="/learn" style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", gap: "18px", textDecoration: "none" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(86% 0, 100% 0, 100% 30%, 74% 0)" }}></div>
<span aria-hidden="true" style={{ position: "relative", width: "60px", height: "60px", borderRadius: "16px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"></path><path d="M12 17h.01"></path></svg></span>
<h3 style={{ position: "relative", margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "30px", fontWeight: "800", lineHeight: "1.2" }}>Quizzes</h3>
<p style={{ position: "relative", margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C7CCDA", flexGrow: "1" }}>Short quizzes that test your security and AI governance knowledge and show where to dig deeper.</p>
<span style={{ position: "relative", color: "var(--accent)", fontWeight: "700", fontSize: "17px" }}>Take a quiz →</span>
</Link>
</div>
</div>
</section>

<NewsletterForm variant="light" />

<SiteFooter />

</div>

    </>
  );
}
