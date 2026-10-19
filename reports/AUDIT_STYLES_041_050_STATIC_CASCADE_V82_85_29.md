# First-pass CSS audit: style_041 through style_050

Baseline V82.85.28. Static selector inventory only; no CSS was changed or reordered.

## Per-fragment scan

Counts use a conservative regex, not a full CSS AST or computed-style equivalence test.

| Fragment | Bytes | Rule blocks | Selector tokens | @media | !important | Initial finding |
|---|---:|---:|---:|---:|---:|---|
| style_041 | 4,021 | 27 | 27 | 2 | 33 | Home menu, batch actions and song-more-actions selectors repeat across states. |
| style_042 | 7,751 | 52 | 54 | 2 | 7 | Home icon layout and scene-background panel styles. |
| style_043 | 7,981 | 41 | 49 | 3 | 114 | Home menu and watchlist dark theme with many priority overrides. |
| style_044 | 723 | 6 | 6 | 0 | 1 | EMQ source toggle. |
| style_045 | 4,363 | 46 | 53 | 1 | 3 | VN catalogue/list UI with repeated card, cover and form selectors. |
| style_046 | 2,350 | 23 | 25 | 1 | 50 | Compact quiz overrides repeat several core quiz selectors. |
| style_047 | 4,452 | 44 | 48 | 2 | 2 | EMQ list and batch controls with responsive states. |
| style_048 | 3,252 | 28 | 30 | 1 | 50 | Stability overrides for source controls, avatar and quiz reveal layers. |
| style_049 | 2,534 | 22 | 22 | 1 | 0 | Multiplayer advanced filters and answer-field layout. |
| style_050 | 1,831 | 9 | 10 | 1 | 31 | Multiplayer answer grid fix with high-priority layout declarations. |

## Findings

| ID | Risk | Disposition |
|---|---|---|
| CSS-11 | style_043 has extensive high-priority home/menu overrides. | High: keep home-menu state and dark-theme context intact. |
| CSS-12 | style_046/style_048/style_050 override quiz and multiplayer geometry. | High: no cleanup without desktop/tablet/mobile screenshot comparison. |
| CSS-13 | style_042 contains scene-background panel styling linked to IndexedDB UI. | Medium/high: preserve overlay/dialog stacking and hidden states. |
| CSS-14 | style_045/style_047 style external-data catalogues and custom lists. | Medium/high: keep overflow, responsive grids and empty/loading states. |
| CSS-15 | Duplicate selector text remains common in late fragments. | High: repeated text may represent different states, media queries or load-order overrides. |

## Acceptance boundary

All 50 style fragments now have a first-pass static selector inventory in the audit matrix. This does **not** mean visual acceptance is complete: no full screenshot pixel-diff or computed-style equivalence was run for every style/state combination. The current disposition is to preserve the cascade and use existing responsive browser evidence; visual comparison is a separate follow-up only where a concrete CSS change is proposed.

Rollback by reverting this report and matrix references; product CSS is unchanged.
