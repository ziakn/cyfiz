import { query } from "@/lib/db";
import MessageList, { type MessageRow } from "./MessageList";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const rows = await query<MessageRow[]>(
    "SELECT id, topic, name, email, organisation, role, message, subscribe, status, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS created_at FROM contact_messages ORDER BY created_at DESC, id DESC"
  );
  return <MessageList initial={rows} />;
}
