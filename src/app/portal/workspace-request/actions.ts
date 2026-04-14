"use server";

import { revalidatePath } from "next/cache";
import { createWorkspaceRequest } from "@/lib/workspace-requests/workspace-request-mutations";

export type WorkspaceRequestState = { error: string | null; ok?: boolean };

export async function createWorkspaceRequestWithState(
  _prev: WorkspaceRequestState,
  formData: FormData,
): Promise<WorkspaceRequestState> {
  const proposedName = String(formData.get("proposedName") ?? "");
  const proposedSlug = String(formData.get("proposedSlug") ?? "");
  const inviteEmailsRaw = String(formData.get("inviteEmailsRaw") ?? "");

  try {
    await createWorkspaceRequest({
      proposedName,
      proposedSlug,
      inviteEmailsRaw,
    });
    revalidatePath("/portal/workspace-request");
    revalidatePath("/admin/workspace-requests");
    return { error: null, ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not submit workspace request.";
    return { error: message };
  }
}
