import React from 'react';
import Image from 'next/image';

export default function Frameworks() {
  const frameworks = [
    {
      headerTitle: 'GOOGLE CLOUD CEO KEYNOTE PREVIEW',
      date: 'Apr 22, 2026',
      title: 'What Google Cloud CEO told Enterprise AI Executive',
      description: "Plus, blockchain-AI convergence, OpenAI's jobs framework, and more.",
      author: 'Lewis Walker',
      tags: ['Generative AI', '+4'],
    },
    {
      headerTitle: 'CLAUDE MYTHOS DEFENSE PLAN',
      date: 'Apr 15, 2026',
      title: 'Claude Mythos attacks: Executives\' 11-point defense plan',
      description: 'Plus, Stanford\'s AI Index, board AI principles, and more.',
      author: 'Lewis Walker',
      tags: ['Generative AI', '+4'],
    },
    {
      headerTitle: 'ENTERPRISE AI INFRASTRUCTURE',
      date: 'Apr 01, 2026',
      title: 'Deloitte\'s inaugural 515-leader AI survey',
      description: 'Plus, Accenture-Wharton co-intelligence, agentic AIOps, and more.',
      author: 'Lewis Walker',
      tags: ['Generative AI', '+4'],
    },
  ];

  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 mb-12">
          Latest Achieve Frameworks
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {frameworks.map((fw, i) => (
            <div key={i} className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              {/* Dark Header */}
              <div className="relative h-48 bg-[#003056] p-6 flex flex-col justify-between">
                <div className="flex gap-2">
                  {fw.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/80 backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-black text-white leading-tight">
                  {fw.headerTitle}
                </h3>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <span>{fw.date}</span>
                  <button className="text-zinc-400 hover:text-red-500 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                
                <h4 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
                  {fw.title}
                </h4>
                
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {fw.description}
                </p>
                
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] font-bold">LW</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {fw.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
