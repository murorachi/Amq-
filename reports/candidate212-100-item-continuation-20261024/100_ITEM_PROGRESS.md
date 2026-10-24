# AMQ 學習工具：100 項工程待辦進度矩陣

日期：2026-10-24  
工作分支：`amq-candidate104-songselect-layout-fix`  
執行規則：PASS = 已完成且有證據；FAIL = 已實測但存在缺陷；NOT RUN = 尚未完整執行；BLOCKED = 因原始檔、環境或權限限制無法安全完成。靜態檢查、原型測試與正式來源驗收分開記錄。

## 第一階段：基準與資料保護

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 01 | PASS | 已查詢指定分支及 Commit；文件更新後仍需最後讀回遠端 HEAD。 |
| 02 | BLOCKED | Candidate212 Library 記錄為 9,352,632 bytes / SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`；原始位元組無法 materialize，不能重新驗證。 |
| 03 | BLOCKED | Candidate207 Library 記錄存在；原始位元組及 SHA-256 未能重新驗證。 |
| 04 | BLOCKED | Candidate216、218 Library 記錄存在；無法取得原始位元組進行未覆蓋比對。 |
| 05 | PASS | `CURRENT_STATUS.md`、`BASELINE.md`、`NEXT_TASK.md` 已更新並多次讀回；最終一致性仍須本輪末讀回。 |
| 06 | PASS | `BASELINE.md` 明確區分 Candidate212 基準、Candidate207 回滾、Candidate216/218 實驗版本與重建副本。 |
| 07 | BLOCKED | 已保留各版本既有大小與雜湊紀錄，但無法對所有原始候選重新計算 SHA-256。 |
| 08 | BLOCKED | 指定分支只找到兩個 HTML，未取得可驗證的完整建置來源/設定。 |
| 09 | PASS | 文件已區分原始基準、實驗候選、可讀重建副本與正式交付檔。 |
| 10 | BLOCKED | 已建立差異檢查原則；因基準位元組不完整，未執行可作為交付依據的正式前後差異。 |

## 第二階段：專案結構盤點

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 11 | NOT RUN | 已檢查初始 DOM 與動態 DOM 數量；完整靜態/動態 DOM 所有者盤點尚未完成。 |
| 12 | NOT RUN | 108 個 style 區塊可解析；完整重複 CSS 定義與覆蓋關係尚未盤完。 |
| 13 | PASS | 已盤點 70 個 script 區塊並記錄區塊 ID、大小與部分引用。 |
| 14 | NOT RUN | 完整初始化入口與執行順序圖尚未建立。 |
| 15 | NOT RUN | 已取得事件註冊總量及部分重複綁定證據；所有註冊位置尚未完整盤點。 |
| 16 | FAIL | Song Select 鍵盤事件所有權重疊已實測：單次 ArrowDown 可雙移，Enter 可重複觸發或因 DOM 替換而不觸發。原型單一事件所有者測試通過。 |
| 17 | NOT RUN | 已盤點 MutationObserver 數量並量測部分生命週期；每個 Observer 的 owner/callback/cleanup 尚未全部對應。 |
| 18 | NOT RUN | 已量測 ResizeObserver、IntersectionObserver；所有目標、生命週期及清理尚未完成。 |
| 19 | NOT RUN | 已盤點計時器 API 總量；完整 owner 與清理路徑未完成。 |
| 20 | NOT RUN | 已識別部分路由與工作區掛載者；完整路由圖未完成。 |

## 第三階段：依賴圖與清理判定

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 21 | NOT RUN | 已提交 70 個 script、268 條 heuristic window-API 引用的依賴提示；不是 AST 完整呼叫圖。 |
| 22 | NOT RUN | 已整理部分元件建立/使用/移除關係；完整對照表未完成。 |
| 23 | NOT RUN | 已識別多處 UI 建立重複候選；尚未逐項驗證完整依賴。 |
| 24 | NOT RUN | 重複業務邏輯尚未完成全量分類。 |
| 25 | NOT RUN | 資料來源/快取重複項尚未完成全量分類。 |
| 26 | NOT RUN | 設定讀寫重複項尚未完成全量分類。 |
| 27 | NOT RUN | 路由與初始化重複項尚未完成全量分類。 |
| 28 | NOT RUN | 舊功能殘留條件判斷尚未完成全量盤點。 |
| 29 | NOT RUN | 已找到兩個窄候選：不存在對應 dock 按鈕的 `candidate84-workspace-merge-dashboard` relabel script，以及無讀取者的 `candidate105-marker`；全量死碼盤點未完成。 |
| 30 | NOT RUN | 已對圖鑑、資料品質、批次整理、自訂清單及多人入口做初步 Keep/Integrate/Delete/Needs confirmation 判定；全量判定表未完成。 |

## 第四階段：初始化、DOM 與事件系統

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 31 | NOT RUN | 完整重複初始化入口未全部確認。 |
| 32 | FAIL | 已確認 Song Select 鍵盤事件所有權重疊；穩定 stage 單一事件所有者原型通過，但未套用正式來源。 |
| 33 | NOT RUN | Candidate218 的 `updateWatchModes()` 尚未完成真實瀏覽器反覆切換驗收。 |
| 34 | NOT RUN | `watchModeTab`、`customModeTab` 的所有建立路徑尚未完整確認。 |
| 35 | FAIL | 已確認動態重建 `#amqSongSelectTracklist` 可能使直接事件綁定失效。 |
| 36 | NOT RUN | 已量測部分 Observer；DOM 移除後所有事件/計時器/Observer 的清理未完成。 |
| 37 | PASS | 4 類工作區面板開關共 12 次；第一次懶初始化後 Observer 數量穩定。 |
| 38 | PASS | 面板關閉後，原 DOM parent、hidden/class 狀態與 Song Select 路由均恢復。 |
| 39 | NOT RUN | 初始化失敗後的安全重試未測。 |
| 40 | NOT RUN | 已有多組自動化探針；完整初始化/DOM/重複事件回歸套件尚未完成。 |

