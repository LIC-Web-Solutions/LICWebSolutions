# LIC Web Solutions

Marketing and site for LIC Web Solutions, built with the [Next.js](https://nextjs.org) App Router.

**Repository:** [github.com/LIC-Web-Solutions/LICWebSolutions](https://github.com/LIC-Web-Solutions/LICWebSolutions)

## Prerequisites

- [Node.js](https://nodejs.org/) **20.9+** (see `engines` in `package.json`; [`.node-version`](.node-version) / [`.nvmrc`](.nvmrc) pin **20.9.0** for nvm, fnm, Volta, asdf, etc.)
- [Corepack](https://nodejs.org/api/corepack.html) (ships with Node) so the repo’s pnpm version is used automatically

Enable Corepack once per machine (uses the `packageManager` field in `package.json`, including its integrity hash):

```bash
corepack enable
```

## Package manager (pnpm only)

This project is locked with **`pnpm-lock.yaml`**. Use **pnpm** for installs and dependency changes—do **not** run `npm install` or `yarn` in this repo (that creates conflicting lockfiles and inconsistent `node_modules`). CI fails if `package-lock.json` or `yarn.lock` is committed.

- Install: `pnpm install`
- Add: `pnpm add <pkg>` / dev: `pnpm add -D <pkg>`
- Remove: `pnpm remove <pkg>`
- Update lockfile after editing `package.json`: `pnpm install`

CI runs `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build` on every push and pull request to `main`.

## Switching machines (macOS / Windows / Linux)

1. Use **Node 20.9+** (see [`.node-version`](.node-version)).
2. Run **`corepack enable`**, then **`pnpm install`** from the repo root (never `npm install` / `yarn`).
3. After **`git pull`**, run **`pnpm install`** again if `pnpm-lock.yaml` changed.
4. If the dev server behaves oddly, clear the Next cache and restart (see [Troubleshooting](#troubleshooting)).
5. **Line endings:** This repo includes [`.gitattributes`](.gitattributes). Committed attributes apply to everyone and override personal `core.autocrlf` for these paths. If you still see huge diffs after a clone, read [Configuring Git to handle line endings](https://docs.github.com/en/get-started/git-basics/configuring-git-to-handle-line-endings). After `.gitattributes` changes, maintainers run `git add --renormalize .` once and commit the normalization.
6. **Optional global Git (outside this repo):** GitHub documents `core.autocrlf` defaults per OS; with `.gitattributes` in place, the repo stays consistent even if globals differ.

## Setup

```bash
pnpm install
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production server (after `build`) |
| `pnpm lint` | Run [Biome](https://biomejs.dev/) checks |
| `pnpm format` | Format with Biome |

Development defaults to [http://localhost:3000](http://localhost:3000). App routes and pages live under `src/app/`.

## Authentication (Clerk)

The marketing site stays public. **`/portal`** is the signed-in client area; unauthenticated visitors are redirected to **`/sign-in`**. **`/sign-up`** is available for the scaffold (tighten or disable sign-up in the [Clerk Dashboard](https://dashboard.clerk.com) when you move to invite-only).

### Environment variables

Copy [`.env.example`](.env.example) to **`.env.local`** (gitignored) and set:

| Variable | Where it is used |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Browser / Next.js client |
| `CLERK_SECRET_KEY` | Server and Next.js proxy (never expose in client bundles) |

In the Clerk application, set **Sign-in URL** to `/sign-in`, **Sign-up URL** to `/sign-up`, and **After sign-in** (and optionally **After sign-up**) to `/portal` so users land in the portal after authenticating.

### Vercel and CI

Add the same two variables to **Vercel** for Preview and Production.

**GitHub Actions:** `pnpm build` loads [`src/proxy.ts`](src/proxy.ts) (Next.js “proxy”, formerly `middleware`) and needs Clerk keys at build time. Add [repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) named `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` with the same values as in `.env.local`. Without them, the **Build** step in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) will fail.

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
