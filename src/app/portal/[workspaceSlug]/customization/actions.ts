"use server";

import { revalidatePath } from "next/cache";
import {
  approveCustomizationRequestForWorkspaceSlug,
  createCustomizationRequestForWorkspaceSlug,
} from "@/lib/customization/customization-mutations";

export type CustomizationFormState = { error: string | null };

export async function createCustomizationWithState(
  _prev: CustomizationFormState,
  formData: FormData,
): Promise<CustomizationFormState> {
  const workspaceSlug = String(formData.get("workspaceSlug") ?? "").trim();
  if (!workspaceSlug) {
    return { error: "Missing workspace." };
  }
  const type = String(formData.get("type") ?? "");
  const specification = String(formData.get("specification") ?? "");
  try {
    await createCustomizationRequestForWorkspaceSlug(workspaceSlug, {
      type,
      specification,
    });
    revalidatePath(`/portal/${workspaceSlug}/customization`);
    return { error: null };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not create request.",
    };
  }
}

export async function approveCustomizationAction(
  workspaceSlug: string,
  requestId: string,
) {
  await approveCustomizationRequestForWorkspaceSlug(workspaceSlug, requestId);
  revalidatePath(`/portal/${workspaceSlug}/customization`);
}
