# Candidate212 100-item Engineering Continuation Audit

Date: 2026-10-24
Target branch: `amq-candidate104-songselect-layout-fix`
Pre-audit branch HEAD: `0ae55fb43ad7d1ee7ecb87ea3ac1832ff400385e`

## 1. Artifact inventory and baseline

The files below were located in the AMQ學習工具 Library. Their recorded sizes and previously recorded SHA-256 values are preserved here; the HTML files are not present in the target branch's Git Tree and have not been uploaded to GitHub in this checkpoint.

| Artifact | Recorded size | SHA-256 | Role |
|---|---:|---|---|
| Candidate207 `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_207_home_menu_initial_state_fix.html` | 9,310,496 bytes | `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100` | rollback source |
| Candidate212 `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html` | 9,352,632 bytes | `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952` | authorized working baseline |
| Candidate216 `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_216_remove_unreferenced_candidate_marker.html` | 9,352,541 bytes | `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f` | experimental minimal marker removal |
| Candidate218 `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html` | 9,352,817 bytes | `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c` | experimental idempotent tab binding |

Candidate216 and Candidate218 remain separate, named Library artifacts. Their recorded sizes differ from Candidate212, so neither should be described as overwritten or byte-identical to Candidate212. Their historical validation reports state their exact intended changes and static test results.

## 2. Current-session source-access limitation

The Library text export is readable and can be statically inspected, but its reconstructed text representation is 9,352,606 bytes, 26 bytes shorter than Candidate212's recorded original size, and its SHA-256 is `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`, not the recorded original hash. This is a text-export normalization/pagination discrepancy, not evidence that the Library artifact itself changed.

Therefore:
- Do not use the reconstructed text as a byte-identical replacement for Candidate212.
- Do not create or upload a production candidate from this reconstructed representation.
- Preserve the prior recorded baseline and candidate hashes, but mark fresh raw-byte re-verification in this runtime as BLOCKED.
- No HTML source was modified in this checkpoint.

## 3. Static inventory executed against the readable Candidate212 text export

| Check | Result |
|---|---|
| Inline executable JavaScript blocks | 68 PASS, 0 FAIL |
| Embedded payload blocks excluded from JS syntax checks | 2 |
| Script blocks found | 70 |
| Style blocks found | 108 |
| Static ID attributes | 762 |
| Repeated ID values in source text | 18 values; requires template/runtime ownership review |
| addEventListener | 488 occurrences |
| removeEventListener | 4 occurrences |
| MutationObserver | 51 occurrences |
| ResizeObserver | 2 occurrences |
| IntersectionObserver | 4 occurrences |
| setTimeout | 142 occurrences |
| setInterval | 10 occurrences |
| requestAnimationFrame | 34 occurrences |
| localStorage property references | 225 by this scan's regex |
| sessionStorage property references | 8 |
| indexedDB property references | 4 |
| fetch calls | 19 |

The syntax checks were actually executed with Node.js `node --check` against the 68 extracted executable script blocks. The scan is a static inventory of the text export, not a browser-runtime test or a byte-for-byte baseline verification. Counts may differ from earlier inventories because counting expressions and extraction normalization differ.

## 4. Dependency findings retained

### Watch/custom-list tabs
Candidate212's `updateWatchModes()` uses `addEventListener('click', ...)` for `watchModeTab` and `customModeTab`. The private `init()` calls it once, then calls it a second time only if `.mylistModeTabs` was missing and has just been inserted. In that branch the first call finds no tabs, so it does not attach handlers to those nodes; the second call attaches them once. The initial HTML markup already contains one `.mylistModeTabs` element and one of each tab ID. The private `init()` is invoked through a single `{once:true}` DOMContentLoaded listener or directly once, and is not exported. Therefore the source call graph does **not prove** that the current normal initialization path stacks duplicate listeners. Candidate218's `onclick` assignments do make the binding operation idempotent if the script/function is re-executed, but that repeat-execution trigger has not been demonstrated. Treat Candidate218 as a low-risk defensive change, not a proven runtime root-cause fix until browser click-count tests or a reproducible repeated-execution path confirm the defect.

