# Next task

Current engineering checkpoint: **V82.84 SOURCE_SYNC_AND_ACCEPTANCE_GATE_AUDIT**. Product remains **V82.82**; immutable baseline remains V82.65.

## Verified in V82.84
- Fresh runner 34/34 passed in bounded batches; integrity verifier 116/116 passed.
- V82.82 deterministic build: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- AMQ/EMQ isolated UI test 19/19; backup export/import/rollback in-memory contract 4/4; responsive Chromium 3 viewport sizes x home/quiz passed.
- Boundary-audit tool remote/local Git blob SHA-1 matches at `ae6690750077445dc85c22a740f4ab5497d9e737`.

## Remaining work, strict order
1. **Complete GitHub source sync:** current remote branch has 125 tree entries and lacks Manifest, all source fragments, template, build/test tools and visual baseline binaries. Local DNS cannot reach GitHub and current connector has no local binary/tree upload path. Establish an authorized transfer route, then upload the complete tree, run a clean checkout build and verify remote SHA-256 values. Do not treat the overlay as completion.
2. **Native Storage/backup acceptance:** run on a browser/test origin that permits localhost; verify native localStorage/IndexedDB, reload persistence, export/import, corrupt backup, write failure and exact rollback. Current managed Chromium policy blocks navigation before app load.
3. **Native AMQ/EMQ custom-list acceptance:** create/edit/delete, real reload persistence, malformed/invalid IDs, work/VNDB/song ID mapping and backup round-trip.
4. **Firefox responsive/cascade review:** Firefox is not installed in this environment. Add desktop/tablet/mobile comparisons before moving CSS; the 32 residual rows are classified, but CSS remains unchanged.
5. **Real audio and two-client multiplayer/reconnect:** test real media events, stale timer cleanup, create/join/leave/rejoin/reconnect and duplicate events. Extract lifecycle code only after these gates pass.

## Rollback and limits
- V82.84 is engineering-only; no production runtime or CSS changed. Rollback to V82.82 product/package if needed; V82.65 remains immutable.
- Native Storage, Firefox, real audio, multiplayer and clean remote checkout build remain NOT VERIFIED/NOT RUN.
