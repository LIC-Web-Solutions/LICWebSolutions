import { currentUser } from "@clerk/nextjs/server";

export default async function PortalPage() {
  const user = await currentUser();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Client portal</h1>
      <p className="mt-3 max-w-xl text-[0.95rem] opacity-85">
        Client portal — onboarding coming next.
      </p>
      {user?.firstName ? (
        <p className="mt-6 text-sm opacity-80">
          Signed in as {user.firstName}.
        </p>
      ) : null}
    </main>
  );
}
