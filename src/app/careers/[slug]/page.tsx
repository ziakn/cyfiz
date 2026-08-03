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
    <div className="dark flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-50 selection:bg-[#9155FD] selection:text-white">
      <Header />
      
      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:px-12 sm:pt-40 lg:pb-32">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-1/2 -z-10 -ml-[50%] w-full -translate-x-1/2 blur-[120px] md:blur-[150px]">
            <div className="mx-auto h-[400px] w-[800px] rounded-full bg-gradient-to-b from-[#9155FD]/40 to-transparent"></div>
          </div>
          <div className="absolute inset-0 -z-20 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03]"></div>
          
          <div className="relative mx-auto max-w-5xl">
            <Link href="/careers" className="group mb-12 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-400 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-zinc-200 hover:shadow-[0_0_20px_rgba(145,85,253,0.15)]">
              <svg className="transition-transform group-hover:-translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to all roles
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="rounded-full border border-[#9155FD]/30 bg-[#9155FD]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#9155FD] shadow-[0_0_15px_rgba(145,85,253,0.2)]">
                {career.department || "General"}
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {career.type}
              </span>
            </div>
            
            <h1 className="mb-6 bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl">
              {career.title}
            </h1>
            
            <h2 className="mb-10 flex items-center gap-3 text-2xl font-medium text-zinc-300 sm:text-3xl">
              <span className="h-px w-12 bg-gradient-to-r from-[#9155FD] to-transparent sm:hidden"></span>
              {career.company_name || "Cyfiz"}
            </h2>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-zinc-400">
              <div className="flex items-center gap-2.5 text-base">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#9155FD]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                {career.location}
              </div>
              {career.salary_range && (
                <div className="flex items-center gap-2.5 text-base">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#9155FD]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  {career.salary_range}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 sm:px-12 lg:pb-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Main Content */}
            <div className="space-y-12">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                  <div className="h-8 w-1 rounded-full bg-[#9155FD]"></div>
                  About the Role
                </h3>
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-a:text-[#9155FD] hover:prose-a:text-[#804BDF] prose-strong:text-white prose-li:text-zinc-300 text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: career.description }}
                />
              </div>

              {career.requirements && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                  <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold text-white">
                    <div className="h-8 w-1 rounded-full bg-[#9155FD]"></div>
                    What We're Looking For
                  </h3>
                  <div 
                    className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-a:text-[#9155FD] hover:prose-a:text-[#804BDF] prose-strong:text-white prose-li:text-zinc-300 text-zinc-300"
                    dangerouslySetInnerHTML={{ __html: career.requirements }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar Sticky CTA */}
            <div className="relative">
              <div className="sticky top-32 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 shadow-2xl">
                <h3 className="mb-2 text-xl font-bold text-white">Ready to Apply?</h3>
                <p className="mb-8 text-sm text-zinc-400">Join {career.company_name || "us"} and help shape the future.</p>
                
                {career.apply_url ? (
                  <Link 
                    href={career.apply_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#9155FD] px-6 py-4 font-bold text-white transition-all hover:bg-[#804BDF]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Apply Now
                      <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]"></div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-4 text-center text-sm text-zinc-500">
                    Online applications are closed.
                  </div>
                )}
                
                <hr className="my-8 border-zinc-800" />
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Job Type</span>
                    <span className="font-medium text-zinc-300">{career.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Location</span>
                    <span className="font-medium text-zinc-300">{career.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
