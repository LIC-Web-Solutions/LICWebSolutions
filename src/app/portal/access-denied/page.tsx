import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Access denied</h1>
      <p className="mt-3 text-sm opacity-80">
        You are signed in, but you are not a member of this workspace URL, or
        your role does not allow this page. Check the slug in the address bar,
        or return to the portal home to see workspaces you can open.
      </p>
      <p className="mt-3 text-sm opacity-80">
        New accounts need a workspace assignment in the database (see README:
        Granting portal access). For local dev, run{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
          pnpm prisma:seed
        </code>{" "}
        after signing in once.
      </p>
      <Link
        href="/portal"
        className="mt-6 inline-flex rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide"
      >
        Return to portal
      </Link>
    </main>
  );
}
