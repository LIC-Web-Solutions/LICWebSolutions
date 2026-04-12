import { auth, currentUser } from "@clerk/nextjs/server";
import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class AuthenticationError extends Error {
  constructor(message = "User is not authenticated") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export async function requireClerkUserId() {
  const { userId } = await auth();
  if (!userId) {
    throw new AuthenticationError();
  }

  return userId;
}

export async function upsertCurrentAppUser() {
  const clerkUserId = await requireClerkUserId();
  const clerkUser = await currentUser();
  const fallbackFullName = [clerkUser?.firstName, clerkUser?.lastName]
    .filter(Boolean)
    .join(" ");
  const fullName = clerkUser?.fullName ?? (fallbackFullName || null);
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;

  return prisma.user.upsert({
    where: {
      clerkUserId,
    },
    update: {
      email: email ?? undefined,
      fullName: fullName ?? undefined,
    },
    create: {
      clerkUserId,
      email,
      fullName,
    },
  });
}

export async function getCurrentAppUser(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
}

export async function requireCurrentAppUser() {
  const user = await upsertCurrentAppUser();
  if (!user) {
    throw new AuthenticationError("Unable to load application user");
  }

  return user;
}
