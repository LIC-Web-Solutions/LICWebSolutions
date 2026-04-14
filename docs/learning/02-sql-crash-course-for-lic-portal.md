# SQL Crash Course for This Project

This is a focused SQL guide using your own migration and schema so you learn SQL in the same shape as your production app.

## Why SQL matters here

- Your app uses PostgreSQL (hosted on Neon).
- Prisma generates SQL migrations and sends SQL queries under the hood.
- Understanding SQL helps you debug data bugs, performance, and reporting faster than ORM-only knowledge.

## SQL essentials in 15 minutes

## 1) DDL (Data Definition Language)

Defines schema structure:

- `CREATE TABLE`
- `ALTER TABLE`
- `CREATE INDEX`
- `CREATE TYPE` (Postgres enums)

Example from your migration:

- `CREATE TYPE "WorkspaceRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');`
- `CREATE TABLE "WorkspaceMember" (...)`
- `CREATE UNIQUE INDEX "WorkspaceMember_workspaceId_userId_key" ...`

## 2) DML (Data Manipulation Language)

Reads/writes rows:

- `SELECT`, `INSERT`, `UPDATE`, `DELETE`

Prisma equivalent mental map:

- `prisma.workspaceMember.findMany` -> SQL `SELECT ... FROM "WorkspaceMember"...`
- `prisma.ticket.create` -> SQL `INSERT INTO "Ticket"...`
- `prisma.ticket.update` -> SQL `UPDATE "Ticket" SET ...`

## 3) Relational fundamentals

- Primary key (`id`) uniquely identifies a row.
- Foreign key links tables (e.g., `workspaceId` on `Ticket` -> `Workspace.id`).
- Join tables model many-to-many (`WorkspaceMember` between `User` and `Workspace`).
- Indexes speed lookups and filters used often.

## Read your migration like a story

File: `prisma/migrations/20260412170000_init_portal_rbac/migration.sql`

Order tells intent:

1. Create enums (status/role constants)
2. Create tables
3. Add indexes and uniqueness rules
4. Add foreign keys and delete behaviors

This is exactly how your portal domain is represented in SQL.

## SQL examples using your domain

Get all non-archived workspaces for one user:

```sql
SELECT w.id, w.slug, w.name, wm.role
FROM "WorkspaceMember" wm
JOIN "Workspace" w ON w.id = wm."workspaceId"
WHERE wm."userId" = $1
  AND w.status <> 'ARCHIVED'
ORDER BY w.name ASC;
```

Get open tickets by workspace:

```sql
SELECT id, title, status, priority, "createdAt"
FROM "Ticket"
WHERE "workspaceId" = $1
  AND status <> 'CLOSED'
ORDER BY "createdAt" DESC;
```

## Performance basics for your app

- Keep filtering columns indexed (you already index `workspaceId` heavily).
- Prefer query shapes matching existing composite indexes.
- Avoid unbounded list queries in UI pages; add paging as records grow.

## How this pipelines into your job market value

High-signal skills employers look for:

- Ability to model business concepts relationally (you already do this with RBAC + workspaces).
- Writing/debugging joins and indexes.
- Migration discipline (schema evolution without data loss).
- Translating product requirements -> data model -> API behavior.

Practical portfolio evidence you can show:

- A migration-first schema repo with clear docs (`prisma/schema.prisma` + migrations).
- RBAC implementation with tested permissions.
- Dashboard metrics backed by real SQL queries (replace mock admin data).
- Incident story: one query optimization with before/after timings.

## 30-day SQL growth plan (paired with this repo)

Week 1:

- Practice `SELECT`, `JOIN`, `GROUP BY` on your own tables in Prisma Studio + SQL console.

Week 2:

- Write 10 reporting queries for admin needs (MRR-like revenue, overdue invoices, ticket SLA).

Week 3:

- Add indexes for your slowest queries and document reasoning.

Week 4:

- Replace at least one admin mock module with real DB-backed queries and publish the diff as case study.

## Current market signal (external references)

- Stack Overflow 2024 survey reports PostgreSQL as the most-used database among respondents.
- This aligns with continued demand for SQL + Postgres fluency in full-stack/backend roles.

References:

- [Stack Overflow 2024 Developer Survey](https://survey.stackoverflow.co/2024)
- [Survey summary post](https://stackoverflow.blog/2024/07/24/developers-want-more-more-more-the-2024-results-from-stack-overflow-s-annual-developer-survey/)
