# Candidate234：待聽佇列納入正式批次 API

- 版本：v82.85.48-candidate234-queue-api-integration-20261024
- Candidate233 基準：9,366,806 bytes，SHA-256 ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45。
- Candidate234：9,368,097 bytes，SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641。
- 回滾檔與 Candidate233 byte-identical。

## 修改
1. queueSelectedBtn handler 改呼叫 window.__aniBatchBusinessAPIv228.applyQueue()，不再直接修改佇列。
2. 正式 API 加入空選取防護、超過 100 部作品確認、歌曲 ID 去重、aniPlayQueue_v1 寫入與讀回驗證，以及儲存失敗後回復記憶體狀態並嘗試回復儲存值。
3. 儲存鍵與資料格式不變。未移除舊 catalog batch UI，因仍有選取、watchlist、導航及自動化依賴。

## 測試
- PASS：67 executable inline JS syntax；109 CSS blocks parse；292 DOM IDs unique。
- PASS：Node VM unit test covers empty selection, multi-work add, song ID de-duplication, repeated call idempotency, simulated storage failure rollback。
- BLOCKED：full-page browser runtime due opaque-origin localStorage harness; native file:// and localhost blocked by managed Chromium URLBlocklist。
- NOT RUN：native reload persistence, real audio, live API, multiplayer, osu!stable pixel comparison。
- GitHub HTML upload / remote HTML SHA: NOT VERIFIED. Local git ls-remote previously failed DNS resolution。

## Rollback
Restore Candidate233. Expected SHA-256: ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45。

## Next
Continue legacy caller migration, then delete only after proving dependencies are eliminated. Do not use CSS hiding as a substitute for removal.