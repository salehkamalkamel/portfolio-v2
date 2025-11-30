export function slugify(text: string, id: string): string {
  if (!id) {
    throw new Error("slugify() requires a valid ID");
  }

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_]+/g, "-") // spaces -> hyphens
    .replace(/^-+|-+$/g, ""); // trim hyphens

  // fallback if title is empty
  const safeSlug = slug.length > 0 ? slug : "item";

  return `${safeSlug}__${id}`;
}
