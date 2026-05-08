import React from 'react';

export default function PreFooter() {
  return (
    <section className="bg-white py-24 dark:bg-black">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Stay informed where cybersecurity, <br className="hidden sm:block" />
              privacy, and AI converge.
            </h2>
            <p className="mt-6 text-lg font-medium text-zinc-600 dark:text-zinc-400">
              Join 1,000+ professionals receiving a weekly 5-minute <br className="hidden sm:block" />
              briefing built for modern digital leaders.
            </p>
          </div>

          <div className="w-full max-w-md overflow-hidden rounded-xl bg-[#003056] p-8 shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="relative flex items-center rounded-lg bg-white p-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm text-zinc-900 focus:outline-none"
                />
                <button className="rounded-md bg-[#003056] px-6 py-2 text-sm font-bold text-white transition-all hover:bg-[#002540]">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
