import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 py-24 dark:bg-zinc-950">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-3">
          {/* Column 1: Branding & Philosophy */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50">Cyfiz.</span>
            </Link>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Explore what matters, uncover what others miss and use practical frameworks to build what comes next.
            </p>
            <div className="mt-8 flex gap-5">
              <Link href="#" className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </Link>
              <Link href="#" className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
              </Link>
              <Link href="#" className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Platform</h4>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-base font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
                Home
              </Link>
              <Link href="/insights" className="text-base font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
                Insights
              </Link>
              <Link href="/summaries" className="text-base font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
                Summaries
              </Link>
              <Link href="/learnings" className="text-base font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
                Learnings
              </Link>
              <Link href="/profile" className="text-base font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
                Who@m!
              </Link>
            </div>
          </div>

          {/* Column 3: Connect & Newsletter Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Connect</h4>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Have questions or suggestions? We would love to hear from you.
              </p>
              <Link href="mailto:hello@cyfiz.ai" className="text-base font-bold text-zinc-900 transition-colors hover:text-zinc-500 dark:text-zinc-50">
                hello@cyfiz.ai
              </Link>
              <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 transition-colors hover:gap-3 dark:text-zinc-50">
                Join our Discord community
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between border-t border-zinc-200 pt-10 dark:border-zinc-800 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              &copy; {new Date().getFullYear()} Cyfiz. All rights reserved.
            </p>
            <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Built with &hearts; for the next generation of AI builders.
            </p>
          </div>
          <div className="mt-6 flex gap-8 sm:mt-0">
            <Link href="/privacy" className="text-xs font-semibold text-zinc-400 transition-colors hover:text-black dark:text-zinc-600 dark:hover:text-white">
              Privacy policy
            </Link>
            <Link href="/terms" className="text-xs font-semibold text-zinc-400 transition-colors hover:text-black dark:text-zinc-600 dark:hover:text-white">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
