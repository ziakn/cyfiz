import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import NewsletterForm from "@/components/site/NewsletterForm";
import { getPublishedPackages, type SitePackage } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Packages — Cyfiz",
  description: "Free and paid packages: pick the level of access that fits how you learn.",
};

const check = (dark: boolean) => (
  <span aria-hidden="true" style={{ flex: "0 0 22px", width: "22px", height: "22px", marginTop: "1px", borderRadius: "50%", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center", opacity: dark ? 1 : 1 }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
  </span>
);

function PackageCard({ p }: { p: SitePackage }) {
  const dark = p.featured === "Yes";
  const features = (p.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean);
  const href = p.cta_url || "/contact";
  const external = /^https?:\/\//i.test(href);
  const priceText = p.price || (p.tier === "Free" ? "Free" : "");
  const ctaStyle = dark
    ? { background: "var(--accent)", color: "#0C0D10", border: "0" }
    : { background: "#0C0D10", color: "#FFFFFF", border: "0" };
  const cta = (
    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "52px", borderRadius: "999px", fontWeight: 700, fontSize: "16px", textDecoration: "none", ...ctaStyle }}>
      {p.cta_label || (p.tier === "Free" ? "Get started" : "Choose plan")}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </span>
  );

  return (
    <div style={{ position: "relative", overflow: "hidden", background: dark ? "#0C0D10" : "#FFFFFF", color: dark ? "#FFFFFF" : "#111318", border: dark ? "0" : "1px solid #E5E7EB", borderRadius: "24px", padding: "36px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {dark && <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(255,194,26,0.10)", clipPath: "polygon(78% 0, 100% 0, 100% 34%, 62% 0)", pointerEvents: "none" }} />}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <span style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: dark ? "rgba(255,255,255,0.12)" : "#FFF6D6", color: dark ? "#E2E4EA" : "#3D3000" }}>{p.tier}</span>
        {p.badge ? <span style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, background: "var(--accent)", color: "#0C0D10" }}>{p.badge}</span> : null}
      </div>
      <h2 style={{ position: "relative", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: 800, lineHeight: 1.2 }}>{p.name}</h2>
      <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "48px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>{priceText}</span>
        {p.period ? <span style={{ fontSize: "16px", color: dark ? "#A9AEBB" : "#5B6170" }}>{p.period}</span> : null}
      </div>
      {p.description ? <p style={{ position: "relative", margin: 0, fontSize: "16px", lineHeight: 1.6, color: dark ? "#C7CCDA" : "#4B5160" }}>{p.description}</p> : null}
      <ul style={{ position: "relative", margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: 1.5, color: dark ? "#E2E4EA" : "#2A2E37" }}>{check(dark)}<span>{f}</span></li>
        ))}
      </ul>
      <div style={{ position: "relative", paddingTop: "8px" }}>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{cta}</a>
        ) : (
          <Link href={href} style={{ textDecoration: "none" }}>{cta}</Link>
        )}
      </div>
    </div>
  );
}

export default async function PackagesPage() {
  const packages = await getPublishedPackages();

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#0F172A", background: "#FFFFFF", width: "100%" }}>
      <header style={{ position: "relative", overflow: "hidden", backgroundColor: "#0C0D10", color: "#FFFFFF" }}>
        <div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(255,194,26,0) 0%, rgba(255,194,26,0.06) 100%)", clipPath: "polygon(78% 0, 100% 0, 100% 100%, 54% 100%)", pointerEvents: "none" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 45%, #F2A900 100%)", clipPath: "polygon(80% 0, 94% 0, 74% 100%, 60% 100%)", pointerEvents: "none" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.10)", clipPath: "polygon(87% 0, 90% 0, 70% 100%, 67% 100%)", pointerEvents: "none" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(255,194,26,0.35)", clipPath: "polygon(97% 0, 98.4% 0, 78.4% 100%, 77% 100%)", pointerEvents: "none" }}></div>

        <SiteNav active="packages" />

        <div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "56px 40px 96px", display: "flex", flexDirection: "column", gap: "26px", boxSizing: "border-box" }}>
          <span style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "10px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", padding: "6px 16px 6px 8px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, color: "#E2E4EA" }}><span aria-hidden="true" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--accent)" }}></span>Free &amp; Paid</span>
          <h1 style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "62px", lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: "760px" }}>Packages</h1>
          <p style={{ margin: 0, fontSize: "21px", lineHeight: 1.6, color: "#C7CCDA", maxWidth: "680px" }}>Start free, then upgrade when you need exam-style practice, toolkits and support.</p>
        </div>
      </header>

      <section style={{ background: "#F6F6F3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>
          {packages.length === 0 ? (
            <p style={{ margin: 0, textAlign: "center", fontSize: "17px", color: "#4B5160" }}>Packages are being prepared. <Link href="/contact">Get in touch</Link> and we&apos;ll help you choose.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "stretch" }}>
              {packages.map((p) => <PackageCard key={p.id} p={p} />)}
            </div>
          )}
          <p style={{ margin: 0, textAlign: "center", fontSize: "15px", color: "#5B6170" }}>Questions about which package fits? <Link href="/contact">Contact us</Link>.</p>
        </div>
      </section>

      <NewsletterForm variant="dark" />
      <SiteFooter />
    </div>
  );
}
