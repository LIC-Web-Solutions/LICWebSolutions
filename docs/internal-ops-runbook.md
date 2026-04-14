# LIC internal ops runbook

This runbook is for **LIC operators and developers**: how to run the app, provision clients on the **real** client portal (`/portal`), and use internal tools safely.

Related docs:

- [Client portal user guide](./client-portal-user-guide.md) — what clients see
- [Admin dashboard status](./admin-dashboard-status.md) — what `/admin` is today vs future
- [Portal architecture](./portal-architecture.md) — code and data flow

## Environment (no secrets in repo)

Copy [`.env.example`](../.env.example) to `.env.local` and set at minimum:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk browser SDK |
| `CLERK_SECRET_KEY` | Clerk server / proxy |
| `DATABASE_URL` | Postgres for Prisma (e.g. Neon) |
| `CLERK_WEBHOOK_SECRET` | Optional; verifies `POST /api/webhooks/clerk` |
| `INTERNAL_ADMIN_CLERK_IDS` | Comma-separated Clerk user ids allowed for `/admin` and `/portal/internal/workspace-bootstrap` |

Never commit `.env.local` or real keys.

## Database: first-time and production

1. Point `DATABASE_URL` at a reachable Postgres instance.
2. Apply migrations:
   - Local: `pnpm prisma:migrate:dev`
   - Production / CI deploy: `pnpm prisma:migrate:deploy`
3. If `/portal` fails with missing tables (e.g. P2021), migrations were not applied to that database.

## Giving a client access to `/portal`

Workspace access lives in **Postgres**, not Clerk org settings alone.

1. Ensure the person has signed in **once** so a `User` row exists (or enable the Clerk webhook so `User` is created on `user.created` / `user.updated` — see `src/app/api/webhooks/clerk/route.ts`).
2. Create or reuse a `Workspace` (name + unique `slug`).
3. Create a `WorkspaceMember` linking that `User` to the `Workspace` with the correct `WorkspaceRole`.

**Ways to do step 2–3:**

- **Prisma Studio:** `pnpm prisma:studio` (good for one-off fixes).
- **Workspace bootstrap UI:** `/portal/internal/workspace-bootstrap` — only if the operator’s Clerk user id is in `INTERNAL_ADMIN_CLERK_IDS`. Creates a workspace and adds the operator as OWNER; adjust membership in Studio if the client should be a different role.

**Local dev shortcut:** after the developer has signed in once, `pnpm prisma:seed` attaches them to the `demo` workspace as OWNER (see README).

## Clerk Dashboard settings (recommended)

- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up` (or disable public sign-up when invite-only)
- After sign-in (and optionally after sign-up): `/portal`

## Internal admin (`/admin`)

- Requires the same Clerk session as the portal, plus **`INTERNAL_ADMIN_CLERK_IDS`**.
- Today it is largely **mock UI** for agency workflows; it does **not** replace Prisma-backed portal data. See [admin-dashboard-status.md](./admin-dashboard-status.md).

## Smoke checks before you tell a client “it’s live”

1. Marketing → Client login → `/sign-in` → `/portal`.
2. Open their workspace slug → dashboard KPIs load without error.
3. Spot-check each module URL under `/portal/[slug]/…` with a test account in the same role tier as the client.
4. Confirm a non-member cannot open another workspace’s URL (expect access denied).

## Support escalation

- **Access pending:** add `WorkspaceMember` (or correct workspace slug).
- **Wrong role / cannot create tickets:** adjust `WorkspaceRole` or document expected behavior using the permission matrix in the README.
