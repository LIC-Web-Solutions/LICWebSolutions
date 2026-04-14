"use server";

import { revalidatePath } from "next/cache";
import {
  approveWorkspaceRequest,
  rejectWorkspaceRequest,
} from "@/lib/workspace-requests/workspace-request-mutations";

export async function approveWorkspaceRequestAction(formData: FormData) {
  const requestId = String(formData.get("requestId") ?? "").trim();
  const adminNote = String(formData.get("adminNote") ?? "");
  if (!requestId) {
    throw new Error("Missing workspace request id.");
  }
  await approveWorkspaceRequest(requestId, adminNote);
  revalidatePath("/admin/workspace-requests");
  revalidatePath("/portal");
}

export async function rejectWorkspaceRequestAction(formData: FormData) {
  const requestId = String(formData.get("requestId") ?? "").trim();
  const adminNote = String(formData.get("adminNote") ?? "");
  if (!requestId) {
    throw new Error("Missing workspace request id.");
  }
  await rejectWorkspaceRequest(requestId, adminNote);
  revalidatePath("/admin/workspace-requests");
}
