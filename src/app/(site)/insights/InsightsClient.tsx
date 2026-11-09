"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import NewsletterForm from "@/components/site/NewsletterForm";
import { truncate } from "@/lib/utils";

export interface InsightItem {
  id: number;
  href: string;
  cat: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
}

const PAGE = 6;
const articleHref = (a: { href: string }) => a.href;

const chipBase: React.CSSProperties = {
  minHeight: 44, padding: "0 18px", borderRadius: 999, font: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer",
};

export default function InsightsClient({ articles }: { articles: InsightItem[] }) {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const featured = articles[0] ?? null;
  const rest = useMemo(() => articles.slice(1), [articles]);
  const categories = useMemo(() => ["All", ...Array.from(new Set(rest.map((a) => a.cat)))], [rest]);

  const q = query.trim().toLowerCase();
  const matched = rest.filter(
    (a) => (cat === "All" || a.cat === cat) && (!q || (a.title + " " + a.excerpt).toLowerCase().includes(q))
  );
  const shown = matched.slice(0, limit);
  const hasMore = matched.length > shown.length;

  const cats = categories.map((c) => ({
    label: c,
    pressed: c === cat,
    style: c === cat
      ? { ...chipBase, border: "1px solid #0C0D10", background: "#0C0D10", color: "#FFFFFF" }
      : { ...chipBase, border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318" },
    pick: () => { setCat(c); setLimit(PAGE); },
  }));
  const hasResults = shown.length > 0;
  const noResults = shown.length === 0;
  const allLoaded = !hasMore && shown.length > 0;
  const progressLabel = "Showing " + shown.length + " of " + matched.length;
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value); setLimit(PAGE); };
  const loadMore = () => setLimit(limit + 3);
  const clear = () => { setCat("All"); setQuery(""); setLimit(PAGE); };

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

<SiteNav active="insights" />

<div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "56px 40px 96px", display: "flex", flexDirection: "column", gap: "26px", boxSizing: "border-box" }}>
<span style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "10px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", padding: "6px 16px 6px 8px", borderRadius: "999px", fontSize: "15px", fontWeight: "600", color: "#E2E4EA" }}><span aria-hidden="true" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--accent)" }}></span>Blog</span>
<h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "700", fontSize: "62px", lineHeight: "1.08", letterSpacing: "-0.03em", maxWidth: "760px" }}>Insights</h1>
<p style={{ margin: "0", fontSize: "21px", lineHeight: "1.6", color: "#C7CCDA", maxWidth: "680px" }}>Curated intelligence on AI security, privacy regulation and emerging cyber threats for professionals and decision-makers.</p>
<label style={{ display: "flex", alignItems: "center", gap: "12px", maxWidth: "560px", height: "58px", padding: "0 20px", borderRadius: "999px", background: "rgba(20,22,27,0.9)", border: "1px solid rgba(255,255,255,0.2)", color: "#A9AEBB", boxSizing: "border-box" }}>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>
<span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search insights</span>
<input type="search" placeholder="Search insights" value={query} onChange={onSearch} style={{ flex: "1 1 auto", minWidth: "0", height: "100%", border: "0", outline: "none", background: "transparent", color: "#FFFFFF", font: "inherit", fontSize: "17px" }} />
</label>
</div>
</header>

{/* FEATURED */}
<section style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "72px 24px 0", display: "flex", flexDirection: "column", gap: "20px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Featured</span>
{featured ? (
<Link href={articleHref(featured)} style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "26px", display: "flex", flexWrap: "wrap", textDecoration: "none" }}>
<div aria-hidden="true" style={{ position: "relative", flex: "1 1 420px", minHeight: "340px", overflow: "hidden", background: "#16181D" }}>
<div className="hero-grid" style={{ position: "absolute", inset: "0" }}></div>
<div style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(52% 0, 74% 0, 44% 100%, 22% 100%)" }}></div>
<div style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(80% 0, 84% 0, 54% 100%, 50% 100%)" }}></div>
<span style={{ position: "absolute", left: "32px", bottom: "28px", width: "72px", height: "72px", borderRadius: "20px", background: "#0C0D10", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg></span>
</div>
<div style={{ flex: "1 1 460px", minWidth: "0", padding: "44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}><span style={{ padding: "5px 11px", borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>{featured.cat}</span><span style={{ fontSize: "15px", color: "#A9AEBB" }}>{featured.date} · Latest</span></div>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "38px", fontWeight: "800", lineHeight: "1.15", letterSpacing: "-0.01em" }}>{featured.title}</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#C7CCDA" }}>{truncate(featured.excerpt, 220)}</p>
<span style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", padding: "14px 24px", borderRadius: "999px", fontWeight: "700" }}>Read insight<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
</div>
</Link>
) : null}
</div>
</section>

{/* ALL INSIGHTS */}
<section style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "72px 24px 96px", display: "flex", flexDirection: "column", gap: "32px" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "38px", lineHeight: "1.15", color: "#111318" }}>All Insights</h2>
</div>
<div role="group" aria-label="Filter by category" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
{cats.map((c, __i) => (<React.Fragment key={__i}>
<button type="button" aria-pressed={c.pressed} onClick={c.pick} style={c.style}>{c.label}</button>
</React.Fragment>))}
</div>
</div>

{hasResults && (<>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
{shown.map((a, __i) => (<React.Fragment key={__i}>
<Link href={a.href} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", color: "#111318", borderRadius: "22px", padding: "30px", display: "flex", flexDirection: "column", gap: "16px", textDecoration: "none" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px" }}><span style={{ padding: "5px 11px", borderRadius: "999px", background: "#FFF6D6", color: "#3D3000", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>{a.cat}</span><span style={{ fontSize: "14px", color: "#5B6170" }}>{a.date}</span></div>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: "800", lineHeight: "1.3" }}>{a.title}</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#4B5160", flexGrow: "1" }}>{a.excerpt}</p>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "14px", borderTop: "1px solid #E5E7EB" }}><span style={{ fontSize: "14px", color: "#5B6170" }}>{a.read}</span><span style={{ color: "#8A5F00", fontWeight: "700" }}>Read insight →</span></div>
</Link>
</React.Fragment>))}
</div>
</>)}

{noResults && (<>
<div style={{ padding: "56px 24px", borderRadius: "22px", background: "#FFFFFF", border: "1px dashed #CBD5E1", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center" }}>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: "800", color: "#111318" }}>No insights match your search</span>
<span style={{ fontSize: "16px", color: "#4B5160" }}>Try another keyword or category.</span>
<button type="button" onClick={clear} style={{ marginTop: "6px", height: "46px", padding: "0 22px", border: "1px solid #CBD5E1", borderRadius: "999px", background: "#FFFFFF", color: "#111318", font: "inherit", fontWeight: "600", cursor: "pointer" }}>Clear filters</button>
</div>
</>)}

{hasMore && (<>
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
<button type="button" onClick={loadMore} style={{ height: "54px", padding: "0 32px", border: "1px solid #0C0D10", borderRadius: "999px", background: "#0C0D10", color: "#FFFFFF", font: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>Load more<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"></path></svg></button>
<span style={{ fontSize: "14px", color: "#5B6170" }}>{progressLabel}</span>
</div>
</>)}
{allLoaded && (<>
<span style={{ alignSelf: "center", fontSize: "15px", color: "#5B6170" }}>You’re all caught up</span>
</>)}
</div>
</section>

<NewsletterForm variant="dark" />

<SiteFooter />

</div>

    </>
  );
}
