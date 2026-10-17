# AMQ 練習工具 V82.66 工程檢查點

此分支保存 V82.65 候選題池及 EMQ 來源介面的可追溯測試。正式產品 HTML 維持原指紋；本檢查點沒有修改產品 runtime 邏輯。

## 基準
- HTML: 8,786,930 bytes
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- 官方完整 V82.65 delivery ZIP 尚未取得，因此其外層雜湊及內部 manifest 尚未重新驗證。

## 測試
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
node tests\unit\emq_api_contract.test.cjs
python tools\build.py
python tools\verify.py
```
- Policy unit tests: 70 passed, 0 failed.
- Candidate pool integration: 22 passed, 0 failed.
- Exact-source EMQ API contract: 11 passed, 0 failed. 執行 `script_038.htmlpart` 真實 loader/API，以 gzip fixture 驗證來源隔離、混合題池、metadata/alias/audio 對應及衝突 fail-closed。
- Deterministic verifier: 98 passed, 0 failed，輸出與 V82.65 HTML baseline byte-identical。

## 限制
這不是完整瀏覽器或真實音訊服務測試。Firefox 操作、外部音訊與網路、IndexedDB 往返、多裝置多人模式及完整產品回歸仍未執行。沒有修改產品邏輯、UI、曲庫、storage key/schema 或音訊 payload。

下一步追蹤 EMQ 自訂清單、設定傳遞及來源專屬歷史／狀態儲存，與既有 V82.65 瀏覽器測試紀錄對照後，再評估正式模組抽離。
