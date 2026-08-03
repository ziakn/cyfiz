import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface CareerItem {
  id: number;
  title: string;
  slug: string;
  company_name: string | null;
  department: string | null;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  salary_range: string | null;
  apply_url: string | null;
}

export default async function CareersPage() {
  const careers = (await query<RowDataPacket[]>(
    "SELECT * FROM careers WHERE status = 1 ORDER BY created_at DESC"
  )) as CareerItem[];

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F5FA] font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#9155FD] to-[#3A3541] px-6 py-24 text-center sm:px-12 sm:py-32">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="relative mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Join Our Mission
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white opacity-80 sm:text-xl">
              Help us shape the future of AI governance and cybersecurity. We are looking for passionate individuals to join our growing team.
            </p>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-12">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#3A3541]">Open Positions</h2>
            <span className="rounded-full bg-[#9155FD] bg-opacity-10 px-4 py-1 text-sm font-semibold text-[#9155FD]">
              {careers.length} Jobs Available
            </span>
          </div>

          {careers.length === 0 ? (
            <div className="rounded-2xl border border-[#3A3541] border-opacity-10 bg-white p-12 text-center shadow-sm">
              <svg className="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-medium text-[#3A3541]">No open positions currently</h3>
              <p className="mt-2 text-[#3A3541] opacity-60">Check back later or follow us on our socials for updates.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {careers.map((career) => (
                <div key={career.id} className="group relative flex flex-col rounded-2xl border border-[#3A3541] border-opacity-10 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="rounded-full bg-[#9155FD] bg-opacity-10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#9155FD]">
                      {career.department || "General"}
                    </span>
                    <span className="text-xs font-medium text-[#3A3541] opacity-60">
                      {career.type}
                    </span>
                  </div>
                  
                  <h3 className="mb-1 text-xl font-bold text-[#3A3541] group-hover:text-[#9155FD] transition-colors">
                    {career.title}
                  </h3>
                  <div className="mb-4 text-sm font-medium text-[#3A3541] opacity-80">
                    {career.company_name || "Cyfiz"}
                  </div>
                  
                  <div className="mb-6 flex items-center gap-2 text-sm text-[#3A3541] opacity-70">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {career.location}
                  </div>

                  <div 
                    className="prose prose-sm mb-8 line-clamp-3 text-[#3A3541] opacity-80"
                    dangerouslySetInnerHTML={{ __html: career.description }}
                  />

                  <div className="mt-auto pt-6 border-t border-[#3A3541] border-opacity-10 flex items-center justify-between">
                    <div className="text-sm font-semibold text-[#3A3541]">
                      {career.salary_range || "Competitive"}
                    </div>
                    <Link 
                      href={`/careers/${career.slug}`} 
                      className="inline-flex items-center gap-2 rounded-lg bg-[#9155FD] px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-[#804BDF] hover:shadow-lg"
                    >
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
