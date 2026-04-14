# Portal/Admin Foundation Roadmap (No-Demo Target)

This is the practical path to your intended model:

- Clients request workspace/project onboarding.
- Admin reviews, approves, assigns, and provisions workspace.
- Client and admin collaborate through real operational modules.

## Target business flow

1. Client account signs in.
2. Client submits workspace request (survey + project requirements + payment intent).
3. Admin receives request in admin queue.
4. Admin approves/rejects/requests clarification.
5. On approval, workspace is created and linked to client membership.
6. Portal modules become active for that workspace.

## Data model additions (recommended)

Add a dedicated onboarding request entity (example):

- `WorkspaceRequest`
  - `id`
  - `requestedByUserId`
  - `proposedName`
  - `desiredSlug`
  - `businessGoals`
  - `scopeSummary`
  - `budgetRange`
  - `timelinePreference`
  - `paymentPreference`
  - `status` (`NEW`, `IN_REVIEW`, `APPROVED`, `REJECTED`, `NEEDS_INFO`)
  - `adminNotes`
  - timestamps

This avoids overloading existing module tables for onboarding use cases.

## Minimal fully-functional modules to keep

- Tickets (delivery/issues)
- Support (communication thread)
- Customization (change requests)
- Workspace request onboarding (new)
- Admin request queue and approval workflow (new)

## Redundancy to remove

- Any admin page powered by static mock arrays once real query exists.
- Duplicate card metrics not tied to real table queries.
- Placeholder status labels that do not map to enum/data states.

## Payment and onboarding notes

Clerk provides auth and identity; it is not your billing processor by default.

- Keep payment provider decision separate (e.g., Stripe) and store payment metadata in DB.
- Integrate payment step inside onboarding request flow once request model exists.

## Industry-standard architecture shape (lean startup)

- App Router server components for data reads.
- Server actions for writes with validation.
- AuthZ centralized in `src/lib/auth`.
- Prisma migrations as single source for schema evolution.
- Feature modules in `src/lib/<domain>` reused by portal + admin.

## Suggested execution order

1. Build `WorkspaceRequest` schema + migration.
2. Create client onboarding form route.
3. Create admin request queue page (real DB-backed).
4. Create admin approve action that provisions workspace + membership.
5. Replace one admin dashboard panel with real metrics from DB.
6. Remove corresponding mock dataset usage.

## Phase 1 execution status (2026-04-14)

- Done: `WorkspaceRequest` schema + migration added.
- Done: client route `/portal/workspace-request` with form for workspace name + invite emails.
- Done: admin route `/admin/workspace-requests` with approve/reject flow.
- Done: approval action provisions workspace and grants memberships.
- Done: one admin module (`/admin/clients`) moved from mock import to Prisma-backed query.
- Done: UX baseline docs/checklist added and admin topbar updated to 4rem baseline.

## Phase 2 execution status (2026-04-14)

- Done: removed remaining `src/app/admin/**` imports from `src/lib/admin/mock-data.ts`.
- Done: added Prisma-backed admin read models in `src/lib/admin/read-models.ts`.
- Done: rewired admin routes to live DB-backed data:
  - `/admin`
  - `/admin/projects`
  - `/admin/projects/[id]`
  - `/admin/invoices`
  - `/admin/invoices/[id]`
  - `/admin/leads`
  - `/admin/clients/[id]`
- Done: refreshed route copy to remove mock-language references in these admin views.

## Phase 3 execution status (2026-04-14)

- Done: added stricter BEM-style module structure for key admin views:
  - `src/app/admin/AdminDashboardPage.module.css`
  - `src/app/admin/projects/ProjectDetailPage.module.css`
- Done: updated admin dashboard and project detail pages to use semantic module classes.
- Done: tightened admin read-model semantics:
  - invoice status mapping now aligns with customization lifecycle states
  - lead estimated value defaults to neutral `0` rather than parsing notes
- Done: added mutation-level tests for workspace onboarding lifecycle:
  - `src/lib/workspace-requests/workspace-request-mutations.test.ts`

## UI and module simplification pass (2026-04-14)

- Done: unified admin/portal sidebar behavior with in-sidebar burger toggles for open/close.
- Done: replaced sidebar "Marketing site" links with explicit leave actions.
- Done: removed `Support`, `Customization`, and `Monitoring` from active portal navigation.
- Done: added direct redirects from removed module routes to `/tickets`.
- Done: workspace overview now highlights operational profile data:
  - hosting provider inference
  - primary domain
  - contact emails
  - environment + repository context
- Done: clarified sidebar workspace metadata labels:
  - `Workspace display name`
  - `Workspace URL slug` (`/slug`)
  - rename requests routed through ticket workflow.

## Definition of done for "no demos"

- Zero imports from `src/lib/admin/mock-data.ts` in `src/app/admin/**`.
- All key dashboard cards read from Prisma queries.
- Every mutation path guarded by workspace role or internal-admin guard.
- UX baseline checks pass for header/layout spacing across portal/admin.
