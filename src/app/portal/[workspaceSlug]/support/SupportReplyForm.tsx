"use client";

import { useActionState } from "react";
import {
  addSupportMessageWithState,
  type SupportMessageFormState,
} from "@/app/portal/[workspaceSlug]/support/actions";

const initial: SupportMessageFormState = { error: null };

export function SupportReplyForm({
  workspaceSlug,
  threadId,
}: {
  workspaceSlug: string;
  threadId: string;
}) {
  const [state, formAction, pending] = useActionState(
    addSupportMessageWithState,
    initial,
  );

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <input type="hidden" name="threadId" value={threadId} />
      {state.error ? (
        <p className="text-xs text-red-300">{state.error}</p>
      ) : null}
      <textarea
        name="body"
        required
        rows={2}
        className="w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
        placeholder="Write a reply…"
      />
      <button
        type="submit"
        disabled={pending}
        className="text-xs font-semibold uppercase tracking-wide opacity-90 hover:opacity-100 disabled:opacity-40"
      >
        {pending ? "Sending…" : "Send reply"}
      </button>
    </form>
  );
}
