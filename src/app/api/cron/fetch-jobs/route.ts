import { NextResponse } from 'next/server';
import { fetchJobsFromSerp } from '@/lib/serpApi';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

function generateSlug(title: string, company: string) {
  const base = `${title} ${company}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${base}-${Date.now().toString().slice(-4)}`;
}

export async function GET(request: Request) {
  try {
    const jobs = await fetchJobsFromSerp("Cybersecurity jobs in Europe", 5);
    let insertedCount = 0;
    let skippedCount = 0;
    
    for (const job of jobs) {
      // Deduplication check: title + company_name
      const existing = await query<RowDataPacket[]>(
        "SELECT id FROM careers WHERE title = ? AND company_name = ? LIMIT 1",
        [job.title, job.company_name]
      );
      
      if (existing && existing.length > 0) {
        skippedCount++;
        continue;
      }
      
      const slug = generateSlug(job.title, job.company_name);
      
      // Insert new job
      await query(
        `INSERT INTO careers 
         (title, company_name, slug, location, type, description, apply_url, external_id, source, status) 
         VALUES (?, ?, ?, ?, 'Full-time', ?, ?, ?, 'serp', 1)`,
        [
          job.title, 
          job.company_name, 
          slug, 
          job.location, 
          job.description, 
          job.apply_url || null, 
          job.job_id,
        ]
      );
      insertedCount++;
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Fetched ${jobs.length} jobs. Inserted: ${insertedCount}, Skipped: ${skippedCount}` 
    });
    
  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
