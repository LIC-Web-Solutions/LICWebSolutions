import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";

type ClerkEmail = { email_address?: string };
type ClerkUserPayload = {
  id?: string;
  first_name?: string | null;
  last_name?: string | null;
  email_addresses?: ClerkEmail[];
};

function fullNameFromPayload(data: ClerkUserPayload): string | null {
  const parts = [data.first_name, data.last_name].filter(Boolean);
  if (parts.length === 0) {
    return null;
  }
  return parts.join(" ");
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("CLERK_WEBHOOK_SECRET is not configured", {
      status: 500,
    });
  }

  const h = await headers();
  const svixId = h.get("svix-id");
  const svixTimestamp = h.get("svix-timestamp");
  const svixSignature = h.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();
  let evt: { type: string; data: ClerkUserPayload };
  try {
    evt = new Webhook(secret).verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as { type: string; data: ClerkUserPayload };
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type !== "user.created" && evt.type !== "user.updated") {
    return new Response("Ignored", { status: 200 });
  }

  const data = evt.data;
  const clerkUserId = data.id;
  if (!clerkUserId) {
    return new Response("Missing user id", { status: 400 });
  }

  const email = data.email_addresses?.[0]?.email_address ?? null;
  const fullName = fullNameFromPayload(data);

  await prisma.user.upsert({
    where: { clerkUserId },
    create: {
      clerkUserId,
      email,
      fullName,
    },
    update: {
      email: email ?? undefined,
      fullName: fullName ?? undefined,
    },
  });

  return new Response("OK", { status: 200 });
}
