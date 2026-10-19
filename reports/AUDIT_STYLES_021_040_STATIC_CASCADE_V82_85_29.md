# First-pass CSS audit: style_021 through style_040

Baseline V82.85.28. Static selector inventory only; no CSS was changed or reordered.

## Per-fragment scan

Counts are produced by a conservative regex over selector blocks. They are not a full CSS AST or computed-style equivalence proof.

| Fragment | Bytes | Rule blocks | Selector tokens | @media | !important | Initial finding |
|---|---:|---:|---:|---:|---:|---|
| style_021 | 1,267 | 7 | 9 | 0 | 11 | Answer glow styles and hides the older feedback overlay. |
| style_022 | 3,209 | 40 | 43 | 1 | 3 | SRS widget styles repeat metric/control selectors across states/layouts. |
| style_023 | 1,733 | 12 | 12 | 0 | 23 | Keeps reveal-buffer geometry distinct from the final reveal layout. |
| style_024 | 527 | 4 | 5 | 0 | 3 | Suggestion list scrolling and stacking. |
| style_025 | 1,866 | 15 | 16 | 1 | 34 | Quiet quiz hides legacy controls and changes the main layout. |
| style_026 | 424 | 6 | 8 | 0 | 6 | Quiz centering overrides. |
| style_027 | 258 | 2 | 2 | 0 | 0 | Dark-theme volume compatibility. |
| style_028 | 1,496 | 16 | 16 | 1 | 29 | Home redesign with repeated dashboard/discovery selectors. |
| style_029 | 860 | 4 | 6 | 0 | 6 | Answer-glow state selectors. |
| style_030 | 2,317 | 26 | 28 | 1 | 1 | Learning dashboard styles repeat table/metrics selectors. |
| style_031 | 75,164 | 651 | 829 | 20 | 247 | Largest shared design-system fragment; base tokens and broad layout rules. |
| style_032 | 5,061 | 35 | 40 | 1 | 28 | Multiplayer/quiz media controls repeat controls and video selectors. |
| style_033 | 671 | 7 | 7 | 0 | 0 | Chinese-title status/retry UI. |
| style_034 | 807 | 8 | 9 | 0 | 0 | Team collaboration reveal text and draft layout. |
| style_035 | 5,028 | 38 | 38 | 1 | 27 | Quiz alias tooltip/floating detail and person-row layout. |
| style_036 | 6,341 | 30 | 30 | 2 | 155 | Watchlist/solo quiz layout has many high-priority overrides. |
| style_037 | 5,376 | 38 | 40 | 3 | 1 | Multiplayer player cards/avatar/speech layout with repeated card selectors. |
| style_038 | 2,002 | 13 | 13 | 1 | 11 | Practice custom-list picker. |
| style_039 | 384 | 1 | 1 | 0 | 9 | Visually hides duplicate multiplayer field labels while preserving accessible labels. |
| style_040 | 5,184 | 34 | 38 | 4 | 40 | Audio dock collapse, drawer and watchlist controls. |

## Findings

| ID | Risk | Disposition |
|---|---|---|
| CSS-06 | style_031 is the largest shared design-system layer. | Critical: do not reorder or bulk-format without screenshot and responsive baselines. |
| CSS-07 | style_036 and style_031 contain many !important declarations. | High: map ownership and computed-style effects before reducing priority. |
| CSS-08 | SRS, learning dashboard, multiplayer and quiz states share repeated selector text. | High: keep state/media context attached to each rule. |
| CSS-09 | Reveal, cover, answer feedback and media controls depend on stacking and visibility. | High: preserve z-index and hidden/display semantics. |
| CSS-10 | Small late style fragments often override earlier UI decisions. | Medium/high: retain as historical cascade patches until visual equivalence is proven. |

## Acceptance boundary

This is a static first pass. It does not prove selector equivalence, responsive geometry, theme parity or browser rendering. Existing browser tests do not cover every selector/state combination. No style was edited.

Rollback by reverting this report and matrix references.
