import Link from "next/link";

export type SiteNavKey = "home" | "insights" | "learn" | "profile" | "contact";

const links: { key: SiteNavKey; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "insights", href: "/insights", label: "Insights" },
  { key: "learn", href: "/learn", label: "Learn" },
  { key: "profile", href: "/profile", label: "Who@m!" },
];

export default function SiteNav({ active }: { active: SiteNavKey }) {
  return (
    <nav style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "26px 40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", boxSizing: "border-box" }}>
      <Link href="/" aria-label="Cyfiz home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-transparent.png" alt="Cyfiz" style={{ height: "52px", width: "auto", display: "block" }} />
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "36px", fontSize: "19px", fontWeight: 500, letterSpacing: "0.02em" }}>
        {links.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            aria-current={active === l.key ? "page" : undefined}
            style={
              active === l.key
                ? { color: "#FFFFFF", textDecoration: "underline", textDecorationColor: "var(--accent)", textDecorationThickness: "3px", textUnderlineOffset: "10px" }
                : { color: "#FFFFFF", textDecoration: "none" }
            }
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          aria-current={active === "contact" ? "page" : undefined}
          style={{ background: "var(--accent)", color: "#0C0D10", textDecoration: "none", padding: "6px 12px 6px 14px", borderRadius: "999px", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}
        >
          Contact
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
    </nav>
  );
}
