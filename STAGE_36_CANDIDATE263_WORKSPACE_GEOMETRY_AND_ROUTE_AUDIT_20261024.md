# Stage 36 — Candidate263 工作區幾何與路由稽核

## 版本
- HTML：`amq_learning_tool_v82_85_77_candidate263_workspace_geometry_and_route_audit_20261024.html`
- 版本：`v82.85.77-candidate263-workspace-geometry-and-route-audit-20261024`
- 大小：9,361,024 bytes
- SHA-256：`751114b94fa9897f6f380129a8dd97b90dceab1ef23d20907ca791e318081eb4`
- 父 Candidate262 SHA-256：`d54d2a9ce82486fb459fc232233a0049e2ec49cb866300fcee9888ff9bb108f5`

## 修改
1. 移除 Song Select 工作區中央置中、最高 780px 的彈窗定位，改為根據左側 rail 的實際位置及 viewport 尺寸計算左側面板位置與寬高；桌面最大寬度 460px。
2. 移除遮暗整個畫面的 overlay，讓右側歌曲區不再被整體遮暗。面板仍可能遮住部分歌曲列，需真實瀏覽器量測後判定是否合格。
3. 移除窄螢幕強制全螢幕面板的舊規則。
4. 清單同步來源卡片改為兩欄，第三張卡片在桌面跨滿一列，窄螢幕單欄。
5. 未修改匯入、清單保存及批次資料處理函式；保留 Candidate262 共用 token 與 Candidate261 獨立歌曲批次入口。

## 路由觀察
- `data-c99-action="import"` 由清單同步處理器攔截並渲染 `#amqUnifiedImport258`。
- `data-c99-action="song-batch"` 由獨立歌曲批次處理器處理。
- `batch-works` 走獨立作品批次工作區。
- `#wsActions [data-ws-action]` 透過明確 map 呼叫 `openPanel(key,label)`。歷史程式存在多個 capture-phase listener，完整事件順序與切換後清理仍須 runtime 測試；不宣稱已驗收。

## 測試
- PASS：67 inline JavaScript 區塊通過 node --check，0 錯誤。
- PASS：109 CSS 區塊 tinycss2 解析，0 錯誤。
- PASS：272 個 HTML ID，0 重複。
- PASS：前版 8 項靜態不變條件全數通過。
- BLOCKED：Playwright Chromium 的 file:// 與 localhost 導覽回報 ERR_BLOCKED_BY_ADMINISTRATOR，無法實測面板與歌曲卡片重疊。
- NOT RUN：完整 runtime 路由、切換殘留、API、持久化、截圖比對。
- BLOCKED：HTML 尚未完成 GitHub 上傳及遠端 SHA 回讀。

## 風險、回滾與下一步
Candidate263 不是正式基準。若重疊仍過大，使用真實 viewport/rail/song-list bounding boxes 調整，不追加固定負 margin。回滾 Candidate262（SHA `d54d2a9ce82486fb459fc232233a0049e2ec49cb866300fcee9888ff9bb108f5`）。下一步先完成多視窗幾何與 selector/listener/route/render runtime 驗收，再做整合回歸；Batch 3 未完成前不進入 Batch 4。
