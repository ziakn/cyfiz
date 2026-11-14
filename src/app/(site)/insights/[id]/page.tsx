/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import NewsletterForm from "@/components/site/NewsletterForm";
import CopyLinkButton from "@/components/site/CopyLinkButton";
import { articleHref, getArticleDetail, getRelatedArticles } from "@/lib/siteData";
import { prepareArticleHtml } from "@/lib/articleContent";
import { stripHtml, truncate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cyfiz.com";
const DEFAULT_AUTHOR = { name: "Hafiz Saqib", role: "Cybersecurity & AI Governance · Cyfiz" };

type Props = { params: Promise<{ id: string }> };

async function load(id: string) {
  const realId = Number(id.split("-")[0]);
  if (!Number.isInteger(realId) || realId <= 0) return null;
  return getArticleDetail(realId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await load(id);
  if (!article) return { title: "Insight not found — Cyfiz" };
  return { title: `${article.title} — Cyfiz`, description: truncate(article.excerpt, 160) };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await load(id);
  if (!article) notFound();

  // Older articles keep their whole body in `excerpt`; newer ones use `content`.
  const { html, toc } = prepareArticleHtml(article.content || article.excerpt);
  const related = await getRelatedArticles(article.id, article.tag, 3);

  const authorName = article.author_name || DEFAULT_AUTHOR.name;
  const authorRole = article.author_role || DEFAULT_AUTHOR.role;
  const authorBio = `${authorRole}. Writes about security, privacy and AI governance.`;
  const initials = authorName.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const standfirst = article.content ? truncate(article.excerpt, 260) : truncate(article.excerpt, 200);
  const readLabel = article.readTime ? (/read/i.test(article.readTime) ? article.readTime : `${article.readTime} read`) : "";

  const url = `${SITE_URL}${articleHref(article)}`;
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(stripHtml(article.title))}`,
    email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`,
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A", background: "#FFFFFF", width: "100%" }}>
<header style={{ position: "relative", overflow: "hidden", backgroundColor: "#0C0D10", color: "#FFFFFF" }}>
<div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: "0", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 45%, #F2A900 100%)", clipPath: "polygon(86% 0, 96% 0, 80% 100%, 70% 100%)", pointerEvents: "none" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,255,255,0.10)", clipPath: "polygon(99% 0, 100% 0, 100% 100%, 84% 100%)", pointerEvents: "none" }}></div>

<SiteNav active="insights" />

<div style={{ position: "relative", maxWidth: "960px", margin: "0 auto", padding: "48px 24px 200px", display: "flex", flexDirection: "column", gap: "26px", boxSizing: "border-box" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", fontSize: "15px", color: "#A9AEBB" }}>
<Link href="/" style={{ color: "#C7CCDA", textDecoration: "none" }}>Home</Link>
<span aria-hidden="true">/</span>
<Link href="/insights" style={{ color: "#C7CCDA", textDecoration: "none" }}>Insights</Link>
<span aria-hidden="true">/</span>
<span style={{ color: "#FFFFFF" }}>{article.tag}</span>
</div>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
<span style={{ padding: "6px 12px", borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", fontSize: "13px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>{article.tag}</span>
{article.audience ? <span style={{ padding: "6px 12px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.28)", color: "#E2E4EA", fontSize: "13px", fontWeight: "600" }}>{article.audience}</span> : null}
</div>
<h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "56px", lineHeight: "1.1", letterSpacing: "-0.03em", maxWidth: "880px" }}>{article.title}</h1>
<p style={{ margin: "0", fontSize: "22px", lineHeight: "1.6", color: "#C7CCDA", maxWidth: "780px" }}>{standfirst}</p>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "18px", paddingTop: "6px" }}>
<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
<span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#1C1F26", border: "2px solid var(--accent)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "18px" }}>{initials}</span>
<span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "17px", fontWeight: "700" }}>{authorName}</span><span style={{ fontSize: "14px", color: "#A9AEBB" }}>{authorRole}</span></span>
</div>
<span aria-hidden="true" style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.18)" }}></span>
<span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "#C7CCDA" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg>{article.date}</span>
<span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "#C7CCDA" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>{readLabel}</span>
</div>
</div>
</header>

