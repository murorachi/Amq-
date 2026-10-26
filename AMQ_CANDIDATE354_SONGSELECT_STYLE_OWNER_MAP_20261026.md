# Candidate354 Song Select Style Owner Map

## DELETE: proven cascade-dead declarations
Removed 132 selector/declaration pairs where a later declaration uses the exact same selector, property, importance, and nested at-rule context. Eleven rules had no surviving declarations and were removed entirely.

| Source style | Removed selector/declaration pairs |
|---|---:|
| `candidate101-bottom-dock-and-songselect-fixes` | 30 |
| `candidate211-unified-layout-focus` | 24 |
| `candidate54-songselect-root-cause-layout` | 19 |
| `candidate53-songselect-layout-correction` | 10 |
| `candidate71-user-feedback-css` | 10 |
| `candidate102-final-cascade-fixes` | 9 |
| `candidate57-songselect-responsive-layout` | 6 |
| `candidate185-osu-stable-window-selection-dock` | 5 |
| `candidate76-workspace-panel-shell-css` | 3 |
| `candidate99-osu-stable-songselect-ui` | 3 |
| `candidate105-pixel-driven-songselect-geometry` | 3 |
| Other source styles | 10 |

## INTEGRATE: adjacent patches consolidated
33 consecutive static Song Select-related style blocks were merged into 11 consolidated blocks, removing 22 style tags. CSS rule order was preserved. Old style IDs were checked against JavaScript bodies and CSS ID selectors; no references were found.

The consolidated groups cover:
- mobile header + desktop overflow;
- measured filter alignment + route ownership + legacy rail hiding + viewport overflow;
- dock layout + final filter/cascade rules;
- cover/title sizing + route-specific player bars;
- reference alignment + metadata root + filter clipping;
- bottom player geometry + distance tiers + stable selection dock;
- Song Select layout + structural rebuild + workspace unification + final override + unified focus;
- root-cause layout + metadata stats + responsive layout;
- desktop catalog width + user feedback CSS;
- workspace dock positioning + final filter fix + stable Song Select UI;
- song-list component + metadata specificity + modal/dock recovery.

## KEEP: active or uniquely referenced owners
- Candidate99 stable Song Select composition and its runtime script.
- Candidate137 song-list component; it styles classes created by the runtime row builder.
- Workspace/dock styles used by workspace and dock state scripts.
- Runtime-injected `amq-proto26-song-select-css`, `amq-proto32-song-select-css`, and Candidate51 route styles.

## NEEDS CONFIRMATION
Desktop/mobile header, catalog/filter geometry, dock visibility/position, workspace/sidebar overlays, Escape/back, selected/hover row states, metadata/cover layout, and resize remain browser-dependent. Visual regression is NOT RUN because prior full-app browser paths were blocked.

- Candidate354 is experimental, not promoted.
- Immediate rollback Candidate353 SHA-256: `1494f03e39e6b39b97d34746eb5a0d2a5957e128c15764529003e5dee954ffa3`.
- Formal baseline Candidate302 remains unchanged.