## 第五階段：音量與影音

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 41 | PASS | 已完整讀取 V44 音量控制區塊。 |
| 42 | PASS | 已完整讀取 V82.35 影音工具列與備援建立路徑。 |
| 43 | PASS | 已靜態確認兩段程式的執行順序。 |
| 44 | PASS | 已在測試副本分別驗證主路徑與強制備援路徑。 |
| 45 | NOT RUN | `#quizView` 不存在時的完整實際行為尚未驗收。 |
| 46 | NOT RUN | 備援路徑仍必要；尚未完成全部路由/失敗恢復驗收，不能刪除。 |
| 47 | PASS | 已設計並測試單一共用控制器原型。 |
| 48 | PASS | 原型已將兩條路徑的音量/靜音事件處理統一。 |
| 49 | NOT RUN | `aniQuizVolume` 預設值、歷史資料與原生重新載入相容性未完成。 |
| 50 | NOT RUN | 真實音訊輸出、影片同步、原生重新載入與完整失敗恢復尚未驗收。 |

## 第六階段：自訂清單與持久化

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 51 | PASS | 建立、加入、移除、重新命名、刪除已在記憶體測試中通過。 |
| 52 | PASS | 兩份清單 ID 不同，重新命名保留 ID。 |
| 53 | PASS | 同一歌曲重複加入會去重。 |
| 54 | PASS | 從 A 移除歌曲不會影響 B。 |
| 55 | NOT RUN | 自訂清單內搜尋/篩選的完整資料來源驗收未完成。 |
| 56 | PASS | 刪除 A 後 B 與其成員仍存在。 |
| 57 | BLOCKED | 原生持久化來源/重新載入測試受瀏覽器環境限制；目前僅記憶體 mock。 |
| 58 | NOT RUN | localStorage/sessionStorage 的完整 key-owner 清單尚未完成。 |
| 59 | NOT RUN | 已識別場景背景 IndexedDB 的 DB/store/version；全專案 DB 升級圖未完成。 |
| 60 | BLOCKED | 原生 IndexedDB Blob 保存/匯出/還原仍因 opaque origin 受阻；另已實測 backup preflight 接受無效 PNG bytes 與 8193 px 圖片，原型修正通過。見 `SCENE_BACKUP_VALIDATION_ACCEPTANCE.md`。 |

