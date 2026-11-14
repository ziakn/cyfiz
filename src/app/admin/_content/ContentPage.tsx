import { query } from "@/lib/db";
import { requirePage } from "@/lib/rbac";
import { CONTENT_MODULES } from "@/lib/contentModules";
import ContentList from "./ContentList";

/** Server half of a generic admin list screen. Each module's page.tsx is one line. */
export default async function ContentPage({ moduleKey }: { moduleKey: string }) {
  const cfg = CONTENT_MODULES[moduleKey];
  await requirePage(cfg.key);
  const rows = await query<Parameters<typeof ContentList>[0]["rows"]>(`SELECT * FROM ${cfg.table} ORDER BY ${cfg.orderBy}`);
  return <ContentList moduleKey={moduleKey} rows={rows} />;
}
