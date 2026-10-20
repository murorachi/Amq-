# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched.

## Current isolated Proto25 checkpoint
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest source/test commit: `9959cdffeb8f2b89cf1ece64ac0e7aaaa61cdb0f`.
- Validation/publish branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Latest verified run: [39506880023](https://github.com/murorachi/Amq-/actions/runs/39506880023), SUCCESS.
- Artifact ID: `12304256327`, artifact digest `sha256:ce37be3c6a3561202d0a2324afbe928ded73278fed90c15ea2a044524875b52c`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`; size 8,906,398 bytes; SHA-256 `63a771042fde17530245ef1c3ba56a5786799c873373c1314fa9856ebf65e29f`.
- Downloaded artifact SHA-256 matches its manifest. Remote Stage 24 manifest and `TEST_REPORT.md` read-back match. Latest remote publish commit: `97b5d54085c9f5a6ee3f7350cb77f3ac567dc978`.

## Verified implementation and root causes
- Fixed clipped profile/player row: the parent had padding plus `overflow:hidden`; the first attempted correction was outside the active `<style>` block and ignored. The corrected rule is inside the style block and browser assertions verify both 84px cards fit within the 86px parent.
- Primary home actions use Stable-inspired purple gradients and slanted edges without changing existing AMQ routes.
- Music bar now displays metadata and the native audio controls in a 54px desktop row. Mobile uses a stacked 84px profile row plus a 78px music-control row. Browser assertions verify control visibility, dimensions and containment.
- Play menu retains required labels `Single Player`, `Multiplayer`, `Back`, with existing quiz and room-setup routes.
- Stage 24 browser artifact now includes screenshots for desktop/mobile home, desktop/mobile Play menu, desktop/mobile Settings, Learning Center, Analysis and Song Select. Visual inspection of Play and Settings captures is now possible instead of guessing from DOM assertions.

## Latest test evidence
- Static HTML parse, duplicate-ID detection and inline JavaScript syntax checks: PASS.
- Browser acceptance: 17 Playwright checks PASS; 0 page errors; 0 console errors.
- Covered: native-origin storage and reload persistence; all home actions and return routes; Play menu routes and responsive geometry; settings/background dialog; header containment; audio control visibility; mobile overflow; Learning Center/Analysis palette and separation; catalog, Song Select and quiz styling; overlay stacking; reduced motion.
- Screenshot review: profile text is visible; primary action blades render; native audio controls appear in the music bar; mobile header stacks without horizontal overflow; Play menu and Settings have fresh desktop/mobile captures.
- NOT RUN: actual audio output, complete quiz-answer lifecycle, multiplayer server connectivity and complete multiplayer lifecycle.
- Stable release reference: public label `Stable 20260924.1`. Exact matching Stable source commit is still unverified. Official wiki screenshots are traceable but not proven to be captures from that exact client build. >=90% visual similarity remains NOT VERIFIED.

## Release and rollback
- PR #9 remains open and unmerged: https://github.com/murorachi/Amq-/pull/9
- Do not promote Proto25 until target-screen visual comparison and required runtime acceptance are complete.
- Rollback to accepted branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next engineering task
1. Compare the new Play menu, Settings and home screenshots against pinned official osu!Stable wiki screenshots and record concrete visual deltas.
2. Continue the coherent visual pass across catalog, Song Select, Learning Center and Analysis at desktop/mobile sizes.
3. Fix related geometry, hierarchy, iconography, spacing and interaction-state issues at the modular CSS layer; preserve existing AMQ routes/data/playback logic.
4. Add browser assertions only for demonstrated regressions; run the static gate and complete browser suite after each coherent UI group.
5. Verify fresh screenshots, candidate size, SHA-256, manifest, report and remote Stage 24 files after each successful stage. Keep untested runtime items explicitly NOT RUN.
