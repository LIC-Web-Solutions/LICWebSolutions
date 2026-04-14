"use client";

import { useActionState } from "react";
import {
  addSupportMessageWithState,
  type SupportMessageFormState,
} from "@/app/portal/[workspaceSlug]/support/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

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
    <form action={formAction} className={portalStyle.replyForm}>
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <input type="hidden" name="threadId" value={threadId} />
      {state.error ? (
        <p className={portalStyle.errorText}>{state.error}</p>
      ) : null}
      <textarea
        name="body"
        required
        rows={3}
        className={portalStyle.input}
        placeholder="Write a reply…"
      />
      <button
        type="submit"
        disabled={pending}
        className={cn(portalStyle.btnOutline, portalStyle.btnAuto)}
      >
        {pending ? "Sending…" : "Send reply"}
      </button>
    </form>
  );
}
