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


## Candidate355–359 updates (supersedes the Candidate354 snapshot above)
- Candidate158 overflow behavior was integrated into Candidate106. The separate script and duplicate class/resize/navigation handlers were removed; a child-list observer remains for dynamically inserted DOM.
- Candidate103's duplicate dock geometry writer was removed. Its unique C99 Back/Home height and native audio-control guard were integrated into Candidate99.
- Candidate185 no longer writes `#audioDock` styles directly. It delegates resize to Candidate99's responsive layout owner while retaining modal lifecycle, row centering, corner orb and old-dock hiding.
- Candidate71's competing catalog/filter/mount geometry writes were removed. Candidate106 owns catalog/filter/mount geometry; Candidate71 retains stage/info/scene/grid responsive behavior and route cleanup.
- Deleted legacy `#amqSongSelectBackButton` creator and 8 CSS rules; deleted duplicate `#amqSceneBgQuickOpen` creator and 3 CSS rules plus its dead remover. C99 Back/Home and Candidate70 Escape handling remain.
- Candidate359 static results: 63 inline executable JS blocks, 0 syntax errors; CSS 0 parse errors, 3,397 rules / 11,339 declarations; 245 unique IDs. Real-browser regression NOT RUN.
- Candidate359 SHA-256: `e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd`; direct rollback Candidate358 SHA-256: `fb3a0efe0cb9f1bb6cb571b631bf180b4675bb8123af680a870516851f20c7eb`.
- Remaining NEEDS CONFIRMATION: Candidate72 curved frame, Candidate115 artwork for non-primary lists, and runtime-dependent responsive/overlay geometry.


## Candidate360 resolution (2026-10-26)
- **Candidate72 curved frame: KEEP/INTEGRATE.** The visible arc and responsive geometry remain. Candidate360 removed only the body-class MutationObserver and repeated inline `display` writes; the existing CSS rules own visibility, including the workspace-active hide rule.
- **Candidate115 artwork observer: KEEP.** It targets non-primary AMQ/EMQ inline song lists created by catalog-card interactions and excludes the current `#amqSongSelectTracklist`; no deletion is justified by current call-path evidence.
- Remaining selected/hover row styling, cover/metadata layout, dock positioning, workspace overlays and filter clipping remain browser-dependent and are not marked safe to delete without runtime evidence.
