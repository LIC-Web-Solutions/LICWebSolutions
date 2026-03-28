# LIC Web Solutions

Marketing and site for LIC Web Solutions, built with the [Next.js](https://nextjs.org) App Router.

**Repository:** [github.com/LIC-Web-Solutions/LICWebSolutions](https://github.com/LIC-Web-Solutions/LICWebSolutions)

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- [pnpm](https://pnpm.io/)

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
