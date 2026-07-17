export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')        // Trim - from start of text
    .replace(/-+$/, '');       // Trim - from end of text
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export function truncate(text: string, length: number = 150) {
  if (!text) return "";
  const cleanText = stripHtml(text);
  if (cleanText.length <= length) return cleanText;
  return cleanText.slice(0, length).trim() + "...";
}

// The timezone the site's publication dates are expressed in. Pinned so the
// stored day does not depend on the host's TZ (production runs UTC) or on the
// editor's browser.
export const SITE_TIMEZONE = "Asia/Qatar";

// Formats a date as YYYY-MM-DD for a DATE column or an <input type="date">.
// Already-formatted strings pass through untouched: a "YYYY-MM-DD" from the DB
// has no time or zone, so re-parsing it would only reintroduce a shift.
export function toDateValue(date: Date | string = new Date()) {
  if (typeof date === "string") {
    const match = date.match(/^\d{4}-\d{2}-\d{2}/);
    if (match) return match[0];
  }
  const d = typeof date === "string" ? new Date(date) : date;
  // en-CA renders as YYYY-MM-DD.
  return d.toLocaleDateString("en-CA", { timeZone: SITE_TIMEZONE });
}

// Renders a stored publication date for display. Anchored to UTC because
// "YYYY-MM-DD" parses as UTC midnight, which would otherwise show the previous
// day to anyone west of Greenwich.
export function formatDateDisplay(date: Date | string) {
  return new Date(`${toDateValue(date)}T00:00:00Z`).toLocaleDateString(undefined, {
    timeZone: "UTC",
  });
}
