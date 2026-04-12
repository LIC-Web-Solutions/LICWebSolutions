import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const clerkUserId = process.env.SEED_CLERK_USER_ID?.trim();
  const user = clerkUserId
    ? await prisma.user.findUnique({ where: { clerkUserId } })
    : await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });

  if (!user) {
    console.error(
      "No User row found. Sign in to the app once (so Clerk sync creates User), then run:\n  pnpm prisma:seed\nOr set SEED_CLERK_USER_ID=user_... to target a specific Clerk user.",
    );
    process.exit(1);
  }

  const workspace = await prisma.workspace.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      slug: "demo",
      name: "Demo workspace",
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: user.id,
      },
    },
    update: { role: "OWNER" },
    create: {
      workspaceId: workspace.id,
      userId: user.id,
      role: "OWNER",
    },
  });

  console.log(
    `Seeded workspace "${workspace.slug}" and OWNER membership for user id=${user.id} (clerkUserId=${user.clerkUserId}). Open /portal`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
