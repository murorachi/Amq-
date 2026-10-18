# V82.69 Architecture, storage and multiplayer checkpoint report

Date: 2026-10-18 (Asia/Taipei)

## Baseline and scope
- Product baseline: V82.65 standalone HTML, 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Original baseline HTML and ZIP were not overwritten.
- This checkpoint is a source/build/test refactor only. It does not change generated product bytes, storage schema, audio behavior, or room protocol.

## Changes
1. **Architecture/build:** documented runtime composition, module injection contracts, candidate pipeline order, storage boundaries, multiplayer session ownership and validation limits. Build/verifier now resolve each module's declared insertion fragment rather than hard-coding one location.
2. **Low-risk module:** extracted the existing storage repository script block to `src/modules/storage_repository.htmlpart`. Exact original 8,694 bytes are injected at the original position; `script_027.htmlpart` contains one marker. Candidate policy remains a separate pure module.
3. **Core candidate flow:** retained `getQuizPool` and its wrappers unchanged; existing exact-source tests protect base pool -> EMQ/Mixed combine -> audio eligibility -> custom-list scope ordering, IDs/order, fail-closed scope and answer settlement.
4. **Storage:** added nine storage repository tests and six full-backup manifest/allowlist tests. Coverage includes user namespace isolation, invalid keys, snapshot serialization, transactional success/rollback, allowlisted legacy import, preservation of original keys, adapter contract, backup manifest consistency, unknown-key rejection and legacy backup filtering.
5. **Multiplayer:** added seven tests for session shape, sessionStorage vs localStorage reconnect index, per-player reconnect cleanup, poll guards, invalid-session cleanup and WebSocket/HTTP fallback contracts. Tests use synthetic storage and do not contact a live room service.
6. **Build/artifacts:** created versioned HTML `dist/amq_learning_tool_v82_69.html` and deterministic source/test ZIP.

## Tests executed
- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 27 passed, 0 failed.
- EMQ API/list contract: 19 passed, 0 failed.
- History/status isolation: 7 passed, 0 failed.
- Storage repository contract: 9 passed, 0 failed.
- Full-backup contract: 6 passed, 0 failed.
- Multiplayer session contract: 7 passed, 0 failed.
- Solo EMQ handoff: 4 passed, 0 failed.
- Answer-flow contract: 8 passed, 0 failed.
- Total Node assertions across these suites: **157 passed, 0 failed**.
- One-command runner: **11 commands passed, 0 failed**.
- Integrity verifier: **103 passed, 0 failed**; two independent builds match the locked baseline byte-for-byte.
- HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Constrained Chromium smoke: one run on the byte-identical V82.68/V82.69 HTML passed 19 assertions. A later rerun failed with Playwright driver `EPIPE`; it is recorded as a failed attempt and does not replace the successful run or become a new pass.
- Direct `file://` navigation failed with `ERR_BLOCKED_BY_ADMINISTRATOR`.

## Not tested / remaining risk
- Real-origin localStorage persistence across reload.
- IndexedDB round-trip, schema upgrade, transaction failure and restore rollback in a permitted browser origin.
- Actual external audio playback and failed-source recovery.
- Multiplayer server integration, two-client state isolation, live WebSocket reconnect and older-client compatibility.
- Firefox and complete manual regression.
- Full source tree and binary ZIP publication to GitHub is not yet confirmed; remote documentation readback alone is not a code release.

## Package
The final package size and SHA-256 are recorded in `reports/V82_69_ARCHITECTURE_STORAGE_MULTIPLAYER_01_SHA256.txt` and the external `.zip.sha256` sidecar. The sidecar is outside the archive to avoid a self-referential digest.

## Rollback
Use the immutable V82.65 baseline HTML/package for product rollback. For source rollback, restore the V82.68 versions of `tools/build.py`, `tools/verify.py`, `reports/FRAGMENT_MANIFEST.json`, `reports/FRAGMENT_MAP.csv`, `reports/MODULE_MAP.csv`, `src/scripts/script_027.htmlpart`, and remove `src/modules/storage_repository.htmlpart`, `tests/unit/storage_repository_contract.test.cjs`, `tests/unit/backup_restore_contract.test.cjs`, and `tests/unit/multiplayer_session_contract.test.cjs`. Do not overwrite V82.65 baseline files.

## Next highest-value work
Run browser-origin persistence/IndexedDB and multi-client room acceptance in an environment that permits local origin navigation and a test room server. Fix only reproducible product defects; do not change behavior merely to work around this runner's browser restrictions.
