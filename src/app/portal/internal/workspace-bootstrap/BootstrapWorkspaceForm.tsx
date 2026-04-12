"use client";

import { useActionState } from "react";
import {
  type BootstrapWorkspaceState,
  bootstrapWorkspaceWithState,
} from "@/app/portal/internal/workspace-bootstrap/actions";

const initial: BootstrapWorkspaceState = { error: null };

export function BootstrapWorkspaceForm() {
  const [state, formAction, pending] = useActionState(
    bootstrapWorkspaceWithState,
    initial,
  );

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <h2 className="text-lg font-semibold">Create workspace</h2>
      {state.ok ? (
        <p className="text-sm text-emerald-200">
          Workspace created. Open the portal home to select it.
        </p>
      ) : null}
      {state.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="ws-name"
          className="text-xs uppercase tracking-wide opacity-70"
        >
          Display name
        </label>
        <input
          id="ws-name"
          name="name"
          required
          maxLength={120}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="Acme Corp"
        />
      </div>
      <div>
        <label
          htmlFor="ws-slug"
          className="text-xs uppercase tracking-wide opacity-70"
        >
          URL slug
        </label>
        <input
          id="ws-slug"
          name="slug"
          required
          maxLength={80}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="acme-corp"
        />
        <p className="mt-1 text-xs opacity-50">
          Used in URLs: /portal/your-slug/…
        </p>
      </div>
      <button
        type="submit"
        disabled={pending || state.ok}
        className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-40"
      >
        {pending ? "Creating…" : "Create and assign me as owner"}
      </button>
    </form>
  );
}
