# Current status — Candidate 162 scene-image visibility root fix

A targeted one-declaration fix was made after CSS cascade inspection showed the latest `.p32-scene-image` rule inherited a later `display:none!important` from Candidate 71 while Candidate 99 only changed position and opacity. Candidate 162 adds `display:block!important` to the latest route-active rule.

- Source diff: exactly one CSS declaration; PASS.
- Candidate SHA-256: `537607bf392b3f0f54e922db9049acaeae3020af8fd337da67566deebe9166a0`.
- Main Playwright suite: 26 PASS / 0 FAIL across three viewport sizes.
- CSS parser: 96 style blocks, 2,648 qualified rules, 0 parser errors.
- Added runtime visibility assertion: computed display is block, position fixed, opacity 0.18 when Song Select route is active.
- Default-state full SSIM/MAE unchanged, because no custom background is loaded in this fixture.
- Real image Blob render, IndexedDB save/reload/export/clear/restore: BLOCKED; file:// and localhost navigation are blocked by administrator policy.
- Acceptance: NOT ACCEPTED. Must verify actual custom image on a valid origin and rerun intended-runtime regression.
