"use client";

import Link from "next/link";
import { useSiteSettings } from "./SiteSettingsContext";

const linkStyle = { color: "#CBD5E1", textDecoration: "none" } as const;
const legalStyle = { color: "#94A3B8", textDecoration: "none" } as const;

export default function SiteFooter() {
  const st = useSiteSettings();
  const socials = [
    { label: "LinkedIn", href: st.linkedin_url },
    { label: "X", href: st.x_url },
    { label: "YouTube", href: st.youtube_url },
    { label: "Discord", href: st.discord_url },
  ].filter((x) => x.href);
  return (
    <footer style={{ background: "#0C0D10", color: "#CBD5E1", borderTop: "1px solid #23262C" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 32px", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <div style={{ flex: "2 1 300px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link href="/" aria-label="Cyfiz home" style={{ display: "flex", alignSelf: "flex-start", textDecoration: "none" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-cyfiz.png" alt="Cyfiz" style={{ height: "44px", width: "auto", display: "block" }} />
            </Link>
            <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, maxWidth: "360px" }}>Explore what matters, uncover what others miss and use practical frameworks to build what comes next.</p>
          </div>
          <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "15px", color: "#FFFFFF" }}>Platform</h3>
            <Link href="/" style={linkStyle}>Home</Link>
            <Link href="/insights" style={linkStyle}>Insights</Link>
            <Link href="/learn" style={linkStyle}>Learn</Link>
            <Link href="/packages" style={linkStyle}>Packages</Link>
            <Link href="/profile" style={linkStyle}>Who@m!</Link>
            <Link href="/contact" style={linkStyle}>Contact</Link>
          </div>
          <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px", lineHeight: 1.5 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "15px", color: "#FFFFFF" }}>Connect</h3>
            <span>Have questions or suggestions? We would love to hear from you.</span>
            <a href={`mailto:${st.contact_email}`} style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>{st.contact_email}</a>
            {socials.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", paddingTop: "6px" }}>
                {socials.map((x) => (<a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{x.label}</a>))}
              </div>
            )}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #23262C", paddingTop: "24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", fontSize: "14px", color: "#94A3B8" }}>
          <span>© {new Date().getFullYear()} Cyfiz. All rights reserved. Built with ♥ for the next generation of AI builders.</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <a href="https://cyfiz.com/privacy" style={legalStyle}>Privacy policy</a>
            <Link href="/cookie-policy" style={legalStyle}>Cookie policy</Link>
            <a href="https://cyfiz.com/terms" style={legalStyle}>Terms of use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