### Volume control
Two builders remain in Candidate212: the V44 quiz volume control and the V82.35 media-toolbar fallback. The fallback can be reached when the primary control is absent. Their mute-at-zero and audio-element-replacement behavior differ. Classification: INTEGRATE / NEEDS VERIFICATION. Do not delete either path without a runtime test.

### Repeated IDs / placeholder ownership
Repeated source ID strings include `watchModeTab`, `customModeTab`, `v44VolumeControl`, `v44Volume`, `v44VolumeValue`, `mpPause`, `mpLobby`, `vn49BackSongs`, and `amqSongSelectRankingPlaceholder`. Some are in dynamically inserted templates or mutually exclusive game-phase markup. Static duplicate counts alone are insufficient evidence for deletion. Establish a canonical creator/owner, consumer list, and teardown path before removing code.

## 5. Test status

- PASS: 68 executable inline JavaScript blocks in the readable text export passed Node syntax checks.
- PASS: static inventory completed for script/style counts, event listeners, observers, timers, storage calls, and fetch calls.
- NOT RUN: browser initialization and DOM stability, custom-list CRUD/filter/reload persistence, four-workspace navigation and teardown, volume/audio synchronization, IndexedDB Blob persistence, external API recovery, real AMQ/EMQ/MIX playback, and osu!stable pixel comparison.
- BLOCKED: fresh raw-byte SHA-256 re-verification from the Library artifact in this runtime; browser navigation for file:// and localhost; external network/DNS.
- NOT RUN: GitHub upload/read-back verification for Candidate207/212/216/218 HTML files. Only audit/documentation files are committed to the target branch.

## 6. Next safe actions

1. Obtain a byte-preserving local source path for Candidate212 before producing a new HTML candidate.
2. Continue volume-control integration analysis without deleting the fallback until its failure-recovery role is tested.
3. Run real browser acceptance for repeated initialization, tab click counts, custom-list CRUD/reload, four-workspace switching/back, audio mute/volume/replacement, and IndexedDB persistence.
4. Use fixed osu!stable screenshots and record measured geometry/pixel difference; do not infer a similarity percentage.
5. Update status docs after the next evidence-backed checkpoint. Candidate212 remains the working baseline; Candidate207 remains the rollback source; Candidate216 and Candidate218 remain experimental.


## 7. Additional checks executed after the initial report

- PASS: parsed all 108 CSS style blocks from the readable text export with `tinycss2`; 2,763 qualified rules, 0 stylesheet parser errors, 0 declaration parser errors.
- PASS: directly compared the Candidate212 and Candidate218 text-export slices around `updateWatchModes()`. Candidate212 uses two `addEventListener` registrations; Candidate218 assigns `onclick` handlers and preserves the active-tab class update. The neighboring text slice shows the intended localized change; the historical Candidate218 report remains the evidence for its full-file exact-diff assertion.
- LIMITATION: the candidate comparison used Library text-export slices, not raw source bytes. It does not replace the previously recorded full-file SHA-256 verification and is not a fresh byte-identical comparison.


## 8. Watch-tab root-cause qualification

A follow-up call-graph trace narrowed the Candidate218 claim:

- The initial parsed HTML contains exactly one `#watchModeTab`, one `#customModeTab`, and one `.mylistModeTabs`; there are no duplicate IDs in the initial markup (296 ID attributes, 296 unique).
- Within the custom-list script, `updateWatchModes()` appears as one definition and two call sites: the first in private `init()`, the second only inside the conditional that inserts a missing tab strip.
- When the tab strip is missing, the first call has no target elements; the second call binds the newly inserted elements once.
- The script calls private `init()` via `DOMContentLoaded` with `{once:true}` or once immediately. No export of this `init` function was found in the script.
- Static code therefore does not establish duplicate listener accumulation in the ordinary initial page path. A repeated script evaluation or another unobserved trigger could still cause it, but that remains unverified.
- Decision: keep Candidate218 as an experimental defensive/idempotency candidate, but do not mark item 33 as a fully proven root-cause fix until runtime click-count testing reproduces the old behavior or confirms the defensive benefit.
