-- CreateEnum
CREATE TYPE "WorkspaceRequestStatus" AS ENUM ('NEW', 'IN_REVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "WorkspaceRequest" (
    "id" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "proposedName" VARCHAR(120) NOT NULL,
    "proposedSlug" VARCHAR(80) NOT NULL,
    "inviteEmailsCsv" TEXT,
    "status" "WorkspaceRequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNote" TEXT,
    "approvedWorkspaceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceRequestInvite" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "invitedUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceRequestInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkspaceRequest_status_createdAt_idx" ON "WorkspaceRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "WorkspaceRequest_requestedById_createdAt_idx" ON "WorkspaceRequest"("requestedById", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceRequest_proposedSlug_status_key" ON "WorkspaceRequest"("proposedSlug", "status");

-- CreateIndex
CREATE INDEX "WorkspaceRequestInvite_requestId_idx" ON "WorkspaceRequestInvite"("requestId");

-- CreateIndex
CREATE INDEX "WorkspaceRequestInvite_email_idx" ON "WorkspaceRequestInvite"("email");

-- CreateIndex
CREATE INDEX "WorkspaceRequestInvite_invitedUserId_idx" ON "WorkspaceRequestInvite"("invitedUserId");

-- AddForeignKey
ALTER TABLE "WorkspaceRequest" ADD CONSTRAINT "WorkspaceRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceRequest" ADD CONSTRAINT "WorkspaceRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceRequestInvite" ADD CONSTRAINT "WorkspaceRequestInvite_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "WorkspaceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceRequestInvite" ADD CONSTRAINT "WorkspaceRequestInvite_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
