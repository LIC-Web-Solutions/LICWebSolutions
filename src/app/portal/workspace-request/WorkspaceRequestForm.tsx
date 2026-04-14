"use client";

import { useActionState } from "react";
import {
  createWorkspaceRequestWithState,
  type WorkspaceRequestState,
} from "@/app/portal/workspace-request/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

const initialState: WorkspaceRequestState = { error: null };

export function WorkspaceRequestForm() {
  const [state, formAction, pending] = useActionState(
    createWorkspaceRequestWithState,
    initialState,
  );

  return (
    <form
      action={formAction}
      className={cn(portalStyle.narrowForm, portalStyle.surface)}
    >
      <h2 className={portalStyle.h2Section}>Request a new workspace</h2>
      <p className={portalStyle.helperText}>
        Use this when your organization needs a new project workspace. An LIC
        admin will review and approve it.
      </p>
      {state.ok ? (
        <p className={portalStyle.successText}>
          Request submitted. You can track status below.
        </p>
      ) : null}
      {state.error ? (
        <p className={portalStyle.errorText} role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="ws-request-name" className={portalStyle.label}>
          Workspace name
        </label>
        <input
          id="ws-request-name"
          name="proposedName"
          required
          maxLength={120}
          className={portalStyle.input}
          placeholder="Acme Web Rebuild"
        />
      </div>
      <div>
        <label htmlFor="ws-request-slug" className={portalStyle.label}>
          Workspace URL slug
        </label>
        <input
          id="ws-request-slug"
          name="proposedSlug"
          required
          maxLength={80}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className={portalStyle.input}
          placeholder="acme-web-rebuild"
        />
        <p className={portalStyle.helperText}>
          Lowercase letters, numbers, and hyphens only.
        </p>
      </div>
      <div>
        <label htmlFor="ws-request-invites" className={portalStyle.label}>
          Organization member invites (optional)
        </label>
        <textarea
          id="ws-request-invites"
          name="inviteEmailsRaw"
          className={portalStyle.input}
          rows={4}
          placeholder="jane@acme.com, sam@acme.com"
        />
        <p className={portalStyle.helperText}>
          Comma or newline separated emails. Members with existing accounts are
          granted access automatically after approval.
        </p>
      </div>
      <button
        type="submit"
        disabled={pending}
        className={portalStyle.btnPrimary}
      >
        {pending ? "Submitting..." : "Submit workspace request"}
      </button>
    </form>
  );
}
