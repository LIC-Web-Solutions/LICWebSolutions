"use client";

import { useActionState } from "react";
import {
  type BootstrapWorkspaceState,
  bootstrapWorkspaceWithState,
} from "@/app/portal/internal/workspace-bootstrap/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

const initial: BootstrapWorkspaceState = { error: null };

export function BootstrapWorkspaceForm() {
  const [state, formAction, pending] = useActionState(
    bootstrapWorkspaceWithState,
    initial,
  );

  return (
    <form
      action={formAction}
      className={cn(portalStyle.narrowForm, portalStyle.surface)}
    >
      <h2 className={portalStyle.h2Section}>Create workspace</h2>
      {state.ok ? (
        <p className={portalStyle.successText}>
          Workspace created. Open the portal home to select it.
        </p>
      ) : null}
      {state.error ? (
        <p className={portalStyle.errorText} role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="ws-name" className={portalStyle.label}>
          Display name
        </label>
        <input
          id="ws-name"
          name="name"
          required
          maxLength={120}
          className={portalStyle.input}
          placeholder="Acme Corp"
        />
      </div>
      <div>
        <label htmlFor="ws-slug" className={portalStyle.label}>
          URL slug
        </label>
        <input
          id="ws-slug"
          name="slug"
          required
          maxLength={80}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className={portalStyle.input}
          placeholder="acme-corp"
        />
        <p className={portalStyle.helperText}>
          Used in URLs: /portal/your-slug/…
        </p>
      </div>
      <button
        type="submit"
        disabled={pending || state.ok}
        className={portalStyle.btnPrimary}
      >
        {pending ? "Creating…" : "Create and assign me as owner"}
      </button>
    </form>
  );
}
