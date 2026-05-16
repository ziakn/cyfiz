import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";

interface Summary extends RowDataPacket {
    id: number;
    tag: string;
    date: string;
    title: string;
    excerpt: string;
    read_time: string;
    source: string;
    citations: number;
    image_url?: string | null;
}

async function getSummary(id: string) {
    const summaries = await query<Summary[]>(
        "SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time, source, citations, image_url FROM research_summaries WHERE id = ? AND status = 1",
        [id]
    );
    return summaries[0];
}

export default async function SummaryDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const realId = id.split('-')[0];
    const summary = await getSummary(realId);

    if (!summary) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
            <Header />
            <main className="flex-1 pt-24 pb-20">
                <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">Home</Link>
                        <span>/</span>
                        <Link href="/summaries" className="hover:text-zinc-900 dark:hover:text-zinc-50">Summaries</Link>
                        <span>/</span>
                        <span className="text-zinc-900 dark:text-zinc-50">{summary.tag}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-4xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl leading-[1.1]">
                            {summary.title}
                        </h1>
                        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-zinc-900 dark:text-zinc-50">Source:</span>
                                <span>{summary.source}</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span>{summary.date}</span>
                            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span>{summary.read_time}</span>
                            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span>{summary.citations} Citations</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {summary.image_url && (
                        <div className="mb-12 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            <img 
                                src={summary.image_url} 
                                alt={summary.title} 
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 p-8 border-l-4 border-zinc-900 dark:border-zinc-50 mb-12">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 mt-0">Research Excerpt</h2>
                            <p className="text-lg italic text-zinc-700 dark:text-zinc-300 mb-0">
                                "{summary.excerpt}"
                            </p>
                        </div>
                        
                        <div className="space-y-6 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
                            <p>
                                This research paper summary is currently being expanded. Our research team distill complex academic findings 
                                into 5-minute actionable briefings for cybersecurity and AI practitioners.
                            </p>
                            <p>
                                We analyze methodology, key findings, and practical implications for current system architectures. 
                                Full briefing for "{summary.title}" will be available shortly.
                            </p>
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <footer className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="rounded-2xl bg-gradient-to-br from-[#001D33] to-[#003A60] p-10 text-center text-white">
                            <h3 className="text-xl font-black font-serif mb-2">Get Research Briefings Weekly</h3>
                            <p className="text-white/60 mb-8 max-w-md mx-auto">Join 5,000+ practitioners who read Cyfiz research summaries every Monday.</p>
                            <Link 
                                href="/connect"
                                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#001D33] hover:bg-white/90 transition-colors"
                            >
                                Subscribe to Briefings
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>
            <Footer />
        </div>
    );
}
