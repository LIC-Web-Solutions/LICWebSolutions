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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        Choose a workspace
      </h1>
      <p className="mt-3 max-w-xl text-[0.95rem] opacity-85">
        Select the workspace where you want to manage tickets, support,
        customization, and monitoring.
      </p>
      <ul className="mt-8 space-y-3">
        {memberships.map(({ workspace, role }) => (
          <li key={workspace.id}>
            <Link
              href={`/portal/${workspace.slug}`}
              className="block rounded-lg border border-white/10 bg-white/[0.02] p-4 transition hover:bg-white/[0.06]"
            >
              <p className="text-base font-medium">{workspace.name}</p>
              <p className="mt-1 text-sm opacity-75">
                {roleLabel(role)} access
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
