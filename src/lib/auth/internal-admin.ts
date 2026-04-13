import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export function parseInternalAdminClerkIds(): string[] {
  const raw = process.env.INTERNAL_ADMIN_CLERK_IDS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Redirects to sign-in, access-denied, or returns when the Clerk user is in INTERNAL_ADMIN_CLERK_IDS. */
export async function requireInternalAdmin() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const allowed = parseInternalAdminClerkIds();
  if (allowed.length === 0 || !allowed.includes(userId)) {
    redirect("/portal/access-denied");
  }
}
