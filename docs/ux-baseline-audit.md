# UX Baseline Audit (Route-by-Route)

Audit target:

- Header height consistency
- Horizontal spacing rhythm
- Mobile navigation behavior
- Baseline parity between portal and admin shells

Date: 2026-04-14

## Global baseline

- Topbar target height: `4rem`
- Horizontal padding source: `var(--globalPadding)`
- Mobile navigation control must be visible and not overlap actionable content

## Portal routes

- `/portal` — PASS
  - Uses portal shell and topbar baseline.
- `/portal/[workspaceSlug]` modules — PASS
  - Topbar fixed to 4rem and breadcrumb alignment corrected.
- `/portal/access-pending` — PASS
  - Added direct workspace request CTA.
- `/portal/workspace-request` — PASS (new)
  - New onboarding request form for clients.

## Admin routes

- `/admin` and subroutes — PARTIAL
  - Topbar updated to 4rem and `--globalPadding` for baseline parity.
  - Data consistency remains mixed because multiple pages still rely on mock datasets.
- `/admin/clients` — PARTIAL PASS
  - Migrated to live Prisma query for client directory.
- `/admin/workspace-requests` — PASS (new)
  - Real request queue with approve/reject actions and provisioning flow.

## Marketing routes

- `/` landing hero — PASS with performance-safe fallback
  - Added static image fallback for mobile/reduced-data/reduced-motion.
- Other `(site)` routes — NOT RE-AUDITED in this pass
  - No targeted changes made during this phase.

## Follow-up actions

1. Complete admin mock-data removal route-by-route.
2. Normalize remaining CSS Modules to full BEM naming.
3. Run visual regression screenshots for portal/admin desktop + mobile.