{/* COVER IMAGE */}
<div style={{ position: "relative", maxWidth: "1120px", margin: "-150px auto 0", padding: "0 24px", boxSizing: "border-box" }}>
<figure style={{ margin: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
{article.image_url ? (
<div style={{ position: "relative", overflow: "hidden", height: "520px", borderRadius: "24px", background: "#1C1F26", boxShadow: "0 30px 60px rgba(12,13,16,0.25)" }}>
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src={article.image_url} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
</div>
) : (
<div role="img" aria-label={`Cover: ${article.title}`} style={{ position: "relative", overflow: "hidden", height: "520px", borderRadius: "24px", background: "#1C1F26", boxShadow: "0 30px 60px rgba(12,13,16,0.25)" }}>
<div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: "0" }}></div>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(70% 0, 82% 0, 58% 100%, 46% 100%)", opacity: "0.85" }}></div>
<div style={{ position: "absolute", left: "48px", right: "48px", bottom: "44px", display: "flex", flexDirection: "column", gap: "18px", maxWidth: "620px" }}>
<img src="/logo-cyfiz.png" alt="" style={{ height: "36px", width: "auto", alignSelf: "flex-start" }} />
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "44px", fontWeight: "800", lineHeight: "1.12", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{article.title}</span>
<span style={{ alignSelf: "flex-start", padding: "6px 12px", borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", fontSize: "13px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>{article.tag}</span>
</div>
</div>
)}
</figure>
</div>


{/* ARTICLE BODY */}
<div style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px 96px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "64px", boxSizing: "border-box" }}>
<aside style={{ flex: "1 1 240px", maxWidth: "280px", minWidth: "0", display: "flex", flexDirection: "column", gap: "32px" }}>
{toc.length > 0 ? <nav aria-label="On this page" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>On this page</span>
<ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "2px solid #E5E7EB" }}>
{toc.map((h) => (
<li key={h.id}><a href={"#" + h.id} style={{ display: "block", padding: "8px 0 8px 16px", color: "#4B5160", fontSize: "15px", textDecoration: "none" }}>{h.text}</a></li>
))}
</ol>
</nav> : null}
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Share</span>
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
<a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #E5E7EB", color: "#111318", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"></path></svg></a>
<a href={shareLinks.x} target="_blank" rel="noopener noreferrer" aria-label="Share on X" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #E5E7EB", color: "#111318", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"></path></svg></a>
<a href={shareLinks.email} aria-label="Share by email" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #E5E7EB", color: "#111318", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg></a>
<CopyLinkButton />
</div>
</div>
</aside>

<article style={{ flex: "999 1 560px", minWidth: "0", maxWidth: "760px", display: "flex", flexDirection: "column", gap: "28px", fontSize: "19px", lineHeight: "1.8", color: "#2A2E37" }}>
<div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", paddingTop: "24px", borderTop: "1px solid #E5E7EB" }}>
<span style={{ fontSize: "15px", fontWeight: "700", color: "#111318", marginRight: "4px" }}>Tag</span>
<Link href="/insights" style={{ padding: "8px 14px", borderRadius: "999px", border: "1px solid #CBD5E1", color: "#2A2E37", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>{article.tag}</Link>
</div>

{/* Author card */}
<div style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "22px", padding: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(90% 0, 100% 0, 100% 100%, 80% 100%)" }}></div>
<span aria-hidden="true" style={{ position: "relative", flex: "0 0 88px", width: "88px", height: "88px", borderRadius: "50%", background: "#1C1F26", border: "3px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "28px" }}>{initials}</span>
<div style={{ position: "relative", flex: "1 1 280px", minWidth: "0", maxWidth: "78%", display: "flex", flexDirection: "column", gap: "8px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Written by</span>
<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "24px", fontWeight: "800" }}>{authorName}</span>
<span style={{ fontSize: "16px", lineHeight: "1.6", color: "#C7CCDA" }}>{authorBio}</span>
<Link href="/profile" style={{ color: "var(--accent)", fontWeight: "700", textDecoration: "none", fontSize: "16px" }}>View profile →</Link>
</div>
</div>


</article>
</div>

{/* RELATED */}
{related.length > 0 ? <section style={{ background: "#F6F6F3" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 24px", display: "flex", flexDirection: "column", gap: "36px" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Keep reading</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "38px", lineHeight: "1.15", color: "#111318" }}>Related Insights</h2>
</div>
<Link href="/insights" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318", textDecoration: "none", padding: "13px 22px", borderRadius: "999px", fontWeight: "600" }}>View all insights<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></Link>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
{related.map((r) => (
<Link key={r.id} href={articleHref(r)} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", color: "#111318", borderRadius: "22px", padding: "30px", display: "flex", flexDirection: "column", gap: "16px", textDecoration: "none" }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}><span style={{ padding: "5px 11px", borderRadius: "999px", background: "#FFF6D6", color: "#3D3000", fontSize: "12px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase" }}>{r.tag}</span><span style={{ fontSize: "14px", color: "#5B6170" }}>{r.date}</span></div>
<h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: "800", lineHeight: "1.3", flexGrow: "1" }}>{r.title}</h3>
<span style={{ color: "#8A5F00", fontWeight: "700" }}>Read insight →</span>
</Link>
))}
</div>
</div>
</section> : null}

<NewsletterForm variant="dark" />

<SiteFooter />
    </div>
  );
}
