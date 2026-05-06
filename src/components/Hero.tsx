import Link from 'next/link';

export default function Hero() {
  const logos = [
    { name: 'Google', icon: 'G' },
    { name: 'Meta', icon: 'M' },
    { name: 'Apple', icon: 'A' },
    { name: 'OpenAI', icon: 'O' },
    { name: 'Salesforce', icon: 'S' },
    { name: 'Intel', icon: 'I' },
    { name: 'Nvidia', icon: 'N' },
    { name: 'Samsung', icon: 'S' },
    { name: 'Airbnb', icon: 'A' },
    { name: 'Stripe', icon: 'S' },
    { name: 'Pinterest', icon: 'P' },
    { name: 'Dropbox', icon: 'D' },
    { name: 'Atlassian', icon: 'A' },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 pt-20 pb-32 dark:bg-black sm:px-6 lg:px-8">
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

        <div className="mt-20 animate-reveal [animation-delay:800ms]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            Trusted by leading organizations worldwide
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-40 grayscale transition-all hover:opacity-80 hover:grayscale-0">
            {logos.map((logo) => (
              <div key={logo.name} className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex animate-reveal [animation-delay:1000ms] flex-col items-center">
          <span className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">8M+</span>
          <span className="mt-2 text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Learners</span>
        </div>
      </div>
    </section>
  );
}
