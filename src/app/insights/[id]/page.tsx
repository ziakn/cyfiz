import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { RowDataPacket } from "mysql2";
import Link from "next/link";

interface Article extends RowDataPacket {
    id: number;
    tag: string;
    date: string;
    title: string;
    excerpt: string;
    content?: string;
    read_time: string;
    image_url?: string | null;
}

async function getArticle(id: string) {
    const articles = await query<Article[]>(
        "SELECT id, tag, DATE_FORMAT(date, '%M %d, %Y') as date, title, excerpt, read_time, image_url FROM articles WHERE id = ? AND status = 1",
        [id]
    );
    return articles[0];
}

export default async function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const realId = id.split('-')[0];
    const article = await getArticle(realId);

    if (!article) {
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
                        <Link href="/insights" className="hover:text-zinc-900 dark:hover:text-zinc-50">Insights</Link>
                        <span>/</span>
                        <span className="text-zinc-900 dark:text-zinc-50">{article.tag}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-4xl font-black font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl leading-[1.1]">
                            {article.title}
                        </h1>
                        <div className="mt-8 flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">LW</div>
                                <span className="font-bold text-zinc-900 dark:text-zinc-50">Lewis Walker</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span>{article.date}</span>
                            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span>{article.read_time}</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {article.image_url && (
                        <div className="mb-12 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            <img 
                                src={article.image_url} 
                                alt={article.title} 
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-xl font-medium leading-relaxed text-zinc-600 dark:text-zinc-300 mb-8">
                            {article.excerpt}
                        </p>
                        
                        {/* Fallback if no content yet */}
                        <div className="space-y-6 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
                            <p>
                                Full analysis and deep dive content for this framework is currently being processed by our editorial team. 
                                We prioritize accuracy and depth in our reporting to ensure decision-makers receive the most reliable intelligence.
                            </p>
                            <p>
                                In the meantime, you can explore other research summaries or connect with our team for specific inquiries regarding {article.title}.
                            </p>
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <footer className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-8 text-center">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">Want more intelligence?</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Join 50,000+ professionals receiving our weekly 5-minute brief.</p>
                            <Link 
                                href="/connect"
                                className="inline-flex items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50 px-8 py-3 text-sm font-bold text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
                            >
                                Subscribe to Weekly Brief
                            </Link>
                        </div>
                    </footer>
                </article>
            </main>
            <Footer />
        </div>
    );
}
