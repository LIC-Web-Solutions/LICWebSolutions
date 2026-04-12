"use client";

import { useActionState } from "react";
import {
  type CreateTicketFormState,
  createTicketWithState,
} from "@/app/portal/[workspaceSlug]/tickets/actions";

const initialState: CreateTicketFormState = { error: null };

export function TicketCreateForm({ workspaceSlug }: { workspaceSlug: string }) {
  const [state, formAction, pending] = useActionState(
    createTicketWithState,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5"
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className="text-lg font-semibold">New ticket</h2>
      {state.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="ticket-title"
          className="block text-xs uppercase tracking-wide opacity-70"
        >
          Title
        </label>
        <input
          id="ticket-title"
          name="title"
          required
          maxLength={180}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="Short summary"
        />
      </div>
      <div>
        <label
          htmlFor="ticket-description"
          className="block text-xs uppercase tracking-wide opacity-70"
        >
          Description
        </label>
        <textarea
          id="ticket-description"
          name="description"
          rows={3}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="Optional details"
        />
      </div>
      <div>
        <label
          htmlFor="ticket-priority"
          className="block text-xs uppercase tracking-wide opacity-70"
        >
          Priority
        </label>
        <select
          id="ticket-priority"
          name="priority"
          defaultValue="MEDIUM"
          className="mt-1 w-full max-w-xs rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide opacity-90 hover:opacity-100 disabled:opacity-40"
      >
        {pending ? "Saving…" : "Create ticket"}
      </button>
    </form>
  );
}
