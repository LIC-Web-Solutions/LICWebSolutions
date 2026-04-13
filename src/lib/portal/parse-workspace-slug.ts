const RESERVED_FIRST_SEGMENTS = new Set([
  "access-pending",
  "access-denied",
  "internal",
]);

/** Returns workspace slug from `/portal/[slug]/...` or undefined for chooser / system routes. */
export function parseWorkspaceSlugFromPathname(
  pathname: string,
): string | undefined {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "portal" || !parts[1]) {
    return undefined;
  }
  if (RESERVED_FIRST_SEGMENTS.has(parts[1])) {
    return undefined;
  }
  return parts[1];
}

export function humanizeWorkspaceSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}
