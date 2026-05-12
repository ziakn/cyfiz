import React from 'react';

interface StatItem {
  value: string;
  label: string;
}

export default function Stats({ stats }: { stats: StatItem[] }) {
  return (
    <section className="bg-white py-20 dark:bg-black">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-6xl font-black font-serif text-zinc-900 dark:text-zinc-50">{stat.value}</span>
              <span className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">{stat.label}</span>
            </div>
          ))}
          {stats.length === 0 && (
            <div className="flex flex-col items-center col-span-full">
              <span className="text-6xl font-black font-serif text-zinc-900 dark:text-zinc-50">8M+</span>
              <span className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Learners Globally</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
