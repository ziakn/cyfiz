"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

interface Social {
  name: string;
  handle: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  cta: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  image_url?: string | null;
}

interface Stats {
  value: string;
  label: string;
}

interface ConnectData {
  socials: Social[];
  team: TeamMember[];
  stats: Stats[];
}

export default function ConnectPage() {
  const [connectData, setConnectData] = useState<ConnectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConnectData() {
      try {
        const response = await fetch("/api/connect");
        if (!response.ok) throw new Error("Failed to fetch connect data");
        const data = await response.json();
        setConnectData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load connect data");
      } finally {
        setLoading(false);
      }
    }

    fetchConnectData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-zinc-500">Loading connect data...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !connectData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error: {error || "Failed to load connect data"}</div>
        </main>
        <Footer />
      </div>
    );
  }

  const { socials, team, stats } = connectData;

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
            <ContactForm />
          </div>
        </section>

        {/* Team */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">The Team</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#001D33] to-[#003056] text-sm font-black text-white overflow-hidden">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      member.initials
                    )}
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
                {stats.map((s) => (
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
