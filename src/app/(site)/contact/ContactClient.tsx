"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";

const TOPICS = ["General question", "Trainings", "Speaking or collaboration", "Feedback or suggestion"];
const chipBase: React.CSSProperties = { minHeight: 44, padding: "0 18px", borderRadius: 999, font: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" };

export default function ContactClient() {
  const st = useSiteSettings();
  const [picked, setPicked] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const notSent = !sent;

  const topics = TOPICS.map((t) => ({
    label: t,
    pressed: t === picked,
    style: t === picked
      ? { ...chipBase, border: "1px solid #0C0D10", background: "#0C0D10", color: "#FFFFFF" }
      : { ...chipBase, border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#111318" },
    pick: () => setPicked(t),
  }));

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: picked,
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          role: data.get("role"),
          message: data.get("message"),
          subscribe: data.get("subscribe") === "on",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not send your message.");
      form.reset();
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message.");
    } finally {
      setSending(false);
    }
  }
  const reset = () => { setSent(false); setError(""); };

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

<SiteNav active="contact" />

<div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "56px 40px 200px", display: "flex", flexDirection: "column", gap: "26px", boxSizing: "border-box" }}>
<span style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "10px", background: "rgba(20,22,27,0.85)", border: "1px solid rgba(255,255,255,0.14)", padding: "6px 16px 6px 8px", borderRadius: "999px", fontSize: "15px", fontWeight: "600", color: "#E2E4EA" }}><span aria-hidden="true" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--accent)" }}></span>Contact</span>
<h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "700", fontSize: "62px", lineHeight: "1.08", letterSpacing: "-0.03em", maxWidth: "760px" }}>Let’s start a conversation</h1>
<p style={{ margin: "0", fontSize: "21px", lineHeight: "1.6", color: "#C7CCDA", maxWidth: "640px" }}>Have questions or suggestions? We would love to hear from you, whether it’s about an insight, a training, a quiz or a collaboration.</p>
</div>
</header>

