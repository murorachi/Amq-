# AMQ 練習工具 V82.66 候選題池工程檢查點

此分支保存 V82.65 候選題池的可追溯原始碼拆分、測試與回退紀錄。正式產品 HTML 維持原指紋，不代表已完成業務邏輯模組化。

## 基準
- HTML: 8,786,930 bytes
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- 官方完整 V82.65 delivery ZIP 尚未取得，因此其外層雜湊及內部 manifest 尚未重新驗證。

## 測試
```powershell
node tests\unit\candidate_pool_policy.test.cjs
node tests\unit\candidate_pool_integration.test.cjs
python tools\build.py
python tools\verify.py
```

- Policy unit tests: 70 passed, 0 failed.
- Candidate pool integration fixtures: 22 passed, 0 failed. 測試會擷取並執行 `script_004.htmlpart` 中的原始 `getQuizPool()` 與 wrapper，使用固定曲庫資料和 stubbed upstream/browser interfaces。
- Deterministic verifier: 98 passed, 0 failed，輸出與 V82.65 HTML baseline byte-identical。

## 限制
這不是完整瀏覽器或真實 EMQ API 測試。真實來源身分／metadata mapping、Firefox 操作、外部音訊與網路、IndexedDB 往返、多裝置多人模式及完整產品回歸仍未執行。沒有修改產品邏輯、UI、資料、storage key/schema 或音訊 payload。

下一步先驗證真實 EMQ/Mixed combine contract 和來源 metadata 隔離，再追蹤設定、清單範圍、音源健康與歷史介面。暫不抽離正式 policy module。
