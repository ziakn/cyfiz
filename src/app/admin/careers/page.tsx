import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import CareerList from "./CareerList";

export interface CareerItem {
  id: number;
  title: string;
  slug: string;
  department: string | null;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  salary_range: string | null;
  apply_url: string | null;
  external_id: string | null;
  source: string;
  status: number;
  created_at: string;
}

export default async function AdminCareersPage() {
  const careers = (await query<RowDataPacket[]>(
    "SELECT * FROM careers ORDER BY created_at DESC"
  )) as CareerItem[];

  return <CareerList initialCareers={careers} />;
}
