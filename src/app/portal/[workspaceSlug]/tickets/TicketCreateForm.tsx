"use client";

import { useActionState } from "react";
import {
  type CreateTicketFormState,
  createTicketWithState,
} from "@/app/portal/[workspaceSlug]/tickets/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

const initialState: CreateTicketFormState = { error: null };

export function TicketCreateForm({ workspaceSlug }: { workspaceSlug: string }) {
  const [state, formAction, pending] = useActionState(
    createTicketWithState,
    initialState,
  );

  return (
    <form
      action={formAction}
      className={cn(portalStyle.formStack5, portalStyle.surface)}
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className={portalStyle.h2Section}>New ticket</h2>
      {state.error ? (
        <p className={portalStyle.errorText} role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="ticket-title" className={portalStyle.label}>
          Title
        </label>
        <input
          id="ticket-title"
          name="title"
          required
          maxLength={180}
          className={portalStyle.input}
          placeholder="Short summary"
        />
      </div>
      <div>
        <label htmlFor="ticket-description" className={portalStyle.label}>
          Description
        </label>
        <textarea
          id="ticket-description"
          name="description"
          rows={4}
          className={portalStyle.input}
          placeholder="Optional details"
        />
      </div>
      <div>
        <label htmlFor="ticket-priority" className={portalStyle.label}>
          Priority
        </label>
        <select
          id="ticket-priority"
          name="priority"
          defaultValue="MEDIUM"
          className={cn(portalStyle.input, portalStyle.inputMaxXs)}
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
        className={portalStyle.btnPrimary}
      >
        {pending ? "Saving…" : "Create ticket"}
      </button>
    </form>
  );
}
