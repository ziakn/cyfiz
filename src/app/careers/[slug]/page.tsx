import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CareerItem } from "../page";

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const careers = (await query<RowDataPacket[]>(
    "SELECT * FROM careers WHERE slug = ? AND status = 1 LIMIT 1",
    [slug]
  )) as CareerItem[];

  if (!careers || careers.length === 0) {
    notFound();
  }

  const career = careers[0];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Header />
      
      <main className="flex-1">
        {/* Simple Full Width Header */}
        <section className="w-full bg-zinc-50 border-b border-zinc-200 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/careers" className="mb-8 inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              &larr; Back to careers
            </Link>
            
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl mb-3">
                  {career.title}
                </h1>
                <p className="text-xl text-zinc-600">
                  {career.company_name || "Cyfiz"} &bull; {career.department || "General"}
                </p>
                <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {career.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    {career.type}
                  </span>
                  {career.salary_range && (
                    <span className="flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                      {career.salary_range}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                {career.apply_url ? (
                  <Link 
                    href={career.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full md:w-auto items-center justify-center rounded-md bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <span className="inline-flex w-full md:w-auto items-center justify-center rounded-md bg-zinc-100 px-8 py-3.5 text-sm font-semibold text-zinc-500">
                    Applications Closed
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Plain Content */}
        <section className="w-full py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">About the Role</h2>
            <div 
              className="prose prose-zinc max-w-none prose-p:leading-relaxed prose-a:text-[#9155FD] hover:prose-a:underline mb-12"
              dangerouslySetInnerHTML={{ __html: career.description }}
            />

            {career.requirements && (
              <>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Requirements</h2>
                <div 
                  className="prose prose-zinc max-w-none prose-p:leading-relaxed prose-a:text-[#9155FD] hover:prose-a:underline mb-16"
                  dangerouslySetInnerHTML={{ __html: career.requirements }}
                />
              </>
            )}

            <div className="border-t border-zinc-200 pt-12 mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">Ready to Apply?</h2>
              {career.apply_url ? (
                <Link 
                  href={career.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Apply Now
                </Link>
              ) : (
                <p className="text-zinc-500">Applications are currently closed for this position.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
