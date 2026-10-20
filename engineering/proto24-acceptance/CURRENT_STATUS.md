# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 delivery branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 are untouched. Never overwrite or force-push the accepted baseline.

## Current isolated Proto25 checkpoint
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest source/test commit: `c9dc16520800a65dc9800fd737ccfe47b5426d32`.
- Stage 24 candidate branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Latest verified acceptance run: [39506207073](https://github.com/murorachi/Amq-/actions/runs/39506207073), conclusion SUCCESS.
- Latest artifact ID: `12302494868`; contains the candidate, checksum, JSON acceptance report and desktop/mobile/workspace/Song Select screenshots.
- Candidate path: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Candidate size: 8,906,398 bytes.
- Candidate SHA-256: `63a771042fde17530245ef1c3ba56a5786799c873373c1314fa9856ebf65e29f`.
- The downloaded artifact's SHA-256 matches its manifest. The remote Stage 24 checksum manifest and `TEST_REPORT.md` were read back and match the run, byte size and hash. Stage 24 remote publish commit: `1e0962510ce1eec042a15b93801e77228ae2b35f`.

## Verified implementation changes
- Home profile/player parent no longer clips the 84px profile card and player card. Root cause was a padded, `overflow:hidden` parent; the first correction had accidentally landed outside the CSS `<style>` block and was ignored. The fix now resides inside the active style block and Playwright asserts parent-child containment.
- Home primary actions use Stable-inspired purple gradient blades with slanted edges, while preserving existing AMQ action routes and accessible focus styling.
- Home music bar exposes the native audio control instead of clipping it beneath the player frame. Desktop places metadata and audio controls side by side; mobile stacks profile and music bar and keeps controls within the viewport.
- Play menu keeps required labels `Single Player`, `Multiplayer`, and `Back`; Single Player routes to the existing quiz, Multiplayer to existing room setup, and Back closes the submenu.
- Song Select modal stacks above the persistent workspace sidebar/dock. Learning Center and Analysis dark styling, settings/background dialog, catalog and quiz palette are covered by the acceptance suite.
- Source remains modular in `engineering/proto24/*.css`; the standalone HTML is reproducibly rebuilt by the Stage 24 workflow from the pinned Proto17 base plus reviewed changes.

## Latest test evidence
- Static checks PASS: HTML parsing, duplicate-ID detection and inline-JavaScript syntax gate.
- Browser acceptance PASS: all 17 Playwright checks; 0 page errors; 0 console errors.
- Covered: native-origin storage and reload persistence; all seven home actions and return routes; Single Player / Multiplayer / Back routing; desktop/mobile Play menu; settings and scene-background dialog; desktop/mobile layout and horizontal overflow; profile/header containment; audio control visibility/geometry; Learning Center and Analysis separation/palette; catalog and Song Select styling/layering; quiz palette; reduced-motion behavior.
- Screenshot review: desktop profile text is fully visible, purple action blades are rendered, audio controls are visible in the music bar, and mobile header stacks into a profile row plus a usable music-control row.
- NOT RUN: actual audio output, full quiz-answer lifecycle, multiplayer server connectivity and complete multiplayer lifecycle.
- Exact osu!Stable source commit matching Stable 20260924.1 remains unverified. The pinned official wiki screenshots are traceable UI references but are not proven to originate from that exact client build. >=90% visual similarity is NOT VERIFIED.

## Pull request and release state
- PR #9: https://github.com/murorachi/Amq-/pull/9, open and unmerged.
- Do not merge PR #9 or promote the candidate until all target screens have been reviewed against pinned Stable references and the required runtime checks are completed.
- Rollback: return to accepted branch `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next engineering task
1. Continue the coherent visual pass across home, Play menu, catalog, Song Select, Settings, Learning Center and Analysis at desktop and mobile sizes.
2. Compare each screen against pinned official osu!Stable wiki screenshots and document concrete differences in geometry, hierarchy, spacing, colors, hover/focus states and overlay stacking. Do not claim a similarity percentage without comparable reference captures and measured evidence.
3. Fix related issues at the modular CSS layer; keep new CSS inside the active style block and add browser assertions only for demonstrated regressions.
4. After each coherent group, run static and full browser acceptance, inspect fresh screenshots and verify the remote HTML, checksum manifest, byte size, SHA-256 and report.
5. Keep audio output, complete quiz-answer lifecycle and multiplayer server lifecycle marked NOT RUN until actually exercised.
