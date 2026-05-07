import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect — Cyfiz",
  description: "Connect with the Cyfiz community, follow us on socials, join our Discord, or get in touch directly.",
};

const socials = [
  {
    name: "X / Twitter",
    handle: "@cyfiz_ai",
    description: "Daily threads on AI security, privacy regulations, and emerging research. 48k followers.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
    href: "#",
    cta: "Follow on X",
  },
  {
    name: "LinkedIn",
    handle: "Cyfiz AI",
    description: "Professional updates, keynote recaps, and curated industry news for security and AI leaders.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    href: "#",
    cta: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    handle: "cyfiz-ai",
    description: "Open-source tools, research notebooks, and code from our AI security and privacy projects.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    href: "#",
    cta: "View Repositories",
  },
  {
    name: "Discord",
    handle: "Cyfiz Community",
    description: "Join 12,000+ members discussing AI, cybersecurity, and privacy in real-time. AMAs every week.",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.03.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    href: "#",
    cta: "Join Server",
  },
];

const team = [
  { initials: "LW", name: "Lewis Walker", role: "Founder & Editor-in-Chief" },
  { initials: "SK", name: "Sarah Kim", role: "AI Security Researcher" },
  { initials: "MA", name: "Mohammed Al-Rashid", role: "Privacy & Compliance Lead" },
];

export default function ConnectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-white px-4 pt-24 pb-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Connect</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl leading-[1.1]">
              Join the conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-zinc-600 dark:text-zinc-400">
              A global community of security practitioners, AI researchers, and privacy advocates. Find us wherever you are.
            </p>
          </div>
        </section>

        {/* Social Cards */}
        <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((social) => (
              <div key={social.name} className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 transition-colors group-hover:bg-[#001D33] group-hover:text-white">
                    {social.icon}
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">{social.name}</div>
                    <div className="text-xs text-zinc-400">{social.handle}</div>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm text-zinc-500 dark:text-zinc-400">{social.description}</p>
                <Link
                  href={social.href}
                  className="mt-6 block rounded-full border border-zinc-200 py-2 text-center text-xs font-bold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {social.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Get in Touch</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              Press enquiries, partnership opportunities, or just want to say hello.
            </p>
            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-zinc-900 px-10 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Send Message →
              </button>
            </form>
          </div>
        </section>

        {/* Team */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">The Team</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#001D33] to-[#003056] text-sm font-black text-white">
                    {member.initials}
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">{member.name}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Global reach */}
            <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 text-center">
              <h3 className="text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50">Global Reach</h3>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm">Readers across 140+ countries. Trusted by professionals at leading organisations worldwide.</p>
              <div className="mt-6 flex justify-center gap-8">
                {[
                  { value: "140+", label: "Countries" },
                  { value: "50k+", label: "Subscribers" },
                  { value: "8M+", label: "Monthly Readers" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black font-serif text-zinc-900 dark:text-zinc-50">{s.value}</div>
                    <div className="text-xs text-zinc-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
