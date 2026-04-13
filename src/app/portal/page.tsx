import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserWorkspaces, roleLabel } from "@/lib/auth/guards";

export default async function PortalPage() {
  const memberships = await getUserWorkspaces();

  if (memberships.length === 0) {
    redirect("/portal/access-pending");
  }

  if (memberships.length === 1) {
    redirect(`/portal/${memberships[0].workspace.slug}`);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 pb-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
        Choose a workspace
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
        Select the workspace where you want to manage tickets, support,
        customization, and monitoring.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {memberships.map(({ workspace, role }) => (
          <li key={workspace.id}>
            <Link
              href={`/portal/${workspace.slug}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600 hover:bg-zinc-900/70"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-medium text-zinc-50">
                  {workspace.name}
                </p>
                <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-300">
                  {roleLabel(role)}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-zinc-500">
                /portal/{workspace.slug}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
