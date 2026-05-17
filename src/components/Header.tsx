"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/insights", label: "Insights" },
  { href: "/summaries", label: "Summaries" },
  { href: "/quiz", label: "Quiz" },
  { href: "/profile", label: "Who@m!" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src="/logo-transparent.png" alt="Cyfiz Logo" className="h-16 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center border-l border-zinc-200 ml-2 pl-6 dark:border-zinc-800 md:flex">
          <span aria-label="Account" className="rounded-full border border-zinc-200 bg-zinc-100 p-2 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6m0 0l-3-3m3 3l-3 3" />
            </svg>
          </span>
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="rounded-md p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-navigation" className="border-t border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-black md:hidden">
          <div className="container mx-auto flex max-w-7xl flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
