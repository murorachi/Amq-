# Current engineering checkpoint: V82.85.22 historical debt and dedup

- Branch: `v82.85.22-historical-debt-dedup-01`.
- Production refactor: consolidated three identical local `checked(selector)` helpers in `src/scripts/script_028.htmlpart` into one shared helper after `view` initialization. Existing call sites are unchanged.
- Source fingerprint: 139,955 bytes / SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`.
- Pinned candidate V82.85.22: 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- CI run [39196582296](https://github.com/murorachi/Amq-/actions/runs/39196582296): source/unit and deterministic build passed (132 verifier checks); dedup contract passed (7 assertions); package completeness/reproducibility passed, two package builds identical at 14,640,473 bytes / SHA-256 `65174354609f5eec49e41bda558c4dee093611f60c29a710b2628899db6368e3`; package and standalone artifacts uploaded.
- Firefox responsive acceptance: passed.
- Native-origin acceptance: storage/custom-list, IndexedDB/input, suggestion integration, quiz playback lifecycle, and multiplayer lifecycle passed. The real-audio output assertion still failed with `peak=0, rms=0.0`; PulseAudio self-test passed but Chromium had no sink inputs. Full workflow remains failed because this required audio gate is open.
- Browser debug output showed DBus/GPU environment warnings but no decisive audio-backend diagnostic proving the root cause. No audio production code changed.
- Debt inventory: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`; stage report: `reports/V82_85_22_MULTIPLAYER_HELPER_DEDUP_01.md`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Next direction

Continue bounded debt review from current source. Next candidate requires a clear equivalence proof; the `script_004` normalization helpers are not equivalent and remain separate. Investigate the audio gate separately without weakening its assertion.

## Rollback

Restore the three local helpers and original `script_028` fingerprint; restore the prior release pin, package names and workflow artifact paths; remove the focused test and revert verifier/docs changes. Never overwrite V82.82.
