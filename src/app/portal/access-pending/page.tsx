import Link from "next/link";

export default function AccessPendingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Access pending</h1>
      <p className="mt-3 text-sm opacity-80">
        Your account is authenticated, but you are not assigned to a client
        workspace yet.
      </p>
      <p className="mt-2 text-sm opacity-80">
        Contact your LIC project manager or email support to request access.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide"
      >
        Back to site
      </Link>
    </main>
  );
}
