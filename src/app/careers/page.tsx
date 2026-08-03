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

export default async function CareersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page || "1", 10);
  const pageSize = 9;
  const offset = (page - 1) * pageSize;

  const countResult = await query<RowDataPacket[]>("SELECT COUNT(*) as total FROM careers WHERE status = 1");
  const totalItems = countResult[0].total;
  const totalPages = Math.ceil(totalItems / pageSize);

  const careers = (await query<RowDataPacket[]>(
    "SELECT * FROM careers WHERE status = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [pageSize, offset]
  )) as CareerItem[];

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F5FA] font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#9155FD] to-[#3A3541] px-6 py-20 sm:px-12 sm:py-32">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Join Our Mission
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white opacity-80 sm:text-xl">
              We're looking for passionate individuals who want to explore what matters, uncover what others miss, and build the future of AI.
            </p>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-12 sm:py-24">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold text-[#3A3541]">Open Positions</h2>
            <div className="text-sm font-medium text-[#3A3541] opacity-60">
              Showing {careers.length} of {totalItems} roles
            </div>
          </div>

          {careers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {careers.map((career) => (
                <Link 
                  key={career.id} 
                  href={`/careers/${career.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#3A3541] border-opacity-10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[#9155FD]"
                >
                  <div>
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
                  </div>
                  
                  <div className="flex items-center text-sm font-bold text-[#9155FD]">
                    View Details
                    <svg className="ml-2 transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#3A3541] border-opacity-20 bg-white py-24 text-center">
              <svg className="mb-4 text-[#3A3541] opacity-20" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <h3 className="mb-2 text-xl font-bold text-[#3A3541]">No open positions</h3>
              <p className="text-[#3A3541] opacity-60">We don't have any open positions at the moment. Please check back later!</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              {page > 1 ? (
                <Link href={`/careers?page=${page - 1}`} className="flex h-10 w-10 items-center justify-center rounded-md border border-[#3A3541] border-opacity-20 text-[#3A3541] transition-colors hover:border-[#9155FD] hover:text-[#9155FD]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </Link>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#3A3541] border-opacity-10 text-[#3A3541] opacity-30">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </div>
              )}
              
              <div className="px-4 text-sm font-semibold text-[#3A3541]">
                Page {page} of {totalPages}
              </div>
              
              {page < totalPages ? (
                <Link href={`/careers?page=${page + 1}`} className="flex h-10 w-10 items-center justify-center rounded-md border border-[#3A3541] border-opacity-20 text-[#3A3541] transition-colors hover:border-[#9155FD] hover:text-[#9155FD]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#3A3541] border-opacity-10 text-[#3A3541] opacity-30">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
