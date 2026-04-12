"use client";

import { useActionState } from "react";
import {
  createSupportThreadWithState,
  type SupportThreadFormState,
} from "@/app/portal/[workspaceSlug]/support/actions";

const initial: SupportThreadFormState = { error: null };

export function NewSupportThreadForm({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const [state, formAction, pending] = useActionState(
    createSupportThreadWithState,
    initial,
  );

  return (
    <form
      action={formAction}
      className="space-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-5"
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className="text-lg font-semibold">New support thread</h2>
      {state.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="support-subject"
          className="text-xs uppercase tracking-wide opacity-70"
        >
          Subject
        </label>
        <input
          id="support-subject"
          name="subject"
          required
          maxLength={180}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="What do you need help with?"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-40"
      >
        {pending ? "Creating…" : "Open thread"}
      </button>
    </form>
  );
}
