import Link from "next/link";

export default function AccessPendingPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 pb-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
        Access pending
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Your account is authenticated, but you are not assigned to a client
        workspace yet. Until a workspace membership is created for you, the
        portal cannot show tickets or other modules.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
        <strong className="font-medium text-zinc-200">What to do next:</strong>{" "}
        contact your LIC project manager or support so they can assign you to
        the correct workspace in the database.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex rounded-full border border-zinc-600 bg-zinc-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800/80"
        >
          Back to site
        </Link>
        <Link
          href="/portal"
          className="inline-flex rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
        >
          Try portal home
        </Link>
      </div>
    </main>
  );
}
