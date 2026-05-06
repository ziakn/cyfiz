import React from 'react';

export default function Stats() {
  return (
    <section className="bg-white py-20 dark:bg-black">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-6xl font-black font-serif text-zinc-900 dark:text-zinc-50">8M+</span>
          <span className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Learners Globally</span>
        </div>
      </div>
    </section>
  );
}
