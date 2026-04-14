# Prisma, Neon, Clerk in This Project

This is a practical walkthrough of how authentication, authorization, and database access connect in your codebase.

## Mental model (simple)

1. `Clerk` proves **who** the user is.
2. `Prisma` + `Postgres (Neon)` store **what** that user can access.
3. Workspace roles enforce **which actions** are allowed.

## Prisma directory explained

```text
prisma/
  schema.prisma                           # Manual: data model + relations + enums
  seed.ts                                 # Manual: seed workflow for local/dev data
  migration_lock.toml                     # Generated: migration state metadata
  migrations/
    20260412170000_init_portal_rbac/
      migration.sql                       # Generated SQL from schema change
```

## How Prisma is wired

- `prisma/schema.prisma`: defines all models and enum constraints.
- `src/lib/prisma.ts`: creates singleton `PrismaClient` and reads `DATABASE_URL`.
- `package.json` scripts:
  - `prisma:migrate:dev`
  - `prisma:migrate:deploy`
  - `prisma:generate`
  - `prisma:seed`

### About `prisma/seed.ts` in this project

- Yes, this is currently a **dev bootstrap** path that creates/attaches a demo workspace.
- It is useful for local smoke testing and onboarding.
- It is **not** the production client onboarding workflow.
- Production-style onboarding is now implemented via workspace requests:
  - Client request route: `/portal/workspace-request`
  - Admin review queue: `/admin/workspace-requests`

## How Clerk is wired

- `src/components/providers.tsx` wraps app with `ClerkProvider`.
- `src/proxy.ts` protects `/portal/**` and `/admin/**`.
- `src/lib/auth/session.ts` maps Clerk identity -> app `User` row (`upsertCurrentAppUser`).
- `src/app/api/webhooks/clerk/route.ts` also upserts users on `user.created` / `user.updated`.

## How Neon is used here

- Neon is the hosted Postgres behind `DATABASE_URL`.
- Prisma connects to Neon using standard Postgres connection string in env.
- No Neon-specific SDK usage in runtime app logic currently; usage is via PostgreSQL protocol through Prisma.

## AuthN vs AuthZ in your code

### Authentication (AuthN)

- Route guard in `src/proxy.ts` calls `auth.protect()`.
- If user is not signed in, Clerk redirects to sign-in flow.

### Authorization (AuthZ)

- Workspace scoped guard:
  - `src/lib/auth/guards.ts`
  - `requireWorkspaceAccess(workspaceSlug)`
  - `requirePermission(workspaceSlug, permission)`
- Internal admin gate:
  - `src/lib/auth/internal-admin.ts`
  - checks `INTERNAL_ADMIN_CLERK_IDS`

## Real portal functionality (DB-backed now)

These portal areas use DB writes via server actions + mutation libs:

- Tickets: `src/app/portal/[workspaceSlug]/tickets/actions.ts`
- Support: `src/app/portal/[workspaceSlug]/support/actions.ts`
- Customization: `src/app/portal/[workspaceSlug]/customization/actions.ts`
- Monitoring: `src/app/portal/[workspaceSlug]/monitoring/actions.ts`
- Internal workspace bootstrap: `src/app/portal/internal/workspace-bootstrap/actions.ts`

## Important gap: admin still mock-backed

Admin dashboard still imports mock datasets from `src/lib/admin/mock-data.ts` in multiple routes under `src/app/admin/**`.

That means:

- Portal modules are mostly real and DB-backed.
- Admin dashboard is not yet fully production-backed.
