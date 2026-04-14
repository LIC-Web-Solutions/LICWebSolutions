## Summary

- 

## Verification

- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm build` (or justify if skipped)

## Architecture and data checklist

- [ ] No new mock data for production paths unless explicitly flagged
- [ ] Prisma changes include migration + schema updates
- [ ] Mutations are guarded (workspace role guard or internal admin guard)
- [ ] Route behavior is documented when introducing new flows

## CSS/UX checklist

- [ ] CSS class names follow semantic BEM style (`block__element--modifier`) for new/edited modules
- [ ] Header height and spacing rhythm align with LIC baseline (4rem topbar, `--globalPadding`)
- [ ] Mobile nav behavior verified for touched routes
- [ ] Route-by-route UX checks updated in `docs/ux-baseline-audit.md` for affected routes

## Security and repo hygiene

- [ ] No secrets/config artifacts committed (including local `.agents` and `.clerk` internals)
- [ ] `.gitignore` updated if needed for newly discovered local-only files
