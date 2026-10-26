# Candidate366 隔離曲庫瀏覽器探測

- 候選：Candidate366
- SHA-256：38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d
- 測試方式：Playwright + Chromium，注入 3 部測試作品、4 首測試歌曲，使用記憶體儲存 shim 避免 about:blank storage 限制。

## 已執行項目
- PASS：初始化後無未捕捉 JS 例外。
- PASS：進入／離開 Song Select 路由。
- PASS：3 部測試作品與 4 首歌曲渲染。
- PASS：歌曲列選取。
- PASS：搜尋與清除搜尋。
- PASS：AMQ、EMQ、MIX 模式切換。
- PASS：播放器 dock 唯一性。
- PASS：舊 Back 與 scene quick-open 控制不存在。
- PASS：桌面 1440px 與手機 390px 主要版面元素有正常幾何。
- PASS：320px 下六個篩選器同列，四個 C99 入口都在視窗內，文件寬度無水平溢出。
- PASS：離開後重新進入 Song Select。
- 總計：16/16 fixture 測試 PASS，0 個未捕捉 JS 例外。

## 測試邊界
- 本測試以 fixture 取代 data.js，不能代表真實曲庫整合。
- 真實音訊、正式 storage 持久化、完整多人生命週期：NOT RUN。
- 此環境直接使用 file:// 或 localhost 導航被管理政策阻擋，因此採用 set_content + fixture 取得互動證據。
