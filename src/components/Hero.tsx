import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-24 pb-20 dark:bg-black sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 dark:opacity-10">
        <div className="h-[500px] w-[800px] bg-gradient-to-r from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-900 mask-radial"></div>
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <h1 className="animate-reveal text-4xl font-black font-serif tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
          Security, Privacy and AI Insights <br />
          <span className="text-zinc-500 text-3xl sm:text-5xl lg:text-6xl mt-4 block">You Can Actually Apply</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl animate-reveal [animation-delay:400ms] text-lg font-medium text-zinc-600 dark:text-zinc-400 sm:text-xl">
          Explore practical frameworks, expert toolkits, podcast discussions and research paper summaries designed for modern professionals and technology leaders.
        </p>

        <div className="mt-10 flex animate-reveal [animation-delay:600ms] justify-center gap-4">
          <Link
            href="/academy"
            className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Explore Academy
          </Link>
        </div>
      </div>
    </section>
  );
}
