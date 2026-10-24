# Candidate235：工作區自動化改接正式作品批次介面

- 版本：v82.85.49-candidate235-workspace-automation-migration-20261024
- Candidate234 基準：9,368,097 bytes，SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641。
- Candidate235：9,369,076 bytes，SHA-256 d2cb92a244197b254ac49920bb9b18f2c0649d8eb4060691b189d53ee1e2aaa4。
- 回滾檔與 Candidate234 byte-identical。

## 修改
- batch-watch-target、batch-apply-target、batch-select、batch-visible、batch-filtered、batch-clear 等工作區自動化動作，改開啟正式作品批次工作區並使用其控制項。
- batch-tools 快捷動作不再捲動至舊 #quicktools，改開啟正式作品批次工作區。
- 定位操作只會聚焦，不會自動套用資料變更。
- 保留 batch-create-list 原入口，因清單建立能力尚未完成遷移。
- 本階段未刪除舊批次 UI/listeners/CSS/Observer；watchlist 仍共用 #quicktools，不可宣稱整個舊模組已無依賴。

## 測試
- PASS：67 個可執行 inline JS 區塊語法，零錯誤。
- PASS：109 個 CSS 區塊解析，零 parser error。
- PASS：292 個 DOM ID，零重複。
- PASS：靜態斷言確認 batch-tools 不再定位舊 #quicktools，watch/learning apply action 不再定位舊按鈕。
- NOT RUN：完整頁面 Playwright E2E，本輪未實際操作完整工作區路由與點擊流程。
- BLOCKED：原生 file://／localhost 與 reload 持久化，Chromium managed URLBlocklist 阻擋導覽。
- NOT RUN：真實音訊、線上 API、多人與 osu!stable 像素比對。

## 回滾
以 Candidate234 原檔還原：amq_learning_tool_v82_85_48_candidate234_queue_api_integration_20261024.html，SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641。

## 下一步
追查 watchlist 對 #quicktools、selectedAnime、selectionMode 的依賴，遷移清單建立入口與所有舊 handler，再移除已證明無必要的 markup/listeners/styles/observers。批次三仍未完成。
