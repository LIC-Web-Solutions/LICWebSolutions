"use server";

import type { TicketPriority, TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  createTicketForWorkspaceSlug,
  updateTicketStatusForWorkspaceSlug,
} from "@/lib/tickets/ticket-mutations";

const PRIORITIES = new Set<TicketPriority>(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export type CreateTicketFormState = { error: string | null };

export async function createTicketWithState(
  _prev: CreateTicketFormState,
  formData: FormData,
): Promise<CreateTicketFormState> {
  const workspaceSlug = String(formData.get("workspaceSlug") ?? "").trim();
  if (!workspaceSlug) {
    return { error: "Missing workspace." };
  }

  const title = String(formData.get("title") ?? "");
  const descriptionRaw = formData.get("description");
  const description =
    descriptionRaw === null || descriptionRaw === ""
      ? null
      : String(descriptionRaw);
  const rawPriority = String(formData.get("priority") ?? "MEDIUM");
  const priority = (
    PRIORITIES.has(rawPriority as TicketPriority) ? rawPriority : "MEDIUM"
  ) as TicketPriority;

  try {
    await createTicketForWorkspaceSlug(workspaceSlug, {
      title,
      description,
      priority,
    });
    revalidatePath(`/portal/${workspaceSlug}/tickets`);
    return { error: null };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not create ticket.";
    return { error: message };
  }
}

export async function updateTicketStatusAction(
  workspaceSlug: string,
  ticketId: string,
  status: TicketStatus,
) {
  await updateTicketStatusForWorkspaceSlug(workspaceSlug, ticketId, status);
  revalidatePath(`/portal/${workspaceSlug}/tickets`);
}
