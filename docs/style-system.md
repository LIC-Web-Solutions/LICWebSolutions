# Style system (CSS Modules baseline)

This project now uses a CSS Modules-first styling model for product UI and shared components.

## Core principles

- Keep styling in `*.module.css` files colocated with components/pages.
- Use shared tokens from `src/styles/tokens.css` for color, spacing, and typography primitives.
- Keep `src/app/globals.css` for foundational concerns only (global reset, app-level baseline behavior).
- Avoid new Tailwind utility classes in `className` for product UI; prefer module classes.

## Shared style files

- `src/styles/tokens.css` — root LIC tokens (`--licblue`, `--globalPadding`, etc.)
- `src/styles/layout.module.css` — layout primitives and container helpers
- `src/styles/typography.module.css` — title/lede/eyebrow patterns
- `src/styles/surfaces.module.css` — panel/shell surface styles
- `src/styles/forms.module.css` — form and button baseline styles
- `src/styles/portal.module.css` — shared portal shell/page patterns

## UX baseline (LIC standard)

- Use `--globalPadding` for horizontal rhythm in topbars, shells, and page frames.
- Use Montserrat for prominent headings and Open Sans for body copy.
- Keep card/form spacing and section cadence consistent with landing-page density.
- Use LIC accent colors (`--lic-teal`, `--lic-teal-soft`) for interactive emphasis.

## Migration notes

- Tailwind packages remain installed for compatibility, but styling ownership is CSS Modules.
- Existing routes that still contain utility-heavy markup should be migrated incrementally to module classes using the same token set.
