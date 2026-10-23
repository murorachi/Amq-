# Next task — cascade-aware CSS consolidation

1. Song Select: map repeated declarations for catalog/list, metadata, filter/mode controls, and background; preserve selection, hover, scrolling, and 7.5-row geometry.
2. Shared bottom player: identify which declarations are common and which are route-specific; remove obsolete competing definitions only after computed-style comparison.
3. Workspace dock/sidebar: map collapsed and expanded states, keyboard/mouse behavior, and route transitions.
4. Homepage: consolidate the home composition rules without changing the central icon or three-option expansion behavior.
5. Quiz UI: separate shared design tokens from quiz-specific layout and reveal states.
6. For each sub-area, create a uniquely named candidate, run static parsing plus relevant Playwright regression, compare screenshots, and document untested real-origin/persistence behavior.
7. Do not mark acceptance until the existing toolbar clipping failure is resolved and the blocked real-origin checks can run in an allowed environment.
