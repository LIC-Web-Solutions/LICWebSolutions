"use server";

import { revalidatePath } from "next/cache";
import {
  addSupportMessageForWorkspaceSlug,
  createSupportThreadForWorkspaceSlug,
  setSupportThreadStatusForWorkspaceSlug,
} from "@/lib/support/support-mutations";

export type SupportThreadFormState = { error: string | null };

export async function createSupportThreadWithState(
  _prev: SupportThreadFormState,
  formData: FormData,
): Promise<SupportThreadFormState> {
  const workspaceSlug = String(formData.get("workspaceSlug") ?? "").trim();
  const subject = String(formData.get("subject") ?? "");
  if (!workspaceSlug) {
    return { error: "Missing workspace." };
  }
  try {
    await createSupportThreadForWorkspaceSlug(workspaceSlug, subject);
    revalidatePath(`/portal/${workspaceSlug}/support`);
    return { error: null };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not create thread.",
    };
  }
}

export type SupportMessageFormState = { error: string | null };

export async function addSupportMessageWithState(
  _prev: SupportMessageFormState,
  formData: FormData,
): Promise<SupportMessageFormState> {
  const workspaceSlug = String(formData.get("workspaceSlug") ?? "").trim();
  const threadId = String(formData.get("threadId") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  if (!workspaceSlug || !threadId) {
    return { error: "Missing fields." };
  }
  try {
    await addSupportMessageForWorkspaceSlug(workspaceSlug, threadId, body);
    revalidatePath(`/portal/${workspaceSlug}/support`);
    return { error: null };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not add message.",
    };
  }
}

export async function resolveSupportThreadAction(
  workspaceSlug: string,
  threadId: string,
) {
  await setSupportThreadStatusForWorkspaceSlug(
    workspaceSlug,
    threadId,
    "RESOLVED",
  );
  revalidatePath(`/portal/${workspaceSlug}/support`);
}
