import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zia Muhammad — AI & Cybersecurity Professional",
  description: "Resume and portfolio of Zia Muhammad — AI security researcher, privacy advocate, and founder of Cyfiz.",
};

const experience = [
  {
    company: "Cyfiz",
    role: "Founder & Editor-in-Chief",
    period: "2024 — Present",
    location: "Remote",
    bullets: [
      "Built a cybersecurity & AI intelligence platform reaching 50,000+ monthly readers.",
      "Curates weekly briefings distilling research papers, policy changes, and threat intelligence.",
      "Leads a distributed team of researchers, writers, and engineers.",
    ],
  },
  {
    company: "DAIR.AI",
    role: "AI Research Contributor",
    period: "2023 — Present",
    location: "Remote",
    bullets: [
      "Contributed to open-source AI safety and alignment research initiatives.",
      "Co-authored accessible technical summaries of frontier model research.",
      "Helped grow the community to 200k+ members across platforms.",
    ],
  },
  {
    company: "Independent Consultant",
    role: "AI & Cybersecurity Advisor",
    period: "2022 — Present",
    location: "Remote",
    bullets: [
      "Advises organisations on AI risk management frameworks and regulatory compliance.",
      "Designed threat models for LLM-powered enterprise systems.",
      "Delivered workshops on privacy-preserving ML and EU AI Act readiness.",
    ],
  },
];

const skills = [
  { category: "AI & ML", items: ["LLM Security", "AI Red Teaming", "Prompt Engineering", "AI Agents", "Privacy-Preserving ML"] },
  { category: "Cybersecurity", items: ["Threat Modeling", "Zero-Trust Architecture", "Penetration Testing", "SOC Operations", "Incident Response"] },
  { category: "Privacy & Policy", items: ["EU AI Act", "GDPR", "NIST AI RMF", "Data Governance", "Risk Assessment"] },
  { category: "Engineering", items: ["Next.js", "TypeScript", "Python", "Node.js", "AWS / GCP"] },
];

const projects = [
  {
    name: "Cyfiz Platform",
    description: "Full-stack intelligence platform for AI and cybersecurity professionals. Built with Next.js, featuring curated briefings, research summaries, weekly quizzes, and a course academy.",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    href: "/",
  },
  {
    name: "LLM Security Audit Framework",
    description: "Open-source methodology for auditing large language model deployments in enterprise environments. Covers prompt injection, data leakage, and model inversion attacks.",
    tags: ["Python", "AI Security", "Open Source"],
    href: "#",
  },
  {
    name: "EU AI Act Compliance Toolkit",
    description: "A practical checklist and assessment tool helping organisations map their AI systems to EU AI Act risk categories and compliance requirements.",
    tags: ["AI Policy", "Risk Management"],
    href: "#",
  },
];

const education = [
  {
    institution: "University of [Your University]",
    degree: "BSc Computer Science",
    period: "2018 — 2022",
    detail: "Specialisation in Information Security. Dissertation on adversarial machine learning.",
  },
];

const certifications = [
  "CISSP — Certified Information Systems Security Professional",
  "CEH — Certified Ethical Hacker",
  "AWS Certified Security — Specialty",
  "Google Professional Cloud Security Engineer",
];

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="bg-white px-4 pt-24 pb-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">

              {/* Left: identity */}
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Portfolio · Resume</p>
                <h1 className="mt-3 text-5xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl leading-[1.05]">
                  Zia<br />Muhammad.
                </h1>
                <p className="mt-2 text-lg font-semibold text-zinc-500 dark:text-zinc-400">
                  AI Security Researcher · Privacy Advocate · Builder
                </p>
                <p className="mt-5 max-w-xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  I research the intersection of artificial intelligence, cybersecurity, and privacy. I founded Cyfiz to make frontier security intelligence accessible to every practitioner — not just those in elite institutions.
                </p>

                {/* Social links */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/ziakn" },
                    { label: "LinkedIn", href: "#" },
                    { label: "X / Twitter", href: "#" },
                    { label: "Email", href: "mailto:zia@cyfiz.com" },
                  ].map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-bold text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
                    >
                      {s.label} ↗
                    </Link>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-zinc-700 hover:scale-105 active:scale-95 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download CV / Résumé
                  </a>
                </div>
              </div>

              {/* Right: stat card */}
              <div className="w-full max-w-xs shrink-0">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003056] p-8 shadow-2xl">
                  <div className="space-y-5">
                    {[
                      { value: "3+", label: "Years in AI Security" },
                      { value: "50k+", label: "Platform Readers" },
                      { value: "8M+", label: "Content Impressions" },
                      { value: "4", label: "Certifications" },
                    ].map((stat) => (
                      <div key={stat.label} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                        <div className="text-3xl font-black font-serif text-white">{stat.value}</div>
                        <div className="mt-0.5 text-xs font-semibold text-white/50 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Experience</h2>
            <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Work History</h3>

            <div className="mt-10 space-y-6">
              {experience.map((job, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#001D33] to-[#003056] text-xs font-black text-white">
                          {job.company.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-black text-zinc-900 dark:text-zinc-50">{job.company}</div>
                          <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{job.role}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{job.period}</div>
                      <div className="text-xs text-zinc-400">{job.location}</div>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Expertise</h2>
            <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Skills & Tools</h3>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((group) => (
                <div key={group.category} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{group.category}</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Work</h2>
            <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Featured Projects</h3>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.map((project, i) => (
                <Link
                  key={i}
                  href={project.href}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#001D33] to-[#003056] text-white">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <svg className="h-4 w-4 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="mt-4 font-black font-serif text-zinc-900 dark:text-zinc-50 text-lg">{project.name}</h4>
                  <p className="mt-2 flex-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION & CERTS ── */}
        <section className="bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2">

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Background</h2>
              <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Education</h3>
              <div className="mt-8 space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="font-black text-zinc-900 dark:text-zinc-50">{edu.institution}</div>
                    <div className="mt-0.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400">{edu.degree}</div>
                    <div className="mt-0.5 text-xs text-zinc-400">{edu.period}</div>
                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{edu.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Credentials</h2>
              <h3 className="mt-2 text-3xl font-black font-serif text-zinc-900 dark:text-zinc-50">Certifications</h3>
              <div className="mt-8 space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#001D33] text-xs font-black text-white">
                      ✓
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-zinc-50 px-4 py-20 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003056] p-10 text-center shadow-2xl">
            <h2 className="text-2xl font-black font-serif text-white sm:text-3xl">Let&apos;s work together</h2>
            <p className="mt-3 text-white/60">
              Open to advisory roles, speaking engagements, research collaborations, and consulting projects in AI security and privacy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/connect"
                className="rounded-full bg-white px-8 py-3 text-sm font-black text-[#001D33] transition-all hover:bg-zinc-100 hover:scale-105 shadow-lg"
              >
                Get in Touch →
              </Link>
              <a
                href="#"
                className="rounded-full border border-white/30 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Download CV
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
