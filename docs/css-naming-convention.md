# CSS Naming Convention (BEM + Modules)

This project uses CSS Modules and a BEM-style naming convention for predictable, maintainable UI styling.

## Rule set

- Use semantic block names per component/page.
- Use `block__element` for child parts.
- Use `block__element--modifier` for variants/state.
- Keep names lowercase kebab-case.
- Avoid cryptic shorthand (`box1`, `leftPart2`, etc.).

## Examples

Good:

- `.workspaceRequests`
- `.workspaceRequests__card`
- `.workspaceRequests__status--approved`

Avoid:

- `.card2`
- `.blueText`
- `.isBig`

## CSS Modules guidance

- Keep class names local to each `*.module.css`.
- Prefer one block per file for feature components.
- Use shared token variables from `src/styles/tokens.css`.
- Keep utility-like classes in shared style modules only when truly reusable.

## Migration notes

- Existing files that predate this convention can remain as-is temporarily.
- Touch-and-improve policy: when editing a module, migrate naming toward BEM.
- New files should follow this convention from the start.
