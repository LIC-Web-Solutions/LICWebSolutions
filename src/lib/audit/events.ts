import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface RecordActionEventArgs {
  workspaceId: string;
  action: string;
  targetType: string;
  targetId?: string;
  actorId?: string | null;
  metadata?: Prisma.InputJsonValue;
}

export async function recordActionEvent({
  workspaceId,
  action,
  targetType,
  targetId,
  actorId,
  metadata,
}: RecordActionEventArgs) {
  return prisma.actionEvent.create({
    data: {
      workspaceId,
      actorId: actorId ?? null,
      action,
      targetType,
      targetId: targetId ?? null,
      metadata: metadata === undefined ? undefined : metadata,
    },
  });
}
