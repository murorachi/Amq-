# Proto25 UI Refactor — Stage 1 and Stage 2 Report

Date: 2026-10-21
Working branch: `v82.85.30-proto25-ui-refactor-work-01`
Immutable baseline: `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`

## Stage 1: home shell
- Updated `engineering/proto24/amq-osu-home-composition.css`.
- Shifted home background and profile/player cards to a dark, compact shell with pink accents.
- Replaced the temporary `♫ ?` pseudo-element placeholder with a stylized `osu!` wordmark treatment.
- Reduced action card height and spacing while preserving the existing buttons and handlers.

## Stage 2: workspace shell
- Updated `engineering/proto24/amq-workspace-osu-composition.css` to align sidebar, action list, status panel and bottom dock with the same palette.
- Added explicit browser assertions for workspace body color and active dock color in `tests/proto24_workspace_acceptance.py`.
- Updated the build workflow to publish a separately named candidate and manifest to `v82.85.30-proto25-ui-refactor-stage-02`.

## Stage 3: accessibility and acceptance coverage
- Added visible keyboard focus indicators for home and workspace controls.
- Added `prefers-reduced-motion: reduce` behavior to disable nonessential transitions.
- Extended browser acceptance to verify workspace palette and reduced-motion transition duration.
- Stage 3 workflow and candidate branch: `v82.85.30-proto25-ui-refactor-stage-03`.

## Stage 4: catalog, song drawer, watchlist and quiz surfaces
- Added dark compact styling for catalog toolbar, filters, tabs, selection cards, song drawer, song rows, watchlist controls and single-player quiz panels.
- Added browser assertions for catalog and quiz panel colors, in addition to workspace and reduced-motion checks.
- Stage 4 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-04`.

## Stage 5: Stable-style Play menu
- Added a Play submenu dialog with the requested `Single Player`, `Multiplayer`, and `Back` labels.
- `Single Player` routes to the existing AMQ quiz route. `Multiplayer` routes to the existing AMQ multiplayer room setup; the screen is not represented as server-connected unless its own connection checks pass.
- Added keyboard Escape/Tab handling and a Playwright interaction check for menu labels, Back behavior, disabled multiplayer, and the Single Player route.
- Stage 6 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-06`.

## Stage 7: responsive Settings panel
- Styled the existing Settings toggle and real controls as a compact responsive options panel; no settings functionality was replaced.
- Added browser checks for settings-open state, theme-toggle visibility, scene-background control visibility and computed panel color.
- Stage 7 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-07`.

## Stage 8: analytics and learning-plan surfaces
- Darkened the legacy analytics/learning-plan cards, metrics, progress bars, spaced-repetition widgets and batch-management controls to avoid the white-on-dark mismatch visible in the Proto24 workspace screenshot.
- Added a browser assertion that the legacy panel uses the dark workspace palette.
- Stage 8 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-08`.

## Stage 9: responsive UI checks
- Added mobile-width assertions for the Play submenu, catalog toolbar, and Settings panel at 390×844; homepage already had an overflow check at the same viewport.
- Stage 9 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-09`.

## Stage 10: measured osu!Stable home geometry pass
- Inspected the pinned official Wiki main-menu screenshot and documented direct layout differences in `OSU_STABLE_VISUAL_COMPARISON.md`.
- Changed the home menu to short horizontal action rows, compacted the player/profile strip, and reduced secondary footer link prominence.
- Updated the browser height assertion from the old tall-card target to the new compact-row target.
- Stage 10 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-10`.

## Stage 11: Song Select full-screen layout
- Converted the existing anime/song drawer into a full-screen two-column selection surface: metadata and player controls on the left, scrollable song rows on the right.
- Added desktop screenshot capture and a 390×844 drawer overflow assertion; existing song playback and familiarity buttons remain the original handlers.
- Stage 11 checkpoint branch: `v82.85.30-proto25-ui-refactor-stage-11`.

## Static CI gate
- Added reproducible HTML parser, duplicate-ID and inline JavaScript syntax checks before browser tests.
- The workflow only publishes the single-file candidate after static and browser acceptance steps succeed.

## Verification
- GitHub file writes and subsequent reads: PASS.
- Immutable Proto24 baseline remains present: PASS.
- Original Proto24 browser run: PASS for its original candidate only; not transferable to Proto25.
- Proto25 workflow execution and generated artifact: NOT VERIFIED through the available Actions interface in this session. Stage 3 source and workflow are committed remotely; candidate HTML and manifest still require independent retrieval.
- Proto25 browser acceptance, HTML parser, inline JavaScript syntax, screenshots, and mobile browser checks: NOT RUN / NOT VERIFIED.
- Real audio output, full quiz-answer lifecycle, multiplayer lifecycle: NOT RUN.
- 90%+ visual similarity: NOT VERIFIED; matched-viewport screenshot comparison is still required.

## Risks
- Home and workspace visual changes are CSS-only, but a candidate build has not yet been independently checked for runtime behavior.
- Play menu, Song Select, Profile, and Settings still need explicit visual refactoring and feature-specific tests.
- Exact osu!Stable source commit and screenshot capture build remain unknown. Implementation uses the user's authorized, pinned official osu!-wiki visual fallback and does not substitute osu!lazer.

## Rollback
- Original accepted Proto24: `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Proto25 is isolated; no production branch was promoted or overwritten.

## Next work
1. Verify and repair the stage-02 CI workflow/artifact retrieval.
2. Continue with Play navigation, Song Select, Profile, and Settings as a single connected UI pass.
3. Add acceptance coverage for each screen and run required functional regressions before final delivery.
