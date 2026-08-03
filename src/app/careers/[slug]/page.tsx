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
    <div className="flex min-h-screen flex-col bg-[#F4F5FA] font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#9155FD] to-[#3A3541] px-6 py-16 sm:px-12 sm:py-24">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="relative mx-auto max-w-4xl text-center">
            <Link href="/careers" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white opacity-80 hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Careers
            </Link>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="rounded-full bg-white bg-opacity-20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {career.department || "General"}
              </span>
              <span className="text-sm font-medium text-white opacity-80">
                {career.type}
              </span>
            </div>
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {career.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white opacity-80">
              <div className="flex items-center gap-2 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {career.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {career.salary_range || "Competitive Salary"}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-12">
          <div className="rounded-2xl border border-[#3A3541] border-opacity-10 bg-white p-8 shadow-sm sm:p-12">
            
            <h2 className="mb-6 text-2xl font-bold text-[#3A3541]">Job Description</h2>
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-[#3A3541] opacity-80 mb-12"
              dangerouslySetInnerHTML={{ __html: career.description }}
            />

            {career.requirements && (
              <>
                <h2 className="mb-6 text-2xl font-bold text-[#3A3541]">Requirements</h2>
                <div 
                  className="prose prose-sm sm:prose-base max-w-none text-[#3A3541] opacity-80 mb-12"
                  dangerouslySetInnerHTML={{ __html: career.requirements }}
                />
              </>
            )}

            <div className="mt-12 flex flex-col items-center justify-center border-t border-[#3A3541] border-opacity-10 pt-12 text-center">
              <h3 className="mb-4 text-xl font-bold text-[#3A3541]">Ready to make an impact?</h3>
              {career.apply_url ? (
                <Link 
                  href={career.apply_url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#9155FD] px-8 py-4 text-lg font-bold text-white shadow-md transition-all hover:bg-[#804BDF] hover:shadow-lg hover:-translate-y-1"
                >
                  Apply for this position
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              ) : (
                <div className="rounded-lg bg-gray-50 px-6 py-4 text-sm text-[#3A3541] opacity-60">
                  Application instructions are not currently available online. Please contact our HR department.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
