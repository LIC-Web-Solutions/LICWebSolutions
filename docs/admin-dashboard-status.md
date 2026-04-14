# Internal admin dashboard (`/admin`) — status and roadmap

## What `/admin` is today

The **`/admin`** area is an **internal LIC** surface: sidebar, dashboard KPIs, clients/projects/invoices/leads UI, and settings placeholders.

| Area | Data source | Persisted to Postgres? |
|------|-------------|-------------------------|
| **`/portal`** (client portal) | Prisma models (`Ticket`, `SupportThread`, etc.) | **Yes** — this is the production client product surface. |
| **`/admin`** | `src/lib/admin/mock-data.ts` (typed fixtures) | **No** — changes in Kanban, tables, and invoice editor are **local UI state** or demo-only; they are not written through Prisma today. |

**Access:** `src/proxy.ts` requires authentication for `/admin`. `src/lib/auth/internal-admin.ts` restricts access to Clerk user ids listed in **`INTERNAL_ADMIN_CLERK_IDS`** (same variable as workspace bootstrap).

## Routes (current)

| Path | Purpose |
|------|---------|
| `/admin` | Dashboard KPIs, activity list, deadlines, revenue chart (mock) |
| `/admin/clients` | Client list (TanStack Table, mock) |
| `/admin/clients/[id]` | Client detail tabs (mock) |
| `/admin/projects` | Kanban + table toggle (mock; drag updates local state only) |
| `/admin/projects/[id]` | Project detail stubs (mock) |
| `/admin/invoices` | Invoice list (mock) |
| `/admin/invoices/[id]` | Invoice editor (local line math; not saved to DB) |
| `/admin/invoices/new` | Stub entry to sample invoice |
| `/admin/leads` | Leads table + sheet (mock) |
| `/admin/settings` | Tabbed forms (disabled / stub integrations) |
| `/admin/messages` | Phase 2 placeholder |

Primary nav emphasizes **Dashboard, Clients, Projects, Invoices**; Leads, Messages, and Settings are grouped under **More** in the sidebar.

## Making `/admin` “real” (high-level phases)

This is **not** implemented yet; it is the natural next step if LIC wants one database for agency ops and client portal together.

1. **Schema** — Add Prisma models (or reuse existing ones) for agency entities you want in-house: e.g. CRM-style `Client`, `Project`, `Invoice` if they are not already represented by `Workspace` / `Project` / other tables. Align naming with existing `Workspace` if clients and “clients” in admin are the same entity.
2. **Server actions / API** — CRUD with `requireInternalAdmin()` (or a future role model), audit logging where needed.
3. **Wire pages** — Replace imports from `mock-data.ts` with Prisma queries; keep components where possible.
4. **Integrations (optional)** — Stripe, accounting, or PM tools via webhooks instead of rebuilding everything.

Until those phases ship, treat **`/admin` as an internal prototype** and rely on **`/portal`** for client-facing truth.
