# 第十一批：首頁／Song Select 孤立 CSS 批次清理

日期：2026-10-25

## 基準與產物
- 來源 Candidate305：amq_learning_tool_v82_86_16_candidate305_home_songselect_css_cleanup_20261025.html
- 來源 SHA-256：3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f（1,670,933 bytes）
- 候選 Candidate306：amq_learning_tool_v82_86_17_candidate306_home_songselect_orphan_css_cleanup_20261025.html
- 候選 SHA-256：ac39a87d0ebc3c50f89754cae95cd62518a659a7c354075d6d1be6b6edc4de7e（1,667,280 bytes）
- 正式基準仍是 Candidate302，Candidate306 不自動升格。

## 清理內容與證據
本批清理已查遍非 CSS HTML 與 68 個可執行 inline script、未找到任何字面引用的孤立 selector 群組：
- 舊首頁 .amqHome* 版型類別：.amqHomeCenter、.amqHomeTitle、.amqHomeSubtitle、.amqHomeOpenHint、.amqHomeDialogHead、.amqHomeClose、.amqHomeIconOnly。
- 舊首頁 .home-menu-practice:before 裝飾分支；同一群組中其他有效 menu selector 保留。
- Song Select #c99DashboardModal 與 .c99-modal-card 舊對話框樣式，7 條規則均沒有 HTML／JavaScript 引用。

只移除上述 selector 分支，不改 JavaScript、資料、路由或儲存邏輯；含有效分支的 selector 群組保留其他分支。媒體查詢中只刪除孤立分支，其他條件與規則保留。
- 移除孤立 selector 分支／規則：31
- CSS 規則：3,470 → 3,439（-31）
- CSS declarations：12,318 → 12,194（-124）
- 修改 style blocks：4 個（v79-design-system、v82-44-ux-intuition-cleanup-style、v82-45-home-icon-and-scene-background-style、candidate99-osu-stable-songselect-ui）
- HTML 減少：3,653 bytes
- 所有目標 token 在原始非 CSS HTML 與 inline JS 中的字面引用檢查均為 false。

## 測試結果
- JavaScript 語法：PASS 68/68（69 個 script 標籤中 1 個是 application/json）。
- CSS 解析：PASS，0 個 parser／declaration 錯誤。
- 重複 DOM ID：PASS 0。
- JavaScript script 內容完全未變更。
- 移除 style tags 後的其他 HTML 位元組內容完全一致。
- Chromium 計算樣式比較：PASS 6/6。首頁與 Song Select 各在 1440×900、768×1024、390×844；每場景 395 個靜態 DOM 元素，比較 44 個 computed style／pseudo-element 屬性，差異 0。
- 測試時停用 app scripts，並將滑鼠移出內容區以避免 hover 偶然狀態；這是隔離 CSS 比較，不是完整應用 E2E。
- 完整應用 E2E、動態 DOM 產生後的視覺驗收：NOT RUN。

## 風險與回滾
證據支持這些 selector 在目前 HTML／inline JS 中無字面引用，且六個靜態 DOM／視窗場景計算樣式無差異；但不能證明未出現在目前程式碼中的外部執行時腳本絕不建立它們。回滾至 Candidate305（SHA-256 3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f）。Candidate302 正式基準未更動。

## GitHub 狀態
本批報告、摘要與狀態文件會發布至指定分支。現有工具無法直接上傳本機 1.6 MB HTML 候選檔；除非完成遠端內容與 SHA 驗證，Candidate306 HTML 遠端狀態為 BLOCKED。

## 下一批
繼續追查剩餘首頁／Song Select CSS 的孤立 selector 分支與歷史 style block。優先檢查完整 class/id token 僅存在 CSS、未在 markup／inline JS 中建立的群組。不要對全域通用 selector、多人／學習模組或無法證明不使用的動態狀態做猜測性刪除，再繼續跨 style block 的重複布局整合。
