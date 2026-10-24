# Stage 59 — 全站 UI 設計系統 V1 與 CSS 來源盤點

- 日期：2026-10-25
- 基準 Candidate277：9,373,238 bytes，SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Candidate278 不採用。
- 新候選：`amq_learning_tool_v82_85_93_candidate279_global_ui_design_system_v1_20261025.html`
- 版本：`v82.85.93-candidate279-global-ui-design-system-v1-20261025`
- 本機大小：9,374,351 bytes
- 本機 SHA-256：`dec9a2ae140ba8482804f4df3986c60a7e790b1ab009fb4f2de3756c13692038`

## 修改
1. 在既有 `v79-design-system` 內標記全站 UI V1 正式 token／共用元件來源，沒有新增 style block。
2. 增加字體、行高、控制項高度及互動狀態 tokens，保留既有尺寸數值。
3. 共用按鈕 Active 與 Hover 分離；表單增加 `aria-invalid="true"` 錯誤樣式。
4. 移除同一 media 區塊內一條已確認連續重複的 Song Select wrapper min-height 宣告。
5. 更新子候選 title/build metadata。未改業務邏輯、資料鍵、資料結構、API、計分或路由。

## 靜態盤點
- 109 個 CSS style blocks；3,629 個解析到的 CSS qualified rules。
- CSS stylesheet parse errors：0；declaration parse errors：0。
- 67/67 可執行 inline JavaScript blocks 通過 `node --check`。
- 272 個初始 DOM IDs，重複 ID：0。
- 647 個 selector 字串在多處出現。這不是刪除依據；多數規則仍需在瀏覽器比較 computed styles 後才可安全整合。

## 測試狀態
- PASS：基準 hash/大小、候選 hash/大小、JS 靜態語法、CSS 解析、初始 DOM ID 唯一性。
- BLOCKED：瀏覽器驗收，環境缺少 Playwright Chromium executable。
- NOT RUN：工作區切換、清單 CRUD/重載持久化、遊戲/鍵盤/音訊/多人回歸、桌面/手機像素比對。
- BLOCKED：GitHub HTML 產物上傳與遠端 hash 驗證；本次連接器沒有本機檔案位元組直傳路徑。未宣稱上傳成功。

## 未完成
全站 CSS 覆蓋鏈尚未全部整合／刪除。首頁、Song Select、Workspace Dock 是最高風險區；下一步需先在固定瀏覽器狀態記錄 computed styles，再逐組遷移，不能只因 selector 重複就刪除。

## 回滾
直接回到不可變 Candidate277（SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`）。Candidate276 僅用於撤銷 Candidate277 的清單名稱正規化變更。
