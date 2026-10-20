# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched.

## Current isolated Proto25 checkpoint
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest source/test commit: `0efd88be9a8ab65da1c8a14db9aefb0b0c53e1b5`.
- Validation/publish branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Latest verified run: [39507319150](https://github.com/murorachi/Amq-/actions/runs/39507319150), SUCCESS.
- Artifact ID: `12303243319`; artifact digest `sha256:0eb85cf8178f32f9c410931aa6213cb7e30db6babcbc14cc3924f87faee2cccb`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`; size 8,907,671 bytes; SHA-256 `04d27d56000a8e6d73858b6ff125edcff0669fdef8e3b78e55479460fdccb7c0`.
- Downloaded artifact SHA-256 matches its manifest. Remote Stage 24 manifest and `TEST_REPORT.md` read-back match. Latest remote publish commit: `4487ebb43c3c512489384c30c82fd5a1728de832`.

## Verified implementation and root causes
- Fixed clipped profile/player row: the parent had padding plus `overflow:hidden`; the first attempted correction was outside the active `<style>` block and ignored. The corrected rule is inside the style block and browser assertions verify both 84px cards fit within the 86px parent.
- Home primary actions use Stable-inspired purple gradients and slanted edges without changing existing AMQ routes.
- Music bar displays metadata and native audio controls in a compact desktop row. Mobile stacks the 84px profile row and 78px music-control row; browser assertions verify control visibility, dimensions and containment.
- Play menu keeps required labels `Single Player`, `Multiplayer`, `Back` and preserves existing quiz/room-setup routes. Its three choices now use the same Stable-inspired purple blade treatment as the main menu.
- Latest artifact contains desktop/mobile home, Play menu, Settings, Learning Center, Analysis and Song Select screenshots. Screenshot review confirms the Play submenu now matches the main menu's purple geometry while preserving readable labels.

## Latest test evidence
- Static HTML parse, duplicate-ID detection and inline JavaScript syntax checks: PASS.
- Browser acceptance: 17 Playwright checks PASS; 0 page errors; 0 console errors.
- Covered: native-origin storage and reload persistence; all home actions and return routes; Play menu route, palette and responsive geometry; settings/background dialog; header containment; audio control visibility; mobile overflow; Learning Center/Analysis palette and separation; catalog, Song Select and quiz styling; overlay stacking; reduced motion.
- Screenshot review: profile text is visible, primary and Play-menu action blades render, audio controls are visible, mobile header stacks without horizontal overflow, and Settings panel remains usable at desktop/mobile widths.
- NOT RUN: actual audio output, complete quiz-answer lifecycle, multiplayer server connectivity and complete multiplayer lifecycle.
- Stable release reference: public label `Stable 20260924.1`. Exact matching Stable source commit remains unverified; official wiki screenshots are traceable but not proven to match that exact client build. >=90% visual similarity remains NOT VERIFIED.

## Release and rollback
- PR #9 remains open and unmerged: https://github.com/murorachi/Amq-/pull/9
- Do not promote Proto25 until target-screen visual comparison and required runtime acceptance are complete.
- Rollback to accepted branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next engineering task
1. Compare home, Play menu and Settings captures against pinned official osu!Stable wiki screenshots and record concrete visual deltas.
2. Continue the coherent visual pass across catalog, Song Select, Learning Center and Analysis at desktop/mobile sizes.
3. Fix related geometry, hierarchy, iconography, spacing and interaction-state issues at the modular CSS layer; preserve existing AMQ routes/data/playback logic.
4. Add browser assertions only for demonstrated regressions; run the static gate and full browser suite after each coherent UI group.
5. Verify fresh screenshots, candidate size, SHA-256, manifest, report and remote Stage 24 files after each successful stage. Keep untested runtime items explicitly NOT RUN.
