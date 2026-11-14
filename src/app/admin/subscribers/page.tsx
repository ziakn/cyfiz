import { query } from "@/lib/db";
import { requirePage } from "@/lib/rbac";
import SubscriberList, { type SubscriberRow } from "./SubscriberList";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  await requirePage("subscribers");
  const rows = await query<SubscriberRow[]>(
    "SELECT id, email, source, status, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM newsletter_subscribers ORDER BY id DESC"
  );
  return <SubscriberList initial={rows} />;
}
