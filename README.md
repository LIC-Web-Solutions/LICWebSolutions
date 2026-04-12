# LIC Web Solutions

Marketing and site for LIC Web Solutions, built with the [Next.js](https://nextjs.org) App Router.

**Repository:** [github.com/LIC-Web-Solutions/LICWebSolutions](https://github.com/LIC-Web-Solutions/LICWebSolutions)

## Prerequisites

- [Node.js](https://nodejs.org/) **20.9+** (see `engines` in `package.json`; `[.node-version](.node-version)` / `[.nvmrc](.nvmrc)` pin **20.9.0** for nvm, fnm, Volta, asdf, etc.)
- [Corepack](https://nodejs.org/api/corepack.html) (ships with Node) so the repo’s pnpm version is used automatically

Enable Corepack once per machine (uses the `packageManager` field in `package.json`, including its integrity hash):

```bash
corepack enable
```

## Package manager (pnpm only)

This project is locked with `**pnpm-lock.yaml**`. Use **pnpm** for installs and dependency changes—do **not** run `npm install` or `yarn` in this repo (that creates conflicting lockfiles and inconsistent `node_modules`). CI fails if `package-lock.json` or `yarn.lock` is committed.

- Install: `pnpm install`
- Add: `pnpm add <pkg>` / dev: `pnpm add -D <pkg>`
- Remove: `pnpm remove <pkg>`
- Update lockfile after editing `package.json`: `pnpm install`

CI runs `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build` on every push and pull request to `main`.

## Switching machines (macOS / Windows / Linux)

1. Use **Node 20.9+** (see `[.node-version](.node-version)`).
2. Run `**corepack enable`**, then `**pnpm install**` from the repo root (never `npm install` / `yarn`).
3. After `**git pull**`, run `**pnpm install**` again if `pnpm-lock.yaml` changed.
4. If the dev server behaves oddly, clear the Next cache and restart (see [Troubleshooting](#troubleshooting)).
5. **Line endings:** This repo includes `[.gitattributes](.gitattributes)`. Committed attributes apply to everyone and override personal `core.autocrlf` for these paths. If you still see huge diffs after a clone, read [Configuring Git to handle line endings](https://docs.github.com/en/get-started/git-basics/configuring-git-to-handle-line-endings). After `.gitattributes` changes, maintainers run `git add --renormalize .` once and commit the normalization.
6. **Optional global Git (outside this repo):** GitHub documents `core.autocrlf` defaults per OS; with `.gitattributes` in place, the repo stays consistent even if globals differ.

## Setup

```bash
pnpm install
```

## Scripts


| Command                   | Description                               |
| ------------------------- | ----------------------------------------- |
| `pnpm dev`                | Start the development server              |
| `pnpm build`              | Production build                          |
| `pnpm start`              | Run the production server (after `build`) |
| `pnpm lint`               | Run [Biome](https://biomejs.dev/) checks  |
| `pnpm format`             | Format with Biome                         |
| `pnpm test`               | Run auth and RBAC regression tests        |
| `pnpm prisma:generate`    | Generate Prisma client                    |
| `pnpm prisma:migrate:dev` | Apply or evolve migrations in development |
| `pnpm prisma:migrate:deploy` | Apply pending migrations (production / CI DB) |
| `pnpm prisma:seed`        | Dev: attach your user to the `demo` workspace as `OWNER` |
| `pnpm prisma:studio`      | Explore data in Prisma Studio             |


Development defaults to [http://localhost:3000](http://localhost:3000). App routes and pages live under `src/app/`.

## Authentication and authorization

The marketing site stays public. Portal routes under `**/portal/****` require authentication and use workspace-scoped RBAC authorization for feature access.

### Environment variables

Copy `[.env.example](.env.example)` to `**.env.local**` (gitignored) and set:


| Variable                            | Where it is used                                          |
| ----------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Browser / Next.js client                                  |
| `CLERK_SECRET_KEY`                  | Server and Next.js proxy (never expose in client bundles) |
| `DATABASE_URL`                      | Prisma PostgreSQL connection string                       |
| `CLERK_WEBHOOK_SECRET`              | Verifies `POST /api/webhooks/clerk` (optional)            |
| `INTERNAL_ADMIN_CLERK_IDS`          | Comma-separated Clerk user ids for workspace bootstrap UI |

Prisma’s CLI only auto-loads **`.env`** by default. This repo wires **`pnpm prisma:*`** and **`postinstall`** through [`dotenv-cli`](https://github.com/entropitor/dotenv-cli) so **`.env`** is loaded first, then **`.env.local`** (later wins). Put `DATABASE_URL` in `.env.local` next to your Clerk keys.

### Database migrations

Committed migrations live under `prisma/migrations/`. After `DATABASE_URL` points at a reachable Postgres database, apply them once:

```bash
pnpm prisma:migrate:dev
```

That syncs the database (creates `User`, `Workspace`, and the rest of the portal schema). If migrate previously failed with **P1012** (`Environment variable not found: DATABASE_URL`), set `DATABASE_URL` in `.env.local` and run the command again.

For production or CI deploy steps, use:

```bash
pnpm prisma:migrate:deploy
```

If `/portal` errors with **P2021** (`The table public.User does not exist`), migrations were never applied against that database.

### Granting portal access (not in Clerk)

Workspace access is stored in **Postgres**, not in the Clerk Dashboard. A signed-in user must have a **`WorkspaceMember`** row linking their app **`User`** (created on first sign-in) to a **`Workspace`**.

- **`/portal/access-pending`** — you are signed in but have **no** workspace memberships. An admin adds you by creating `Workspace` + `WorkspaceMember` (e.g. in [Prisma Studio](https://www.prisma.io/studio): `pnpm prisma:studio`).
- **`/portal/access-denied`** — you opened **`/portal/[some-slug]/...`** but there is **no** membership for that slug (wrong URL, or you were never added to that workspace). Go to **`/portal`** to see the chooser or pending state.

**Local development:** after you have signed in once (so a `User` row exists), run:

```bash
pnpm prisma:seed
```

That upserts workspace slug **`demo`**, name **Demo workspace**, and makes you **`OWNER`**. Optional: set **`SEED_CLERK_USER_ID`** to your Clerk user id (e.g. `user_2abc...`) if you have multiple `User` rows and want to target one.

In the Clerk application, set **Sign-in URL** to `/sign-in`, **Sign-up URL** to `/sign-up`, and **After sign-in** (and optionally **After sign-up**) to `/portal` so users land in the workspace selector after authenticating.

### Portal route model

- `/portal`: workspace chooser; redirects directly when the user only has one workspace
- `/portal/access-pending`: signed-in users with no workspace assignment
- `/portal/access-denied`: users who are signed in but fail workspace or permission checks
- `/portal/[workspaceSlug]`: workspace overview
- `/portal/[workspaceSlug]/tickets`
- `/portal/[workspaceSlug]/support`
- `/portal/[workspaceSlug]/customization`
- `/portal/[workspaceSlug]/monitoring`
- `/portal/internal/workspace-bootstrap`: internal tool to create a workspace (see below)

### Portal modules (implemented)

Each workspace module uses **server actions** scoped with `requirePermission` / `requireWorkspaceAccess`, **`recordActionEvent`** for mutations where applicable, and read-only views for roles with **`:view`** permissions (e.g. `VIEWER` can open tickets/support/customization but cannot create unless the permission matrix allows it).

### Internal workspace bootstrap (pre-production)

For developers or operators who should not use SQL/Studio: set **`INTERNAL_ADMIN_CLERK_IDS`** in `.env.local` to a comma-separated list of **Clerk user ids** (from the Clerk Dashboard or the `sub` on the session). Then open **`/portal/internal/workspace-bootstrap`** while signed in as one of those users to create a new **`Workspace`** and **`WorkspaceMember`** row as **OWNER**. Remove or restrict this route before exposing the app broadly.

### Clerk webhooks (optional)

Configure a Clerk webhook endpoint pointing to **`/api/webhooks/clerk`** and set **`CLERK_WEBHOOK_SECRET`** to the webhook signing secret. The handler processes **`user.created`** and **`user.updated`** and upserts the Prisma **`User`** row so accounts exist before the first portal visit.

**Invite-only:** In the Clerk Dashboard, disable public sign-up when you no longer want open registration; no app code change is required.

### RBAC policy (workspace-scoped)

Roles: `OWNER`, `ADMIN`, `MEMBER`, `VIEWER`


| Permission               | OWNER | ADMIN | MEMBER | VIEWER |
| ------------------------ | ----- | ----- | ------ | ------ |
| `tickets:view`           | Yes   | Yes   | Yes    | Yes    |
| `tickets:create`         | Yes   | Yes   | Yes    | No     |
| `tickets:assign`         | Yes   | Yes   | No     | No     |
| `support:view`           | Yes   | Yes   | Yes    | Yes    |
| `support:create`         | Yes   | Yes   | Yes    | No     |
| `support:resolve`        | Yes   | Yes   | No     | No     |
| `customization:view`     | Yes   | Yes   | Yes    | Yes    |
| `customization:create`   | Yes   | Yes   | Yes    | No     |
| `customization:approve`  | Yes   | Yes   | No     | No     |
| `monitoring:view`        | Yes   | Yes   | Yes    | Yes    |
| `monitoring:manage`      | Yes   | Yes   | No     | No     |
| `members:manage`         | Yes   | Yes   | No     | No     |


### Security guard expectations

- Next.js proxy ([`src/proxy.ts`](src/proxy.ts)) protects all `/portal/**` routes from unauthenticated access.
- Server guards enforce workspace membership and permissions before rendering module pages.
- Data access must always include `workspaceId` constraints to avoid cross-tenant leakage.
- Run `pnpm test` before merges to validate unauthorized and cross-workspace guard regressions.

### Vercel and CI

Add the same two variables to **Vercel** for Preview and Production.

**GitHub Actions:** `pnpm build` loads `[src/proxy.ts](src/proxy.ts)` (Next.js “proxy”, formerly `middleware`) and needs Clerk keys at build time. Add [repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) named `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` with the same values as in `.env.local`. Without them, the **Build** step in `[.github/workflows/ci.yml](.github/workflows/ci.yml)` will fail.

The workflow sets a **placeholder** `DATABASE_URL` during install so `postinstall` → `prisma generate` can read the schema. It does not migrate a real database in CI.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- Biome (lint/format)

## Troubleshooting

If the dev server shows stale routes, blank pages, or odd caching behavior, stop the server, remove the Next.js cache, and start again:

```bash
rm -rf .next
pnpm dev
```

On Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force .next
pnpm dev
```

## Deploy

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying). [Vercel](https://vercel.com) is a common host for Next.js apps.

### When you are ready for production

1. **Postgres:** Provision a managed database and set **`DATABASE_URL`** on the host (same shape as local).
2. **Migrations:** Run **`pnpm prisma:migrate:deploy`** against that database in your release pipeline or a one-off step before traffic hits the new version (not only `pnpm build`).
3. **Clerk:** Create a **production** Clerk application; set **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`** and **`CLERK_SECRET_KEY`** for production; configure paths and redirects as in [Authentication and authorization](#authentication-and-authorization).
4. **Webhooks (optional):** Point Clerk webhooks at **`https://your-domain/api/webhooks/clerk`** and set **`CLERK_WEBHOOK_SECRET`** in the server environment.
5. **Never** run **`pnpm prisma:seed`** against production data unless you intend to mutate prod.

Add **`DATABASE_URL`** (and optional webhook/admin secrets) to GitHub Actions if you later run integration tests or migrate from CI against a real database; the default workflow only uses a placeholder URL for `prisma generate`.