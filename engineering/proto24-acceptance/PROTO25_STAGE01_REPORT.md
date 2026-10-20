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
