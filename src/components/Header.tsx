import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black dark:bg-white">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="h-2 w-2 rounded-full bg-white dark:bg-black"></div>
              <div className="h-2 w-2 rounded-full bg-white dark:bg-black"></div>
              <div className="h-2 w-2 rounded-full bg-white dark:bg-black"></div>
              <div className="h-2 w-2 rounded-full bg-white dark:bg-black"></div>
            </div>
          </div>
          <span className="text-xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50">Cyfiz.</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          <Link href="/" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Home
          </Link>
          <Link href="/insights" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Insights
          </Link>
          <Link href="/summaries" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Summaries
          </Link>
          <Link href="/quiz" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Quiz
          </Link>
          <Link href="/profile" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Who@m!
          </Link>
          <Link href="/connect" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Connect
          </Link>
        </nav>

        <div className="flex items-center gap-4 border-l border-zinc-200 ml-2 pl-6 dark:border-zinc-800">
          <Link href="/admin" aria-label="Admin login" className="hidden rounded-full border border-zinc-200 bg-zinc-100 p-2 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white md:flex md:items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6m0 0l-3-3m3 3l-3 3" />
            </svg>
          </Link>
          <button className="text-zinc-600 dark:text-zinc-400 md:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="flex md:hidden">
          <button className="text-zinc-600 dark:text-zinc-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
