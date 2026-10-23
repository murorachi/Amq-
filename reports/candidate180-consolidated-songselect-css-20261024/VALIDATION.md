# Candidate 180 — Consolidated Song Select CSS

Date: 2026-10-24

## Candidate identity
- Parent: Candidate 179, SHA-256 `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`
- Candidate 180: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_180_consolidated_songselect_css.html`
- Local SHA-256: `2d57345050c6496fdf6ee85aa3a15da5d39eae03b130ce962b4ef0a8fd1b8234`
- Size: 9,276,659 bytes.
- Status: experimental; not accepted.
- HTML GitHub upload and remote hash verification: NOT COMPLETED.

## Change
Consolidated the route ownership and legacy-rail suppression rules previously appended as Candidate 171/172 styles, the metadata cascade correction from Candidate 178, and the translucent-row cascade correction from Candidate 179 into the existing song-list component stylesheet. Removed the four duplicate candidate style blocks after consolidation. The intent is to reduce CSS patch stacking while preserving the current computed result; no app logic or data behavior was changed.

## Validation
- PASS: HTML tag counts balanced (1 HTML pair, 66 script pairs, 97 style pairs).
- PASS: 64 executable inline JavaScript blocks checked individually using Node `--check`; 0 syntax errors. JSON/data script blocks were excluded from JS syntax checks.
- PASS: Static fixture computed-style comparison between Candidate 179 and Candidate 180 returned identical values for legacy rail display and metadata font hierarchy. This fixture comparison is limited; it is not a full live-page layout test.
- BLOCKED: Native file:// and local HTTP navigation return `ERR_BLOCKED_BY_ADMINISTRATOR`.
- BLOCKED: page.set_content has an opaque origin, and existing code emits localStorage access-denied errors. Song Select route initialization and durable persistence cannot be fully validated in this environment.
- NOT RUN: actual Candidate 180 browser screenshot at 1648×928, 2555×1438, and responsive viewports; pixel diff; custom-list CRUD/reload persistence; live APIs/covers and recovery; real audio; full workspace regression.

## Risks
This is a maintainability consolidation only. It does not resolve the remaining visual gap against the user's actual osu!stable reference, which contains a scene background and a left leaderboard overlay. No leaderboard values or artwork are fabricated. The app's existing scene-background manager and no-custom-background fallback remain intact. Modal workspace panels remain deferred as requested.

## Rollback
Candidate 179 remains available locally at SHA-256 `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`. Candidate 170 and Candidate 169 remain preserved earlier rollback points.

## Next
1. Restore a supported native-origin browser runtime and verify Candidate 180's full route/layout behavior.
2. Continue the main Song Select structure against the user's original osu!stable screenshot: background scene integration, existing real-data overlays only, row translucency/selection geometry, metadata and bottom dock.
3. Do not invent a ranking panel with fabricated osu! scores; determine whether suitable local player/answer data exists before implementing any left-side record panel.
4. After Song Select is stable, implement the requested modal workspace pattern with dimmed background and state restoration.
5. Complete persistence, import, audio, and workspace regression tests before acceptance.
