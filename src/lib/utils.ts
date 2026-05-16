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