{/* FORM + CHANNELS */}
<section id="contact" style={{ background: "#F6F6F3" }}>
<div style={{ position: "relative", maxWidth: "1200px", margin: "-150px auto 0", padding: "0 24px 96px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "28px", boxSizing: "border-box" }}>

{/* Form */}
<form onSubmit={send} style={{ flex: "999 1 560px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "24px", padding: "44px", display: "flex", flexDirection: "column", gap: "24px", boxSizing: "border-box", boxShadow: "0 30px 60px rgba(12,13,16,0.18)" }}>
{notSent && (<>
<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "30px", fontWeight: "800", color: "#111318" }}>Send us a message</h2>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#4B5160" }}>Fill in the form and we’ll get back to you by email.</p>
</div>
<fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
<legend style={{ fontSize: "14px", fontWeight: "700", color: "#111318", padding: "0 0 12px" }}>What is it about?</legend>
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
{topics.map((t, __i) => (<React.Fragment key={__i}>
<button type="button" aria-pressed={t.pressed} onClick={t.pick} style={t.style}>{t.label}</button>
</React.Fragment>))}
</div>
</fieldset>
<div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
<label style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#111318" }}>Full name<input name="name" required maxLength={150} type="text" autoComplete="name" style={{ height: "50px", border: "1px solid #CBD5E1", borderRadius: "12px", padding: "0 16px", font: "inherit", fontSize: "16px", fontWeight: "400" }} /></label>
<label style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#111318" }}>Email<input name="email" required maxLength={191} type="email" autoComplete="email" placeholder="you@company.com" style={{ height: "50px", border: "1px solid #CBD5E1", borderRadius: "12px", padding: "0 16px", font: "inherit", fontSize: "16px", fontWeight: "400" }} /></label>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
<label style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#111318" }}>Organisation <span style={{ fontWeight: "400", color: "#5B6170" }}>(optional)</span><input name="organisation" maxLength={150} type="text" autoComplete="organization" style={{ height: "50px", border: "1px solid #CBD5E1", borderRadius: "12px", padding: "0 16px", font: "inherit", fontSize: "16px", fontWeight: "400" }} /></label>
<label style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#111318" }}>Role <span style={{ fontWeight: "400", color: "#5B6170" }}>(optional)</span><input name="role" maxLength={150} type="text" autoComplete="organization-title" style={{ height: "50px", border: "1px solid #CBD5E1", borderRadius: "12px", padding: "0 16px", font: "inherit", fontSize: "16px", fontWeight: "400" }} /></label>
</div>
<label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#111318" }}>Message<textarea name="message" required maxLength={5000} rows={6} placeholder="Tell us how we can help" style={{ border: "1px solid #CBD5E1", borderRadius: "12px", padding: "14px 16px", font: "inherit", fontSize: "16px", fontWeight: "400", resize: "vertical" }}></textarea></label>
{error ? <p role="alert" style={{ margin: 0, color: "#B91C1C", fontSize: "15px", fontWeight: 600 }}>{error}</p> : null}
<label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", lineHeight: "1.5", color: "#4B5160" }}><input name="subscribe" type="checkbox" style={{ width: "20px", height: "20px", margin: "0", flex: "0 0 20px", accentColor: "#0C0D10" }} />Also subscribe me to the weekly 5-minute briefing</label>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
<span style={{ fontSize: "13px", lineHeight: "1.5", color: "#5B6170", maxWidth: "360px" }}>By sending this form you agree to our <a href="https://cyfiz.com/privacy">Privacy policy</a>.</span>
<button type="submit" disabled={sending} style={{ height: "54px", padding: "0 32px", border: "0", borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", font: "inherit", fontWeight: "700", fontSize: "17px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>{sending ? "Sending…" : "Send message"}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button>
</div>
</div>
</>)}
{sent && (<>
<div role="status" style={{ padding: "40px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
<span aria-hidden="true" style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "30px", fontWeight: "800", color: "#111318" }}>Thanks, your message is on its way</h2>
<p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#4B5160", maxWidth: "440px" }}>We’ll reply to the email address you gave us.</p>
<button type="button" onClick={reset} style={{ height: "48px", padding: "0 24px", border: "1px solid #CBD5E1", borderRadius: "999px", background: "#FFFFFF", color: "#111318", font: "inherit", fontWeight: "600", cursor: "pointer" }}>Send another message</button>
</div>
</>)}
</form>

{/* Channels */}
<aside style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<div style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "22px" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "rgba(255,194,26,0.10)", clipPath: "polygon(74% 0, 100% 0, 100% 36%, 56% 0)" }}></div>
<h2 style={{ position: "relative", margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "24px", fontWeight: "800" }}>Other ways to reach us</h2>

<a href={`mailto:${st.contact_email}`} style={{ position: "relative", display: "flex", alignItems: "center", gap: "16px", color: "#FFFFFF", textDecoration: "none" }}>
<span aria-hidden="true" style={{ flex: "0 0 48px", width: "48px", height: "48px", borderRadius: "14px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg></span>
<span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", color: "#A9AEBB" }}>Email</span><span style={{ fontSize: "18px", fontWeight: "700" }}>{st.contact_email}</span></span>
</a>

<a href={st.discord_url || "/contact"} style={{ position: "relative", display: "flex", alignItems: "center", gap: "16px", color: "#FFFFFF", textDecoration: "none" }}>
<span aria-hidden="true" style={{ flex: "0 0 48px", width: "48px", height: "48px", borderRadius: "14px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path><path d="M9 11h.01M12 11h.01M15 11h.01"></path></svg></span>
<span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", color: "#A9AEBB" }}>Community</span><span style={{ fontSize: "18px", fontWeight: "700" }}>Join our Discord community</span></span>
</a>

<a href={st.linkedin_url || "/contact"} style={{ position: "relative", display: "flex", alignItems: "center", gap: "16px", color: "#FFFFFF", textDecoration: "none" }}>
<span aria-hidden="true" style={{ flex: "0 0 48px", width: "48px", height: "48px", borderRadius: "14px", background: "var(--accent)", color: "#0C0D10", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"></path></svg></span>
<span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", color: "#A9AEBB" }}>Social</span><span style={{ fontSize: "18px", fontWeight: "700" }}>Follow on LinkedIn</span></span>
</a>
</div>

<div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "24px", padding: "28px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "20px", fontWeight: "800", color: "#111318" }}>Before you write</h2>
<Link href="/insights" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 0", borderBottom: "1px solid #E5E7EB", color: "#111318", textDecoration: "none", fontSize: "16px", fontWeight: "600" }}>Browse the latest insights<span aria-hidden="true" style={{ color: "#8A5F00" }}>→</span></Link>
<Link href="/learn" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 0", color: "#111318", textDecoration: "none", fontSize: "16px", fontWeight: "600" }}>Explore trainings &amp; quizzes<span aria-hidden="true" style={{ color: "#8A5F00" }}>→</span></Link>
</div>
</aside>

</div>
</section>

{/* COMMUNITY BAND */}
<section style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF" }}>
<div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(86% 0, 96% 0, 82% 100%, 72% 100%)", pointerEvents: "none" }}></div>
<div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", maxWidth: "660px", display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Community</span>
<h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1.15" }}>Learn alongside other security and AI professionals</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#C7CCDA" }}>Join the Cyfiz Discord to ask questions, share what you’re working on and discuss new insights.</p>
</div>
<a href={st.discord_url || "/contact"} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "16px 28px", borderRadius: "999px", fontWeight: "700", fontSize: "17px" }}>Join the Discord<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
</div>
</section>

<SiteFooter />

</div>

    </>
  );
}
