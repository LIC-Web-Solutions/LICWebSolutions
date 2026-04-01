# LIC Web Solutions

Marketing and site for LIC Web Solutions, built with the [Next.js](https://nextjs.org) App Router.

**Repository:** [github.com/LIC-Web-Solutions/LICWebSolutions](https://github.com/LIC-Web-Solutions/LICWebSolutions)

## Prerequisites

- [Node.js](https://nodejs.org/) **20.9+** (see `engines` in `package.json`)
- [Corepack](https://nodejs.org/api/corepack.html) (ships with Node) so the repo’s pnpm version is used automatically

Enable Corepack once per machine (uses the `packageManager` version in `package.json`):

```bash
corepack enable
```

## Package manager (pnpm only)

This project is locked with **`pnpm-lock.yaml`**. Use **pnpm** for installs and dependency changes—do **not** run `npm install` or `yarn` in this repo (that creates conflicting lockfiles and inconsistent `node_modules`).

- Install: `pnpm install`
- Add: `pnpm add <pkg>` / dev: `pnpm add -D <pkg>`
- Remove: `pnpm remove <pkg>`
- Update lockfile after editing `package.json`: `pnpm install`

CI runs `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build` on every push and pull request to `main`.

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

## Deploy

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying). [Vercel](https://vercel.com) is a common host for Next.js apps.
