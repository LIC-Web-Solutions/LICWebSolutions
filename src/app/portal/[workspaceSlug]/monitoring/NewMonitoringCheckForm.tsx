"use client";

import { useActionState } from "react";
import {
  createMonitoringCheckWithState,
  type MonitoringFormState,
} from "@/app/portal/[workspaceSlug]/monitoring/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

const initial: MonitoringFormState = { error: null };

export function NewMonitoringCheckForm({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const [state, formAction, pending] = useActionState(
    createMonitoringCheckWithState,
    initial,
  );

  return (
    <form
      action={formAction}
      className={cn(portalStyle.formStack4, portalStyle.surface)}
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className={portalStyle.h2Section}>Add endpoint check</h2>
      {state.error ? (
        <p className={portalStyle.errorText} role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="mon-endpoint" className={portalStyle.label}>
          URL or host to monitor
        </label>
        <input
          id="mon-endpoint"
          name="endpoint"
          required
          maxLength={255}
          className={portalStyle.input}
          placeholder="https://example.com/health"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className={portalStyle.btnPrimary}
      >
        {pending ? "Saving…" : "Add check"}
      </button>
    </form>
  );
}
