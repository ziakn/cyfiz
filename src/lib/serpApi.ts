export interface SerpJob {
  title: string;
  company_name: string;
  location: string;
  description: string;
  job_id: string;
  apply_url?: string;
}

export async function fetchJobsFromSerp(query: string = "Cybersecurity jobs in Europe", maxPages: number = 5): Promise<SerpJob[]> {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    throw new Error("SERPAPI_API_KEY is not defined in environment variables");
  }

  const allJobs: SerpJob[] = [];
  
  for (let page = 0; page < maxPages; page++) {
    const start = page * 10; // SerpApi Google Jobs typically paginates by 10
    const url = `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&hl=en&start=${start}&api_key=${apiKey}`;
    
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        console.error(`SerpApi fetch failed with status ${response.status}`);
        break;
      }
      
      const data = await response.json();
      
      if (!data.jobs_results || data.jobs_results.length === 0) {
        break; // No more jobs
      }
      
      for (const job of data.jobs_results) {
        allJobs.push({
          title: job.title,
          company_name: job.company_name,
          location: job.location,
          description: job.description,
          job_id: job.job_id,
          // usually apply_options is an array
          apply_url: job.apply_options && job.apply_options.length > 0 ? job.apply_options[0].link : undefined
        });
      }
      
      // If there's no next page token or fewer than 10 jobs, stop
      if (!data.serpapi_pagination || !data.serpapi_pagination.next) {
        break;
      }
      
    } catch (error) {
      console.error("Error fetching from SerpApi:", error);
      break;
    }
  }
  
  return allJobs;
}
