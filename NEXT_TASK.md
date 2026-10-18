# Next task

Current checkpoint: **V82.85.18 modularization closeout matrix (CI pending)**.
Branch: `v82.85.18-modularization-closeout-matrix-01`.

## Current acceptance gate
- Verify `reports/V82_85_18_MODULARIZATION_CLOSEOUT_MATRIX.csv` has exactly one row for each of the 91 manifest fragments and 13 modules.
- Verify the matrix contract test passes in CI, including the locked V82.82 product fingerprint.
- Full engineering workflow must pass before accepting the inventory checkpoint.

## After the matrix is accepted
Start with the highest-risk unresolved boundary: complete `script_004` dependency ownership (lexical/property calls, window/global state, DOM writes, listeners, timers, playback and answer settlement). Then choose one narrowly scoped, demonstrably safe responsibility for extraction. Do not do a broad rewrite.

## Environment-gated work that must remain explicit
- Firefox and CSS cascade comparison.
- Real audio-provider playback.
- Live server plus two independent multiplayer clients and reconnect failures.
- Production-domain storage policy and full IndexedDB Blob round-trip/upgrade/quota-failure coverage.

Product lock: V82.82 standalone HTML, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `3c4dc6e52d960b5e545b0e9b30a994b18b9d3249`.
