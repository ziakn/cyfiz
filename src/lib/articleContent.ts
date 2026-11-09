import { slugify } from "./utils";

export interface TocEntry {
  id: string;
  text: string;
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

/**
 * Gives every <h2> a stable id (for the "On this page" list) and returns the
 * list of headings. The HTML itself comes from the admin editor.
 */
export function prepareArticleHtml(html: string | null | undefined) {
  const toc: TocEntry[] = [];
  const used = new Set<string>();

  const out = (html ?? "").replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) => {
    const text = stripTags(inner);
    if (!text) return _m;
    let id = slugify(text) || "section";
    let n = 2;
    while (used.has(id)) id = `${slugify(text) || "section"}-${n++}`;
    used.add(id);
    toc.push({ id, text });
    const cleaned = attrs.replace(/\sid="[^"]*"/i, "");
    return `<h2${cleaned} id="${id}">${inner}</h2>`;
  });

  return { html: out, toc };
}
