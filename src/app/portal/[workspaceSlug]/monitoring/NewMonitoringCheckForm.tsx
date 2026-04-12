"use client";

import { useActionState } from "react";
import {
  createMonitoringCheckWithState,
  type MonitoringFormState,
} from "@/app/portal/[workspaceSlug]/monitoring/actions";

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
      className="space-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-5"
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className="text-lg font-semibold">Add endpoint check</h2>
      {state.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="mon-endpoint"
          className="text-xs uppercase tracking-wide opacity-70"
        >
          URL or host to monitor
        </label>
        <input
          id="mon-endpoint"
          name="endpoint"
          required
          maxLength={255}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="https://example.com/health"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-40"
      >
        {pending ? "Saving…" : "Add check"}
      </button>
    </form>
  );
}
