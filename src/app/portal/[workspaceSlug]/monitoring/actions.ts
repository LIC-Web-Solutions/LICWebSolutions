"use server";

import { revalidatePath } from "next/cache";
import { createMonitoringCheckForWorkspaceSlug } from "@/lib/monitoring/monitoring-mutations";

export type MonitoringFormState = { error: string | null };

export async function createMonitoringCheckWithState(
  _prev: MonitoringFormState,
  formData: FormData,
): Promise<MonitoringFormState> {
  const workspaceSlug = String(formData.get("workspaceSlug") ?? "").trim();
  const endpoint = String(formData.get("endpoint") ?? "");
  if (!workspaceSlug) {
    return { error: "Missing workspace." };
  }
  try {
    await createMonitoringCheckForWorkspaceSlug(workspaceSlug, endpoint);
    revalidatePath(`/portal/${workspaceSlug}/monitoring`);
    return { error: null };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not add check.",
    };
  }
}
