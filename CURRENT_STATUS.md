# CURRENT_STATUS — Candidate212 engineering continuation (2026-10-24)

## Baseline and artifacts
- Working baseline: Candidate212, 9,352,632 bytes; recorded SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Rollback source: Candidate207, 9,310,496 bytes; recorded SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Experimental Candidate216 remains in the AMQ學習工具 Library, 9,352,541 bytes; recorded SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`.
- Experimental Candidate218 remains in the AMQ學習工具 Library, 9,352,817 bytes; recorded SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.
- These HTML artifacts were found in the Library, correcting the earlier conclusion that their locations were unknown. They are still absent from the target branch's Git Tree; no HTML upload or remote HTML hash verification is claimed.

## Latest committed work
- Added `reports/candidate212-100-item-continuation-20261024/STATIC_AUDIT.md`.
- Initial report commit: `a159f76b37040bb3dc6eb045a7bf406c7f613b27`.
- Latest static-audit update commit: `e7401e283a7daefb05bef968703c10b425cfb146`; remote blob SHA `a9fd3410023fd6dc0bb49c49e49dd3ef7a4cc314`.
- Candidate218 validation addendum commit: `a5ba65eeb7318a0d3f15fa7c8b9bd594eb6246f9`; remote blob SHA `1f16717c391661fd920c0d6120b7ab7000390150`.
- Script lifecycle inventory committed and read back: `reports/candidate212-100-item-continuation-20261024/SCRIPT_LIFECYCLE_INVENTORY.md`, blob SHA `f0cdb94352efe880a4265e329d5e99624c917e30`.
- Observer/timer lifecycle review committed and read back: `reports/candidate212-100-item-continuation-20261024/OBSERVER_TIMER_LIFECYCLE_REVIEW.md`, blob SHA `daa78e8a2c1b09f1d364b6dc58688ffea19797c7`.
- DOM ID ownership review committed: `reports/candidate212-100-item-continuation-20261024/DOM_ID_OWNERSHIP_REVIEW.md`; initial markup has 296 unique IDs. Repeated source ID strings are mainly template/fallback paths and require runtime lifecycle checks, not blind deletion.
- Browser interaction report committed: `reports/candidate212-100-item-continuation-20261024/BROWSER_ACCEPTANCE_REPORT.md`. Chromium `page.set_content()` tests passed for startup, tab clicks, 10 workspace open/close transitions, custom-list create/add/remove/delete, and batch selection/status updates. Native file/localhost navigation and persistent-origin tests remain BLOCKED.
- Additional executed check: all 108 CSS style blocks parsed with `tinycss2`; 2,763 qualified rules, 0 stylesheet parse errors, 0 declaration errors.

## Static evidence
- Candidate212 readable text export: 68 executable inline JS blocks PASS under Node `node --check`; 2 embedded payload blocks excluded.
- 108 style blocks; 488 `addEventListener`, 4 `removeEventListener`, 51 `MutationObserver`, 2 `ResizeObserver`, 4 `IntersectionObserver`, 142 `setTimeout`, 10 `setInterval`, 34 `requestAnimationFrame`, 8 `sessionStorage`, 4 `indexedDB`, 19 `fetch`.
- Static duplicate ID strings require template/runtime ownership review; they are not sufficient evidence for deletion.
- Candidate212 `updateWatchModes()` uses non-idempotent click listener registration, but call-graph tracing did not prove duplicate binding in the normal initialization path: the second call occurs only after inserting missing tabs, which the first call cannot bind. Candidate218's `onclick` assignment is defensive idempotency; browser click-count acceptance remains NOT RUN and the original defect is not yet reproduced.
- Observer/timer static inventory: 51 `MutationObserver` constructors with 7 `.disconnect()` calls, 2 `ResizeObserver`, 4 `IntersectionObserver`, 142 timeouts/38 clears, and 10 intervals/9 clears. This is a review queue, not proof of leaks; lifecycle tests remain NOT RUN.
- V44 and V82.35 volume-control builders differ in mute and observer behavior. Keep both until recovery and audio synchronization behavior is tested.

## Integrity and runtime status
- PASS: Node syntax check on the readable Candidate212 text export.
- BLOCKED: fresh raw-byte SHA-256 verification in this runtime. The text-export reconstruction is 26 bytes shorter than the recorded original and hashes differently; do not use it to replace or build a release candidate.
- NOT RUN: browser initialization, DOM lifecycle, custom-list CRUD/reload, four-workspace routing, real audio, IndexedDB Blob persistence, API recovery, and osu!stable pixel comparison.
- BLOCKED: browser navigation to file:// and localhost, and external DNS/network, per prior environment records.
- No HTML source was modified in this checkpoint. Candidate212 and Candidate207 remain preserved rollback points.

## Next action
Obtain a byte-preserving source path for Candidate212. Then continue the volume-control lifecycle investigation, produce a uniquely named candidate only from a verified source, and run the browser acceptance suite before declaring any functional cleanup complete.
