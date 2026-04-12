"use client";

import { useActionState } from "react";
import {
  type CustomizationFormState,
  createCustomizationWithState,
} from "@/app/portal/[workspaceSlug]/customization/actions";

const initial: CustomizationFormState = { error: null };

export function NewCustomizationForm({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const [state, formAction, pending] = useActionState(
    createCustomizationWithState,
    initial,
  );

  return (
    <form
      action={formAction}
      className="space-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-5"
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className="text-lg font-semibold">New customization request</h2>
      {state.error ? (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="cust-type"
          className="text-xs uppercase tracking-wide opacity-70"
        >
          Type
        </label>
        <input
          id="cust-type"
          name="type"
          required
          maxLength={80}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="e.g. hero_banner, checkout_flow"
        />
      </div>
      <div>
        <label
          htmlFor="cust-spec"
          className="text-xs uppercase tracking-wide opacity-70"
        >
          Specification
        </label>
        <textarea
          id="cust-spec"
          name="specification"
          required
          rows={4}
          className="mt-1 w-full rounded border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/40"
          placeholder="Describe the change, acceptance criteria, and links."
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-40"
      >
        {pending ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
