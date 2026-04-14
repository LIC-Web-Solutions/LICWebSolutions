# `src` Directory Deep Rundown

This document is the direct map of how your app is organized today and what each part does.

## Top-level `src` map

```text
src/
  app/                 # Next.js App Router routes (pages/layouts/api)
  components/          # Reusable UI and feature components
    admin/             # Admin chrome + admin feature UIs
    portal/            # Client portal chrome + shared portal components
    landing/           # Landing/homepage sections
    site/              # Marketing sub-pages components
    ui/                # Design-system primitives
  hooks/               # React hooks
  lib/                 # Server/domain logic (auth, prisma, module mutations)
    auth/              # Authentication + authorization guards
    tickets/           # Ticket mutations/queries
    support/           # Support mutations/queries
    customization/     # Customization request logic
    monitoring/        # Monitoring check logic
    admin/             # Admin data layer (currently includes mock source)
    portal/            # Portal nav utilities
  styles/              # Shared CSS module primitives and tokens
  types/               # Shared TypeScript types
  proxy.ts             # Route protection middleware
```

## Route-level architecture

## Public and marketing

- `src/app/page.tsx`: landing entry route.
- `src/app/(site)/**`: informational/service pages.

## Auth routes

- `src/app/sign-in/[[...sign-in]]/page.tsx`
- `src/app/sign-up/[[...sign-up]]/page.tsx`

## Portal routes (client workspace system)

- `src/app/portal/page.tsx`: workspace chooser.
- `src/app/portal/[workspaceSlug]/page.tsx`: workspace dashboard overview.
- Module routes:
  - `tickets/`
  - `support/`
  - `customization/`
  - `monitoring/`

## Admin routes

- `src/app/admin/layout.tsx`: hard gate via internal admin allow-list.
- `src/app/admin/**`: dashboards/tables/details.
- Current data source is still mixed with `src/lib/admin/mock-data.ts`.

## How interactive dashboard parts work

For portal modules, flow is:

1. Page renders with server-side Prisma query.
2. Form submits to server action in `src/app/portal/.../actions.ts`.
3. Action validates + calls mutation library in `src/lib/...`.
4. Mutation enforces authz (`requirePermission` / workspace guard).
5. Data is written to Postgres.
6. `revalidatePath` refreshes route data.

This is a valid production-style Next.js + Prisma pattern.

## What is real vs demo today

## Real/DB-backed (portal)

- Tickets, Support, Customization, Monitoring, Workspace access checks.

## Still mock/demo (admin)

- Many `src/app/admin/**` pages consume `src/lib/admin/mock-data.ts`.
- Strings in UI explicitly mention `(mock)` in some views.

So your statement "no demos, only valid implementations" is currently not yet met for admin.

## Minimal way to recreate this system from scratch

If rebuilding in simplest valid form:

1. Create auth + app user sync:
   - Clerk middleware + `User` upsert.
2. Create core tables:
   - `User`, `Workspace`, `WorkspaceMember`.
3. Build workspace chooser route.
4. Add one module end-to-end (Tickets):
   - list + create + status update.
5. Add role guard utilities.
6. Replicate pattern for Support/Customization/Monitoring.
7. Build admin panel against the same real tables (no mocks).

This gives a clean, understandable foundation before adding advanced analytics.

## Startup standards: cheap + maintainable checklist

- Keep Neon + Prisma + Clerk (strong speed-to-market stack).
- Avoid duplicate data models between portal and admin.
- Prefer one authoritative mutation layer in `src/lib/**`.
- Keep CSS Modules tokenized (already started).
- Add integration tests for one happy path per module.
- Track mock-removal progress in docs and PR checklist.

## UX and naming standards status

Requested standards:

- Constant spacing and positioning across portal/admin.
- CSS class consistency with BEM naming.

Current status:

- Project has moved strongly toward CSS Modules and shared tokens.
- BEM naming is not yet uniformly enforced in all modules.
- Admin still has styling and data consistency work remaining.

Recommendation:

- Add a short CSS naming convention doc and enforce via PR review checklist.
- Keep module class names semantic and predictable (`block__element--modifier`).
- Run a route-by-route UX baseline audit (header height, spacing rhythm, mobile nav behavior).
