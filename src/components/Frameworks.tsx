import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface ArticleItem {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image_url?: string | null;
}

export default function Frameworks({ articles }: { articles: ArticleItem[] }) {

  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 mb-12">
          Latest Achieve Frameworks
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((fw, i) => (
            <Link 
              key={i} 
              href={`/insights/${fw.id}-${slugify(fw.title)}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Dark Header */}
              <div className="relative h-48 bg-[#003056] overflow-hidden group">
                {fw.image_url ? (
                  <img src={fw.image_url} alt={fw.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003056] via-transparent to-transparent opacity-60"></div>
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                  <div className="flex gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/80 backdrop-blur-md">
                      {fw.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight uppercase">
                    {fw.title}
                  </h3>
                </div>
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
                
                <h4 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2">
                  {fw.title}
                </h4>
                
                <div 
                  className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: fw.excerpt }}
                />
                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
