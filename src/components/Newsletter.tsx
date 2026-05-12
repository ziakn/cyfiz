import React from 'react';

export default function Newsletter({
  title = "Join the conversation",
  description = "Stay informed where cybersecurity, privacy, and AI converge."
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950/50">
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-6 text-lg font-medium text-zinc-600 dark:text-zinc-400">
          {description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-sm rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          />
          <button className="w-full rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:w-auto">
            Subscribe
          </button>
        </div>

        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
          Join 1,000+ professionals. No spam, ever.
        </p>
      </div>
    </section>
  );
}
