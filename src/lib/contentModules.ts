// Config for the simple "list of rows" admin modules (the editable parts of the Who@m! page).
// Shared by the generic admin screen, the server actions and (via the same keys) the permission system.

export type FieldType = "text" | "textarea" | "number" | "select";

export interface ContentField {
  key: string; // column name
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  options?: string[];
  default?: string | number;
}

export interface ContentModule {
  key: string; // permission module key
  table: string;
  title: string;
  singular: string;
  description: string;
  publicPath: string;
  orderBy: string;
  titleField: string;
  subtitleField?: string;
  fields: ContentField[];
}

export const CONTENT_MODULES: Record<string, ContentModule> = {
  packages: {
    key: "packages",
    table: "packages",
    title: "Packages",
    singular: "package",
    description: "Free and paid packages shown on the Packages page.",
    publicPath: "/packages",
    orderBy: "sort_order ASC, id ASC",
    titleField: "name",
    subtitleField: "description",
    fields: [
      { key: "name", label: "Name", type: "text", required: true, hint: "e.g. Free, Professional" },
      { key: "tier", label: "Type", type: "select", options: ["Free", "Paid"], default: "Free" },
      { key: "price", label: "Price", type: "text", hint: "Shown as typed, e.g. Free, $29, €49." },
      { key: "period", label: "Billing period", type: "text", hint: "e.g. per month, per year, one-time. Leave empty for none." },
      { key: "description", label: "Short description", type: "textarea" },
      { key: "features", label: "Features", type: "textarea", hint: "One feature per line." },
      { key: "badge", label: "Badge (optional)", type: "text", hint: "e.g. Most popular" },
      { key: "featured", label: "Highlight this card", type: "select", options: ["No", "Yes"], default: "No" },
      { key: "cta_label", label: "Button text", type: "text", hint: "e.g. Get started" },
      { key: "cta_url", label: "Button link", type: "text", hint: "/portal/register, /contact or a full https:// link (e.g. a payment page)." },
      { key: "sort_order", label: "Order", type: "number", default: 0, hint: "Lower numbers appear first." },
    ],
  },
  credentials: {
    key: "credentials",
    table: "profile_credentials",
    title: "Certifications",
    singular: "certification",
    description: "The professional certifications list on the Who@m! page.",
    publicPath: "/profile",
    orderBy: "sort_order ASC, id ASC",
    titleField: "name",
    subtitleField: "detail",
    fields: [
      { key: "name", label: "Name", type: "text", required: true, hint: "e.g. CISSP" },
      { key: "detail", label: "Detail", type: "text", hint: "e.g. Certified Information Systems Security Professional" },
      { key: "sort_order", label: "Order", type: "number", default: 0, hint: "Lower numbers appear first." },
    ],
  },
  expertise: {
    key: "expertise",
    table: "profile_expertise",
    title: "Core Expertise",
    singular: "expertise card",
    description: "The expertise cards on the Who@m! page.",
    publicPath: "/profile",
    orderBy: "sort_order ASC, id ASC",
    titleField: "title",
    subtitleField: "summary",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "icon", label: "Icon", type: "select", options: ["shield", "chip", "cloud"], default: "shield" },
      { key: "summary", label: "Summary", type: "textarea", required: true },
      { key: "highlight_bold", label: "Highlight (bold part)", type: "text", hint: "e.g. Virtual CISO" },
      { key: "highlight_text", label: "Highlight (rest of the sentence)", type: "text" },
      { key: "bullets", label: "Bullet points", type: "textarea", hint: "One per line." },
      { key: "sort_order", label: "Order", type: "number", default: 0, hint: "Lower numbers appear first; the card number follows this order." },
    ],
  },
  speaking: {
    key: "speaking",
    table: "profile_speaking",
    title: "Speaking",
    singular: "speaking item",
    description: "Events and topics in the Speaker card.",
    publicPath: "/profile",
    orderBy: "sort_order ASC, id ASC",
    titleField: "title",
    fields: [
      { key: "title", label: "Event or topic", type: "text", required: true },
      { key: "sort_order", label: "Order", type: "number", default: 0 },
    ],
  },
  research: {
    key: "research",
    table: "profile_research",
    title: "Research Papers",
    singular: "paper",
    description: "Published and under-review papers in the Researcher card.",
    publicPath: "/profile",
    orderBy: "sort_order ASC, id ASC",
    titleField: "title",
    subtitleField: "venue",
    fields: [
      { key: "kind", label: "Status", type: "select", options: ["Published", "Under review"], default: "Published" },
      { key: "year", label: "Year", type: "text" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "venue", label: "Journal / institution", type: "text" },
      { key: "url", label: "Title link (optional)", type: "text", hint: "https://… makes the title clickable." },
      { key: "links", label: "Extra link buttons", type: "textarea", hint: "One per line: Button label | https://link" },
      { key: "sort_order", label: "Order", type: "number", default: 0 },
    ],
  },
};
