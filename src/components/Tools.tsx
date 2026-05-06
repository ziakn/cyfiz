import Link from 'next/link';

export default function Tools() {
  const tools = [
    {
      title: 'Prompt Engineering Guide',
      description: 'Comprehensive guide covering prompting techniques, AI agents, and context engineering for LLMs.',
      icon: (
        <div className="h-full w-full bg-zinc-900 p-4 font-mono text-[10px] text-zinc-400 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="ml-2 text-zinc-600">Prompt Engineering Guide</span>
          </div>
          <p className="text-zinc-500"># System Prompt</p>
          <p className="mt-1 text-white">You are a helpful assistant...</p>
          <p className="mt-2 text-zinc-500"># Few-shot examples</p>
          <p className="mt-1">Input: Translate 'Hello'</p>
          <p>Output: Hola</p>
          <div className="mt-4 rounded bg-zinc-800 p-2 text-zinc-300">
            Current Agent: Reasoning Engine
          </div>
        </div>
      ),
    },
    {
      title: 'Paper Lens',
      description: 'Chat with research papers, analyze figures, and generate annotated diagrams with AI.',
      icon: (
        <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900 p-4 flex flex-col gap-3 overflow-hidden">
          <div className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-800 rounded"></div>
          <div className="flex gap-2">
            <div className="h-20 w-1/2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded p-2">
              <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700 mb-1"></div>
              <div className="h-1 w-3/4 bg-zinc-200 dark:bg-zinc-700 mb-1"></div>
              <div className="h-8 w-full bg-indigo-100 dark:bg-indigo-900/30 rounded mt-2"></div>
            </div>
            <div className="h-20 w-1/2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-300 dark:text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center px-3">
            <div className="h-2 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      title: 'M2 Deep Research',
      description: 'Multi-agent research system with planning, web search, and synthesis powered by Minimax M2.',
      icon: (
        <div className="h-full w-full bg-zinc-900 p-4 font-mono text-[8px] text-zinc-500 overflow-hidden flex flex-col items-center justify-center">
          <div className="border border-zinc-700 p-2 rounded text-center w-full mb-4">
             Supervisor Agent<br/>(Minimax M2 + Interleaved Thinking)
          </div>
          <div className="flex gap-4 items-center">
             <div className="border border-dashed border-zinc-700 p-1">Planning</div>
             <div className="text-zinc-700">| |</div>
             <div className="border border-dashed border-zinc-700 p-1">Web Search</div>
             <div className="text-zinc-700">| |</div>
             <div className="border border-dashed border-zinc-700 p-1">Synthesis</div>
          </div>
          <div className="mt-4 text-[6px] text-zinc-600">RESEARCH_LOG: Found 12 relevant papers...</div>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-white py-32 dark:bg-black">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Our AI Tools</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl text-balance">
            Innovate faster with powerful AI solutions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
            Leverage our suite of AI-powered tools designed to streamline your development workflow and enhance productivity.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <div className="h-48 w-full border-b border-zinc-100 dark:border-zinc-800">
                {tool.icon}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{tool.title}</h4>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {tool.description}
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href="#"
                    className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50 hover:underline flex items-center gap-1"
                  >
                    Try it
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                       <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
