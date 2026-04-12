"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { requireCurrentAppUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseAdminIds(): string[] {
  const raw = process.env.INTERNAL_ADMIN_CLERK_IDS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function assertInternalAdmin() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Not signed in");
  }
  const allowed = parseAdminIds();
  if (allowed.length === 0 || !allowed.includes(userId)) {
    throw new Error("Not authorized");
  }
}

export type BootstrapWorkspaceState = { error: string | null; ok?: boolean };

export async function bootstrapWorkspaceWithState(
  _prev: BootstrapWorkspaceState,
  formData: FormData,
): Promise<BootstrapWorkspaceState> {
  try {
    await assertInternalAdmin();
  } catch {
    return { error: "You are not allowed to use this tool." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();
  if (!name || name.length > 120) {
    return { error: "Workspace name is required (max 120 chars)." };
  }
  if (!slug || slug.length > 80 || !SLUG_RE.test(slug)) {
    return {
      error:
        "Slug must be lowercase letters, numbers, and single hyphens (max 80).",
    };
  }

  const user = await requireCurrentAppUser();

  try {
    const workspace = await prisma.workspace.create({
      data: {
        slug,
        name,
      },
    });

    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        role: "OWNER",
      },
    });

    revalidatePath("/portal");
    revalidatePath(`/portal/${slug}`);
    return { error: null, ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not create workspace.";
    if (msg.includes("Unique constraint")) {
      return { error: "That slug is already taken." };
    }
    return { error: msg };
  }
}
