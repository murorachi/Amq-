# AMQ Learning Tool V82.66 source split checkpoint

此分支保存 V82.65 候選題池及 EMQ 來源介面的可追溯測試。正式產品 HTML 維持原指紋；本檢查點只擴充測試與工程紀錄，沒有修改產品 runtime 邏輯。

## Current checkpoint
- `V82.66 EMQ-CUSTOM-LIST-SCOPE-04` (PARTIAL)
- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 22 passed, 0 failed.
- EMQ API/custom-list exact-source contract: 18 passed, 0 failed.
- Deterministic verifier: 98 passed, 0 failed; output byte-identical to V82.65 HTML baseline.
- HTML baseline: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Important boundary
The solo custom-list adapter scopes AMQ rows and deliberately leaves EMQ rows to EMQ-side filters. `combinePool` has an optional `selectedEmqSongIds` argument, but the current solo wrapper does not pass it. Whether that is an intentional non-feature or an incomplete integration remains unresolved; no speculative product change was made.

## Baseline limitation
官方完整 V82.65 delivery ZIP 尚未取得，因此其外層 SHA-256、CRC、內部 manifest 與 payload hashes 尚未重新驗證。未以 V82.64 或其他歷史 HTML 取代基準。

## Test commands
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
node tests\unit\emq_api_contract.test.cjs
python tools\build.py
python tools\verify.py
```

Real browser/manual interaction, Firefox, external audio/network, IndexedDB round-trip, multiplayer multi-device and full product regression were not run.

Next: obtain and verify the official V82.65 package, resolve the solo EMQ custom-list contract, then continue source-specific history/status isolation. See `NEXT_TASK.md`.
