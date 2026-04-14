"use client";

import { useActionState } from "react";
import {
  type CustomizationFormState,
  createCustomizationWithState,
} from "@/app/portal/[workspaceSlug]/customization/actions";
import { cn } from "@/lib/utils";
import portalStyle from "@/styles/portal.module.css";

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
      className={cn(portalStyle.formStack4, portalStyle.surface)}
    >
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <h2 className={portalStyle.h2Section}>New customization request</h2>
      {state.error ? (
        <p className={portalStyle.errorText} role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="cust-type" className={portalStyle.label}>
          Type
        </label>
        <input
          id="cust-type"
          name="type"
          required
          maxLength={80}
          className={portalStyle.input}
          placeholder="e.g. hero_banner, checkout_flow"
        />
      </div>
      <div>
        <label htmlFor="cust-spec" className={portalStyle.label}>
          Specification
        </label>
        <textarea
          id="cust-spec"
          name="specification"
          required
          rows={4}
          className={portalStyle.input}
          placeholder="Describe the change, acceptance criteria, and links."
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className={portalStyle.btnPrimary}
      >
        {pending ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