## 第七階段：工作區與導航

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 61 | NOT RUN | 已識別部分工作區入口/路由；完整入口圖未完成。 |
| 62 | NOT RUN | 舊頁面依賴尚未全量確認。 |
| 63 | FAIL | 內部面板 adapter 可開啟工作區，但可見導航仍缺多人模式入口。 |
| 64 | NOT RUN | 返回上一頁時的狀態恢復未完成實測。 |
| 65 | FAIL | 四種面板的 adapter lifecycle 通過，但完整可見四工作區使用流程因缺少多人入口而未通過。 |
| 66 | NOT RUN | 關閉工作區後全部 timer/Observer 清理未完成。 |
| 67 | NOT RUN | 舊工作檯與路由攔截器引用關係未完成全量盤點。 |
| 68 | NOT RUN | 舊側欄、首頁卡片、年代時間軸全量殘留檢查未完成。 |
| 69 | PASS | 已判定圖鑑是核心目錄功能；資料品質目前只是指向不存在按鈕的 relabel script。 |
| 70 | NOT RUN | 全部工作區入口的最終保留/整合/刪除尚未完成。 |

## 第八階段：osu!stable UI / Song Select

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 71 | BLOCKED | 已在官方 osu!wiki 找到 Song Select 圖片；尚未取得指定 pinned commit 的本機二進位圖檔。 |
| 72 | PASS | 官方頁面圖片可見尺寸為 1000×563；本機固定參考圖的精確檔案/縮放記錄仍待建立。 |
| 73 | NOT RUN | 已量測主要 tracklist 區域；所有欄位/間距未完整量測。 |
| 74 | PASS | 已量測原始與原型歌曲列高度、間距與可見卡片數。 |
| 75 | PASS | CSS 原型在 1920×1080 顯示約 7.55 張卡片。 |
| 76 | PASS | 原型最下方卡片約 54.6% 可見。 |
| 77 | PASS | hover 3 px，小於 selected 7 px。 |
| 78 | PASS | 點選歌曲後選取狀態與右側標題同步的互動探針通過。 |
| 79 | FAIL | 搜尋/排序/篩選與 AMQ/EMQ/MIX 切換通過；鍵盤上下移動/Enter 的原始事件處理有缺陷，單一事件所有者原型通過。 |
| 80 | BLOCKED | 未能取得 pinned reference 的本機二進位圖檔，像素差異比較未執行。 |

## 第九階段：外部 API / 匯入 / 遊戲

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 81 | NOT RUN | AniList 的錯誤處理已 mock 測試；真實匯入與遠端資料格式未驗收。 |
| 82 | NOT RUN | MAL 的錯誤處理已 mock 測試；真實匯入與遠端資料格式未驗收。 |
| 83 | NOT RUN | VNDB 的錯誤處理已 mock 測試；真實匯入與遠端資料格式未驗收。 |
| 84 | PASS | AniList/MAL/VNDB 本地匯入資料刪除及來源隔離已 mock 驗收。 |
| 85 | FAIL | AniList/MAL 有重複項去重路徑；MAL ambiguous top-level status 會覆寫既有手動狀態。原型修正通過，未套用正式來源。見 `MAL_IMPORT_STATUS_ACCEPTANCE.md`。 |
| 86 | PASS | Mocked route 驗證 primary cover 失敗後的 Jikan fallback 成功，以及 Jikan 429 時保留隱藏封面且無頁面錯誤；真實 provider/CDN 未測。見 `COVER_FALLBACK_ACCEPTANCE.md`。 |
| 87 | FAIL | 429、無效回應、離線有錯誤狀態；基準匯入 fetch 缺少明確 timeout。共用 timeout 原型通過，但尚未套用來源。 |
| 88 | NOT RUN | AMQ/EMQ/MIX 模式切換通過；真實播放/停止/seek/音訊輸出未完成。 |
| 89 | NOT RUN | 猜歌、答案判定、計分與學習紀錄的端到端一致性未完成。 |
| 90 | NOT RUN | 真實多人開房、加入、離開、重連與生命週期未完成。 |

