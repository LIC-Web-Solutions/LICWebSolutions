import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 pb-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
        Access denied
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
        You are signed in, but you are not a member of this workspace URL, or
        your role does not allow this page. Check the slug in the address bar,
        or return to the portal home to see workspaces you can open.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
        <strong className="font-medium text-zinc-200">What to do next:</strong>{" "}
        use{" "}
        <Link
          href="/portal"
          className="text-zinc-200 underline underline-offset-2"
        >
          portal home
        </Link>{" "}
        to pick a workspace you belong to. New accounts need a workspace
        assignment in the database (see README: Granting portal access). For
        local dev, run{" "}
        <code className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
          pnpm prisma:seed
        </code>{" "}
        after signing in once.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/portal"
          className="inline-flex rounded-full border border-zinc-600 bg-zinc-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800/80"
        >
          Return to portal
        </Link>
        <Link
          href="/"
          className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
        >
          Marketing site
        </Link>
      </div>
    </main>
  );
}
