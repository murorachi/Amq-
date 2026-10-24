# NEXT_TASK — AMQ cleanup continuation

Working baseline: Candidate212 (preserved); Candidate207 is the rollback source. Candidate216 and Candidate218 are separate experimental Library artifacts, not accepted releases.

Latest evidence:
- `reports/candidate212-100-item-continuation-20261024/STATIC_AUDIT.md` records the recovered artifact inventory, CSS parse results, and the qualified Candidate218 call-graph finding.
- `reports/candidate212-100-item-continuation-20261024/SCRIPT_LIFECYCLE_INVENTORY.md` provides per-script listener, observer, timer, storage, and route counts.
- `reports/candidate212-100-item-continuation-20261024/OBSERVER_TIMER_LIFECYCLE_REVIEW.md` records the observer/timer teardown review queue. Missing disconnect calls are candidates for verification, not proof of leaks.
- `reports/candidate212-100-item-continuation-20261024/DOM_ID_OWNERSHIP_REVIEW.md` maps repeated IDs to guarded creators and mutually exclusive templates. No code is proven safe to delete from duplicate-ID counts alone.
- `reports/candidate212-100-item-continuation-20261024/BROWSER_ACCEPTANCE_REPORT.md` records real Chromium `page.set_content()` interaction tests: 10 workspace panel transitions, custom-list create/add/remove/delete, batch operations, AMQ/EMQ/MIX switching, search, decade/type filters, and name sorting passed in an isolated in-memory storage environment. Native launch/reload persistence is still blocked.
- `reports/candidate212-100-item-continuation-20261024/SONGSELECT_GEOMETRY_ACCEPTANCE.md` records the measured geometry: hover shift 3 px vs selected shift 7 px PASS; Song Select shows about 6.3 card-equivalents and a 33%-visible last card, so the 7.5-card / half-card target FAILS.
- `reports/candidate212-100-item-continuation-20261024/VOLUME_CONTROL_ACCEPTANCE.md` reproduces a real V82.35 fallback defect: it changes audio volume but not video volume and fails mute-at-zero parity. Primary V44 volume behavior passes isolated runtime checks.
- `CURRENT_STATUS.md` and `BASELINE.md` were updated to reflect that Candidate207/212/216/218 exist in the AMQ學習工具 Library but are absent from the target branch's Git Tree.
- The readable Candidate212 text export is 26 bytes shorter than the recorded original and hashes differently. It is not a byte-identical build source.

## Priority order

1. **Resolve source-byte access first.** Obtain a byte-preserving local copy of Candidate212 or a trusted export path. Do not build or upload a candidate from the normalized text export.
2. **Restore native browser acceptance.** Current Chromium blocks `file://` and localhost navigation; `page.set_content()` interaction checks work but cannot prove real reload persistence. Run the same acceptance suite on a persistent origin when allowed.
3. **Volume control lifecycle.** A forced V82.35 fallback test reproduced a behavior mismatch: audio volume changes, video volume does not; zero volume does not mute. After byte-preserving source recovery, extract a single shared volume handler and make both builders use it. Keep the fallback until parity and failure recovery pass.
4. **Initialization and watch/custom-list tabs.** Candidate218's `onclick` assignment is idempotent, but static call-graph tracing does not prove duplicate binding in the normal initial markup path. Reproduce repeated binding or verify repeated script/mount behavior in a real browser before calling this a root-cause fix.
5. **Observer/timer lifecycle.** Instrument owner-specific create/cleanup counts; repeatedly switch Song Select, watchlist/custom lists, quiz and learning workspaces; verify counts plateau and detached DOM is not mutated. Start with V44 volume, prototype-15 learning UI, Candidate103/106/99 Song Select owners, Candidate185 modal observers, and Candidate210 song-list observers.
6. **P0 regression.** Test page initialization/DOM stability, custom-list create/add/remove/filter/delete/reload, and all four workspace routes including back navigation and teardown.
7. **Persistence and game behavior.** Test local/session storage, IndexedDB stores/versioning/Blob backup, AMQ/EMQ/MIX playback and answer/score/history consistency.
8. **Dependency-led cleanup.** Map each UI owner, event, observer, timer, route and storage key. Classify Keep / Integrate then delete / Delete / Needs confirmation. Duplicate IDs and CSS rules alone do not prove dead code.
9. **osu!stable Song Select.** The current interaction test passes hover/selected offset and row-detail synchronization, but geometry fails: average pitch ~126 px vs target ~111–113 px, with only ~6.3 card-equivalents and a one-third bottom card. After raw-source recovery, tune the layout owner and validate 7.5 cards / half-visible bottom card; then run masked reference-region pixel comparison.
10. **API/import acceptance.** Verify AniList, MAL and VNDB success/error/timeout/rate-limit/offline paths, deduplication, list removal and cover fallback/retry.
11. **Release gate.** Run syntax, unit, integration and browser tests; label PASS/FAIL/NOT RUN/BLOCKED accurately. Build a single-file HTML only from a byte-verified source; compare the output with the source build and compute SHA-256.
12. **GitHub delivery.** Commit necessary docs/reports to `amq-candidate104-songselect-layout-fix`. Upload the HTML only through a byte-preserving route; read it back and verify version, byte size and SHA-256. Never claim HTML upload without remote evidence.

## Current test state

- PASS: 68 executable inline JS blocks in the readable Candidate212 text export passed `node --check`.
- NOT RUN: browser initialization, list CRUD/reload, workspace lifecycle, real audio/API/IndexedDB, and osu!stable pixel comparison.
- BLOCKED: fresh raw-byte SHA-256 verification from the Library artifact in this runtime; prior environment records also report browser navigation restrictions for `file://` and localhost and unavailable external DNS/network.

Preserve Candidate212, Candidate207, Candidate216 and Candidate218. Do not overwrite originals or infer acceptance from static checks.
