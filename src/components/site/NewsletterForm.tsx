"use client";

import { useState } from "react";
import { useSiteSettings } from "./SiteSettingsContext";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Weekly-briefing signup. `light` is the white card used on Home, `dark` is the
 * black band with the yellow slash used on Insights / Learn / article pages.
 */
export default function NewsletterForm({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const dark = variant === "dark";
  const { subscriber_label } = useSiteSettings();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "site" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
      setMessage(data.message || "You're subscribed.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const heading = "Stay informed where cybersecurity, privacy, and AI converge.";
  const sub = `Join ${subscriber_label} professionals receiving a weekly 5-minute briefing built for modern digital leaders.`;

  const field = (
    <>
      <label style={{ flex: dark ? "1 1 220px" : "1 1 260px", display: "flex", flexDirection: "column", gap: "6px", textAlign: "left", fontSize: "14px", fontWeight: 600, color: dark ? "#E2E4EA" : undefined }}>
        Work email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          style={dark
            ? { height: "52px", border: "1px solid #3A3D45", background: "#16181D", color: "#FFFFFF", borderRadius: "999px", padding: "0 20px", font: "inherit", fontWeight: 400 }
            : { height: "52px", border: "1px solid #CBD5E1", borderRadius: "999px", padding: "0 20px", font: "inherit", fontWeight: 400 }}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        style={{ flex: "0 0 auto", alignSelf: "flex-end", height: "52px", padding: dark ? "0 28px" : "0 30px", border: 0, borderRadius: "999px", background: "var(--accent)", color: "#0C0D10", font: "inherit", fontWeight: 700, fontSize: "16px", cursor: "pointer", opacity: status === "sending" ? 0.7 : 1 }}
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
    </>
  );

  const feedback = message ? (
    <p role="status" style={{ margin: 0, width: "100%", fontSize: "15px", fontWeight: 600, textAlign: dark ? "left" : "center", color: status === "error" ? "#F87171" : dark ? "var(--accent)" : "#166534" }}>{message}</p>
  ) : null;

  if (!dark) {
    return (
      <section id="newsletter" style={{ background: "#F8FAFC", color: "#111318" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px" }}>
          <form onSubmit={submit} style={{ maxWidth: "960px", margin: "0 auto", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "24px", padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center", boxSizing: "border-box" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A5F00" }}>Weekly briefing</span>
            <h2 style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "38px", lineHeight: 1.2, maxWidth: "720px" }}>{heading}</h2>
            <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.65, color: "#4B5160", maxWidth: "620px" }}>{sub}</p>
            <div style={{ width: "100%", maxWidth: "560px", display: "flex", flexWrap: "wrap", gap: "12px", paddingTop: "8px" }}>{field}{feedback}</div>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#0C0D10", color: "#FFFFFF" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #FFD54A 0%, #FFC21A 50%, #F2A900 100%)", clipPath: "polygon(88% 0, 97% 0, 84% 100%, 75% 100%)", pointerEvents: "none" }} />
      <form onSubmit={submit} style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px", boxSizing: "border-box" }}>
        <div style={{ flex: "1 1 480px", minWidth: 0, maxWidth: "620px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>Weekly briefing</span>
          <h2 style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "34px", lineHeight: 1.2 }}>{heading}</h2>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.6, color: "#C7CCDA" }}>{sub}</p>
        </div>
        <div style={{ flex: "1 1 380px", minWidth: 0, maxWidth: "460px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>{field}{feedback}</div>
      </form>
    </section>
  );
}
