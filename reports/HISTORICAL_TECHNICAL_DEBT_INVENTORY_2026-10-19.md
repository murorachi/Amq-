# AMQ historical-code technical-debt inventory (V82.85.26 checkpoint)

- Date: 2026-10-19
- Branch: `v82.85.26-suggestion-cache-invalidation-dedup-01`
- Base commit: `7af202f0c7dbe8e28b71b92ba8afd718543383a1`
- Scope: bounded debt review and one exact duplicate-helper consolidation.

## Evidence freshness

V82.69/V82.76/V82.80 AST and selector reports are historical snapshots, not current measurements. They remain useful for locating risks, but their counts and offsets must not be treated as current without regeneration. Current source fingerprints are enforced by `reports/FRAGMENT_MANIFEST.json`; the reverse inventory gate prevents unregistered files from being silently omitted.

## Ranked debt inventory

| Rank | Debt | Impact / evidence | Disposition |
|---|---|---|---|
| 1 | Quiz lifecycle coupling | `script_004.htmlpart` remains one IIFE combining settings, pool selection, answer settlement, suggestions, audio and timers. | No broad refactor. Add focused characterization before touching lifecycle boundaries. |
| 2 | Multiplayer concern mixing | `script_028.htmlpart` combines preference migration, room/session/reconnect, filters, live draft, persistence, UI and audio lifecycle. | Only refactor small pure helpers or a boundary required by a concrete change. |
| 3 | Repeated helper declarations | Three byte-identical local `checked(selector)` helpers in `readRoomFiltersFromUi`, `createSettings`, and `configureFromUi` all close over the same IIFE-level `view` element and implement the same selector/value conversion. | Consolidated into one shared declaration after `view` initialization; focused contract added. |
| 4 | Same-name helpers with different semantics | `script_004` has `norm` helpers with different punctuation/symbol filtering; `script_028` has two `normal` helpers with different whitespace normalization. | Do not merge by name alone. |
| 5 | Compatibility-sensitive persistence | Custom-list scope markers, backup restore rollback, history/SRS summaries and multiplayer preferences cross localStorage/IndexedDB and legacy-key boundaries. | No generic storage consolidation or key renaming. Use existing contracts. |
| 6 | Order-sensitive CSS history | Duplicate selectors and late overrides may be intentional; ownership maps do not prove cascade equivalence. | No CSS movement or reordering in a dedup pass. |
| 7 | Engineering inventory drift | Some AST/selector reports are old snapshots. | Regenerate only inventories needed by an actual refactor; record source commit and fingerprint. |

## Changes in this checkpoint

- Removed two redundant copies of the exact `checked(selector)` helper from `script_028.htmlpart`, retaining one declaration at IIFE scope after `view` is initialized. Existing call sites are unchanged.
- In V82.85.25, consolidated the two identical multiplayer audio `failed` callback bodies into `handleAudioFailure(id,a,watchdog)`. Both callers retain their local IDs, media elements and watchdog variables; a focused contract protects pending, active and stale-event branches.
- In V82.85.26, removed one redundant anime suggestion-cache invalidation loop from the display-language listener, because it immediately calls the shared refresh function that already clears those same entries and refreshes all suggestion fields. Added a focused contract.
- Added `tests/unit/multiplayer_checked_values_dedup_contract.test.cjs` to verify one declaration, its three consumers, numeric song-type values, string-valued other filters and empty selections.
- Improved `tools/verify.py` to print actual UTF-8 byte length and SHA-256 when a fragment/module fingerprint fails.
- Wired the contract into the source/unit CI job.
- Manifest source fingerprint is pinned at 139,955 bytes / SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`. Candidate V82.85.22 was pinned at 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`. V82.85.25 updates the candidate fingerprint and requires a fresh deterministic build before acceptance.

## Validation status

- Static scope review: completed.
- Focused contract: **PASS**, 7 assertions in run [39196582296](https://github.com/murorachi/Amq-/actions/runs/39196582296).
- Source/unit and deterministic build: **PASS**, verifier 132/132; candidate V82.85.22 pinned at 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Firefox responsive: **PASS** in run [39196582296](https://github.com/murorachi/Amq-/actions/runs/39196582296).
- Real-audio output capture: **FAIL** in run [39196582296](https://github.com/murorachi/Amq-/actions/runs/39196582296), `peak=0, rms=0.0`; PulseAudio self-test passed, but Chrome had no sink input. No audio code changed.
- Manual interactive acceptance: not performed.

## V82.85.26 validation checkpoint

- Change: removed one redundant 95-character cache invalidation loop; the shared refresh function is now the sole owner.
- Modified fragment: 139,664 bytes / SHA-256 `c349421f2a4759677669079d5e37a212795958ec6e556b56f36cadddeb56d018`.
- Candidate: 8,787,009 bytes / SHA-256 `1745600f52de09983ca3b66e45341a27acbd463e233fc77719e42f4673d4abad`; clean CI verification of this pin is pending.
- The new contract checks the single invalidation loop and language-listener delegation. Post-change test results are pending.

## V82.85.25 validation checkpoint

- Callback extraction: implemented; focused pending/active/stale event contract passed with 14 assertions.
- Source verifier: 132/132 passed; candidate build, package completeness/reproducibility and Firefox responsive passed in run [39223441076](https://github.com/murorachi/Amq-/actions/runs/39223441076).
- Browser-native-origin job was still in progress when this inventory was updated. User-confirmed product audio playback remains the acceptance reference; the CI audio capture mismatch is not a blocker for this bounded dedup task.

## Rollback

Restore the three local helpers and original `script_028` manifest row; remove the focused test and workflow step. Revert the verifier diagnostics and documentation if rolling back the whole stage. V82.82 remains immutable.

## Package reproducibility

- Source package: `AMQ_V82_85_22_HISTORICAL_DEBT_DEDUP_01.zip`.
- Two independent package builds matched; artifact upload succeeded under run [39196582296](https://github.com/murorachi/Amq-/actions/runs/39196582296). The exact archive checksum is retained in CI output rather than embedded in package contents.


## V82.85.27 room pool validation checkpoint

- Extracted repeated year/difficulty range validation from multiplayer `createSettings()` and `configureFromUi()` into one `validateRoomPoolBounds()` helper.
- Existing input readers remain separate; validation error messages and precedence are centralized. No room payload, persisted preference shape, UI, audio, or song-pool policy change is intended.
- Added a focused contract with 14 assertions and wired it into the engineering workflow. Contract and source/unit job passed in run [39228325204](https://github.com/murorachi/Amq-/actions/runs/39228325204).
- Fragment fingerprint: 139,501 bytes / SHA-256 `0461515bbf8615bfe943f078238aaa9851e9845b62b53a79365fae6061dc9fff`. Candidate: 8,786,846 bytes / SHA-256 `cf89981db7241e929fb0c1f36f6919911e4abb069140b1e5dbe12f935ec3a251`. Source verifier, deterministic build, package reproducibility and Firefox responsive passed.
- Native-origin storage, quiz, and multiplayer lifecycle checks passed; the only failure was the known CI audio output capture mismatch. A follow-up run verifies the corrected assertion-count label.
- Manual interactive acceptance is not performed. Existing CI audio capture mismatch remains out of scope because actual product playback was user-confirmed.
