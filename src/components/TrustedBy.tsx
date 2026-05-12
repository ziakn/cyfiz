import React from 'react';

export default function TrustedBy({ partners }: { partners: { name: string }[] }) {
  const logos = partners && partners.length > 0 ? partners : [
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

  // Double the logos for seamless infinite scrolling
  const allLogos = [...logos, ...logos];

  return (
    <section className="bg-white py-16 dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          Trusted by leading organizations worldwide
        </p>
      </div>

      <div className="relative flex overflow-hidden py-4">
        <div className="flex animate-scroll whitespace-nowrap gap-16 items-center">
          {allLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex items-center">
              {logo.image_url ? (
                <img src={logo.image_url} alt={logo.name} className="h-8 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
              ) : (
                <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase opacity-20 hover:opacity-100 transition-opacity cursor-default">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Gradients for smooth fade out at edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent"></div>
      </div>
    </section>
  );
}
