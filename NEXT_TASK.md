# Next task

Current checkpoint: **V82.85.18 modularization closeout matrix (ACCEPTED)**.
Branch: `v82.85.18-modularization-closeout-matrix-01`.
Acceptance run: https://github.com/murorachi/Amq-/actions/runs/39139529670.

## Accepted gates
- V82.85.16 source inventory completeness gate passed.
- V82.85.17 package completeness/reproducibility audit passed.
- V82.85.18 matrix test reconciles all 91 fragments (41 script/data + 50 CSS) and 13 modules exactly against the manifest; full source/unit and browser-native-origin workflow passed.

## Next highest-value task
Complete the dependency ownership inventory for `src/scripts/script_004.htmlpart`: property-based calls, `window`/global reads and writes, DOM writes, event listener and timer ownership, playback and answer settlement. Use the current AST/static inventories as leads, not as proof. Then select one narrowly bounded responsibility for a test-first extraction only if its runtime boundary is safe.

## Remaining environment-gated acceptance
- Firefox and CSS cascade comparison.
- Real audio-provider playback.
- Live server plus two independent multiplayer clients and reconnect failures.
- Production-domain storage policy and full IndexedDB Blob round-trip/upgrade/quota-failure coverage.

Product lock: V82.82 standalone HTML, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent accepted checkpoint commit `3c4dc6e52d960b5e545b0e9b30a994b18b9d3249`.
