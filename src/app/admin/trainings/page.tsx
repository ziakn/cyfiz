import { query } from "@/lib/db";
import { requirePage } from "@/lib/rbac";
import TrainingList, { type TrainingRow } from "./TrainingList";

export const dynamic = "force-dynamic";

export default async function AdminTrainingsPage() {
  await requirePage("trainings");
  const rows = await query<TrainingRow[]>(
    "SELECT id, title, category, format, duration, summary, link_url, sort_order, status FROM trainings ORDER BY sort_order ASC, id ASC"
  );
  return <TrainingList initial={rows} />;
}
