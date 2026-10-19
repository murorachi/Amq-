# UI specification conformance audit

Checkpoint: `NEW_ARCH_V0.1.1_OSU_STABLE_UI_01`

User acceptance: **FAIL — 10/100**.

## Decision
Freeze further UI implementation stages. Do not continue to quiz/results or other pages until the current implementation is reconciled against the previously approved 13-stage UI specification. This is a specification-conformance failure, not a test-suite failure.

## Confirmed mismatches

1. The reference was treated as loose inspiration, not as a reconstruction target. The home screen uses invented orbit gradients, diagonal lines, an invented letter-mark, custom English labels, and a generic title/menu layout. It does not demonstrate measured reconstruction of the agreed osu! stable reference composition.
2. The global application shell contradicts the promised game-screen direction. Most routes still use the generic fixed left sidebar, top bar, page header, rounded panels and dashboard-style content. Only the home route bypasses that shell.
3. The song selection page is a newly invented interpretation. It uses a plain text track list plus a fabricated music-note art panel. No evidence shows that its proportions, density, selected-item treatment, metadata hierarchy or interaction layout were derived from the agreed osu! stable screen.
4. The page is still partly a CRUD tool. Import/add/edit/delete actions and a generic detail form dominate the library interaction. That supports data entry, but does not reproduce the requested selection experience by itself.
5. Quiz and results remain generic centered cards / metric tiles; they have not been reconciled to the agreed AMQ / osu! references.
6. Visual acceptance was not a release gate. The build and Node tests passed, but browser visual acceptance was not completed before describing the UI as corrected. Source-structure assertions cannot establish visual similarity.

## Evidence inspected

- `src/views.js`: `home()` builds a custom brand/hero/menu/collection summary; `catalog()` builds a plain row list and synthetic detail-art panel; `quiz()` uses a centered quiz card; `results()` uses metric tiles.
- `src/styles.css`: the base application remains a generic sidebar + topbar shell; `osu-*` rules are a bespoke theme, not a measured implementation of the reference UI.
- `CURRENT_STATUS.md`: browser visual acceptance was explicitly not completed.
- `reports/TEST_REPORT.md`: tests cover core behavior and basic structural assertions, not screenshot similarity or real-browser visual acceptance.
- User acceptance score: 10/100.

## Root cause

The implementation optimized for a quick functional prototype and then relabeled stylistic approximation as a reference-aligned UI. The missing control was a page-by-page visual specification with explicit reference regions, relative proportions, element hierarchy, spacing/alignment rules, and a screenshot-based acceptance gate before advancing.

## Required correction process

1. Recover the exact approved 13-stage decisions and reference screenshots/links from the project record. Do not rewrite the design brief from memory or invent substitutes.
2. Map every visible region in each reference to the corresponding UI region in the implementation.
3. Mark each requirement as exact, approximate with an explicit reason, or not implemented. No unapproved substitutions.
4. Correct the first page only, then inspect the actual browser render at the reference viewport and compare composition, positions, proportions, density, typography hierarchy, colors and button alignment.
5. Do not proceed until the user can judge that page against the agreed reference. Core automated tests remain necessary but do not count as visual acceptance.
6. Keep the legacy AMQ application untouched and do not integrate the two projects.

## Test / release status

- User visual acceptance: **FAIL, 10/100**.
- Automated tests: 10/10 passed in the previous checkpoint; this does not override the visual failure.
- Build determinism: passed in the previous checkpoint.
- Browser screenshot comparison: not completed.
- New UI stage progression: **blocked pending specification reconciliation**.
- Existing AMQ modification/integration: none.