"use client";

import { useActionState } from "react";
import {
  createSupportThreadWithState,
  type SupportThreadFormState,
} from "@/app/portal/[workspaceSlug]/support/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

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
      className={cn(portalStyle.formStack4, portalStyle.surface)}
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className={portalStyle.h2Section}>New support thread</h2>
      {state.error ? (
        <p className={portalStyle.errorText} role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="support-subject" className={portalStyle.label}>
          Subject
        </label>
        <input
          id="support-subject"
          name="subject"
          required
          maxLength={180}
          className={portalStyle.input}
          placeholder="What do you need help with?"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className={portalStyle.btnPrimary}
      >
        {pending ? "Creating…" : "Open thread"}
      </button>
    </form>
  );
}
