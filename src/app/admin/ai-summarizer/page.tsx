import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import AiSummarizerList, { AiSummaryItem } from "./AiSummarizerList";

export const dynamic = "force-dynamic";

export default async function AdminAiSummarizerPage() {
  const rows = (await query<RowDataPacket[]>(
    `SELECT id, original_filename, pdf_url, source, ai_title, ai_tag, ai_excerpt,
            ai_key_findings, ai_read_time, ai_model, process_status, error_message,
            published_summary_id, created_at
     FROM ai_summaries
     ORDER BY created_at DESC`
  )) as AiSummaryItem[];

  return <AiSummarizerList initialItems={rows} />;
}
