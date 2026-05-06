import React from 'react';

export default function TrustedBy() {
  const logos = [
    { name: 'Google' },
    { name: 'Meta' },
    { name: 'Apple' },
    { name: 'OpenAI' },
    { name: 'Salesforce' },
    { name: 'Intel' },
    { name: 'Nvidia' },
    { name: 'Samsung' },
    { name: 'Airbnb' },
    { name: 'Stripe' },
    { name: 'Pinterest' },
    { name: 'Dropbox' },
    { name: 'Atlassian' },
  ];

  return (
    <section className="bg-white py-20 dark:bg-black">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          Trusted by leading organizations worldwide
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-30 grayscale transition-all hover:opacity-80 hover:grayscale-0">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