## 第十階段：交付與 GitHub

| # | 狀態 | 證據 / 未完成事項 |
|---:|---|---|
| 91 | PASS | 已建立分項測試計畫與驗收報告。 |
| 92 | PASS | 68 個可執行 inline JS 區塊通過 `node --check`；2 個 payload 區塊排除。 |
| 93 | NOT RUN | 已執行多組整合探針，但完整指定測試套件與回歸尚未完成。 |
| 94 | BLOCKED | Chromium `file://`/localhost 導覽受環境限制；使用 `page.set_content()` 的互動測試不等於原生啟動。 |
| 95 | PASS | 各報告明確區分 PASS/FAIL/NOT RUN/BLOCKED。 |
| 96 | PASS | 三份狀態文件已更新；仍需本輪末端遠端讀回確認。 |
| 97 | PASS | 依賴盤點、音量、清單、工作區、Observer、匯入、Song Select 幾何/鍵盤報告已更新或新增。 |
| 98 | BLOCKED | 不能從少 26 bytes 的重建副本產生正式單檔 HTML。 |
| 99 | BLOCKED | 文件報告已提交；正式 HTML 尚未上傳/讀回/驗證 SHA-256，因原始檔案位元組不可用。 |
| 100 | BLOCKED | 最終交付未完成；需先恢復基準位元組完整性、套用並驗收正式修正。 |

## 目前最高優先阻塞

1. Candidate212 原始 HTML 無法以位元組完整方式取得；不可用少 26 bytes 的重建副本交付。
2. Song Select 鍵盤事件所有權、批次選取畫面同步、音量備援一致性及 API timeout 已找到根本原因與可測試原型，但尚未套用正式來源。
3. 四工作區的多人入口、IndexedDB/Blob 原生持久化、真實 API/音訊/多人流程與像素差異仍未完成。

## 2026-10-24 continuation addendum

- Song Select keyboard ownership defect and stable-stage prototype: `SONGSELECT_KEYBOARD_ACCEPTANCE.md`.
- Batch selection state/render mismatch and single-owner Set prototype: `BATCH_SELECTION_ACCEPTANCE.md`.
- Import timeout gap and shared timeout prototype: `IMPORT_API_ERROR_ACCEPTANCE.md`.
- Scene background backup preflight validation defect and decode/dimension prototype: `SCENE_BACKUP_VALIDATION_ACCEPTANCE.md`.
- Custom-list isolation, imported-list removal, four-workspace panel lifecycle, observer mount-cycle and geometry evidence are recorded in their respective acceptance reports in this directory.
- These prototypes are not release changes. Candidate212 raw-byte access remains the gating blocker; no production HTML was modified or uploaded.


- Additional import conflict finding: `MAL_IMPORT_STATUS_ACCEPTANCE.md` reproduces the ambiguous status overwrite and validates a narrow prototype fix. Live provider schema confirmation remains NOT RUN.

- Candidate212 watch/custom-mode tabs pass 10 repeated switches with exactly one direct click listener each; Candidate218's separate artifact remains unavailable for exact runtime comparison. See `WATCH_MODE_TAB_ACCEPTANCE.md`.

- MAL pagination/dedup mock test passes: two pages, 301 entries, one local write, 300 duplicate skips, and first explicit user-list status wins. Item 85 remains FAIL because ambiguous top-level status can still overwrite manual state; see `MAL_IMPORT_STATUS_ACCEPTANCE.md`.
