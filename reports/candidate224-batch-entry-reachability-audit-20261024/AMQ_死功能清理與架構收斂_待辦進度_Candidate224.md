# AMQ 死功能清理與架構收斂進度 — Candidate224

## 基線
- Candidate222 是唯一程式起點，原檔未修改。
- 大小：9,348,268 bytes
- SHA-256：`39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`

## 本階段完成
- [x] 確認 Chromium 可執行，但 file:// 與 localhost 導覽被管理政策阻擋。
- [x] 以 `page.set_content()` + 記憶體 storage shim 執行實際 DOM/事件流程，並明確區分其與原生來源測試。
- [x] 驗證 Song Select route、180 首歌曲列與零 page/console error。
- [x] 證實作品批次 `#quicktools` 被明確 CSS 隱藏，且 `list-batch-works` handler 回報工具未載入。
- [x] 證實 Candidate221 的 workspace sidebar/dock action 容器不可見；其中歌曲批次 handler 可執行，但入口對使用者不可達。
- [x] 產生 Stage 10 稽核報告並更新 GitHub 文件 checkpoint。
- [x] 保留 Candidate222，不產生沒有根本修正的 HTML 候選。

## 狀態
- PASS：靜態基線 SHA/大小核對、記憶體 shim 瀏覽器初始化、路由啟動、180 歌曲列、隔離 action handler 的錯誤監聽。
- FAIL：作品批次入口不可達；舊 `quicktools` 在 Song Select 路由隱藏；workspace sidebar/dock 不可見。
- NOT RUN：原生 file://、持久化 reload、真實音訊、外部 API、多人生命週期、osu!stable 像素比對。
- BLOCKED：file:// 與 localhost 導覽遭 `ERR_BLOCKED_BY_ADMINISTRATOR` 攔截；Candidate222 大型 HTML 仍無可用的 GitHub 本機路徑上傳 action。

## 下一階段
在可見的正式清單管理入口建立作品層級批次 UI，重用既有資料 owner，不建立第二套 storage 或業務 dispatcher。完成可見互動及資料粒度隔離測試後，再清除不可達的 workspace dock/sidebar actions 與被取代的 quicktools UI。
