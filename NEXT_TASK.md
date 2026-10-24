# NEXT_TASK — AMQ cleanup continuation

Working baseline: Candidate212 (preserved); Candidate207 is the rollback source. Candidate216 and Candidate218 are separate experimental Library artifacts, not accepted releases.

Latest evidence:
- `reports/candidate212-100-item-continuation-20261024/STATIC_AUDIT.md` records the recovered artifact inventory and static scan.
- `CURRENT_STATUS.md` and `BASELINE.md` were updated to reflect that Candidate207/212/216/218 exist in the AMQ學習工具 Library but are absent from the target branch's Git Tree.
- The readable Candidate212 text export is 26 bytes shorter than the recorded original and hashes differently. It is not a byte-identical build source.

## Priority order

1. **Resolve source-byte access first.** Obtain a byte-preserving local copy of Candidate212 or a trusted export path. Do not build or upload a candidate from the normalized text export.
2. **Volume control lifecycle.** Trace V44 and V82.35 mount/failure paths; preserve `aniQuizVolume`, mute-at-zero behavior, toolbar placement and audio-element replacement. Do not delete the fallback without runtime evidence.
3. **Initialization and watch/custom-list tabs.** Compare Candidate212 with Candidate218's exact intended `updateWatchModes()` change; test repeated init and effective click counts in a real browser.
4. **P0 regression.** Test page initialization/DOM stability, custom-list create/add/remove/filter/delete/reload, and all four workspace routes including back navigation and teardown.
5. **Persistence and game behavior.** Test local/session storage, IndexedDB stores/versioning/Blob backup, AMQ/EMQ/MIX playback and answer/score/history consistency.
6. **Dependency-led cleanup.** Map each UI owner, event, observer, timer, route and storage key. Classify Keep / Integrate then delete / Delete / Needs confirmation. Duplicate IDs and CSS rules alone do not prove dead code.
7. **osu!stable Song Select.** Use the fixed reference screenshot; measure window size, card geometry, 7.5-card viewport, hover/selected offsets and right-panel data. Record actual pixel differences.
8. **API/import acceptance.** Verify AniList, MAL and VNDB success/error/timeout/rate-limit/offline paths, deduplication, list removal and cover fallback/retry.
9. **Release gate.** Run syntax, unit, integration and browser tests; label PASS/FAIL/NOT RUN/BLOCKED accurately. Build a single-file HTML only from a byte-verified source; compare the output with the source build and compute SHA-256.
10. **GitHub delivery.** Commit necessary docs/reports to `amq-candidate104-songselect-layout-fix`. Upload the HTML only through a byte-preserving route; read it back and verify version, byte size and SHA-256. Never claim HTML upload without remote evidence.

## Current test state

- PASS: 68 executable inline JS blocks in the readable Candidate212 text export passed `node --check`.
- NOT RUN: browser initialization, list CRUD/reload, workspace lifecycle, real audio/API/IndexedDB, and osu!stable pixel comparison.
- BLOCKED: fresh raw-byte SHA-256 verification from the Library artifact in this runtime; prior environment records also report browser navigation restrictions for `file://` and localhost and unavailable external DNS/network.

Preserve Candidate212, Candidate207, Candidate216 and Candidate218. Do not overwrite originals or infer acceptance from static checks.
