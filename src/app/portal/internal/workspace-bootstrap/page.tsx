import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BootstrapWorkspaceForm } from "@/app/portal/internal/workspace-bootstrap/BootstrapWorkspaceForm";

function parseAdminIds(): string[] {
  const raw = process.env.INTERNAL_ADMIN_CLERK_IDS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function WorkspaceBootstrapPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const allowed = parseAdminIds();
  if (allowed.length === 0 || !allowed.includes(userId)) {
    redirect("/portal/access-denied");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        Internal · workspace bootstrap
      </h1>
      <p className="mt-3 text-sm opacity-80">
        Creates a new workspace and adds you as <strong>OWNER</strong>. Only
        Clerk user ids listed in{" "}
        <code className="rounded bg-white/10 px-1 text-xs">
          INTERNAL_ADMIN_CLERK_IDS
        </code>{" "}
        can access this page. For local development only unless you lock this
        down further.
      </p>
      <div className="mt-8">
        <BootstrapWorkspaceForm />
      </div>
    </main>
  );
}
