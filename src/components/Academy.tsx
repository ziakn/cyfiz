import Link from 'next/link';

export default function Academy() {
  const courses = [
    {
      title: 'Claude Code for Everyone',
      description: 'Learn how to effectively build AI agents and vibe code with Claude Code',
      price: '$799.00',
      tag: 'LIVE COHORT',
      color: 'bg-orange-500',
      bgGradient: 'from-orange-500 to-orange-700',
    },
    {
      title: 'Building Effective AI Agents with n8n',
      description: 'Learn to build and deploy effective AI Agents with n8n.',
      price: 'Pro Membership',
      tag: null,
      color: 'bg-red-700',
      bgGradient: 'from-red-800 to-red-950',
    },
    {
      title: 'MCP for Everyone',
      description: 'A short, hands-on course to learn how to build and integrate MCP Servers.',
      price: 'Pro Membership',
      tag: null,
      color: 'bg-yellow-600',
      bgGradient: 'from-yellow-600 to-orange-600',
    },
  ];

  return (
    <section className="bg-zinc-50 py-32 dark:bg-zinc-950/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">DAIR.AI Academy</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Master AI with our expert-led courses
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-400">
            Dive into cutting-edge topics from machine learning fundamentals to advanced generative AI, taught by industry leaders.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900"
            >
              <div className={`relative h-48 w-full bg-gradient-to-br ${course.bgGradient} p-8 overflow-hidden`}>
                {course.tag && (
                  <div className="absolute top-2 right-0 bg-red-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-tighter">
                    {course.tag}
                  </div>
                )}
                <div className="flex h-full flex-col justify-end">
                  <h3 className="text-2xl font-black leading-tight text-white uppercase">
                    {course.title.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h3>
                </div>
                {/* Abstract decoration */}
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform group-hover:scale-150"></div>
              </div>
              
              <div className="flex flex-1 flex-col p-6">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{course.title}</h4>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {course.description}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{course.price}</span>
                  <Link
                    href="#"
                    className="rounded-lg border border-zinc-200 px-4 py-1.5 text-[10px] font-bold transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  >
                    Enroll
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
