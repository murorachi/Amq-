# V82.86.04 關鍵跨片段依賴所有權盤點

基準分支：`v82.86.03-quiz-lifecycle-ownership-01`  
基準 commit：`55f290ebdeefcbb0fc1b21abc64ccddc0e8e372b`  
本階段分支：`v82.86.04-critical-cross-fragment-ownership-01`  
產品基準：V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`。V82.65 保持不可變。

## 結論

本階段只做依賴追蹤、契約測試與文件更新；不修改產品 JS/CSS、fragment、manifest 或生成 HTML。確認的是跨片段介面和資料流耦合，不是已確認的使用者可見缺陷。既有 AST 計數（75 個 cross-fragment direct-call edge、359 個 ambiguous edge）仍是搜尋線索，不能直接視為錯誤數。

## 1. 答案判定與播放器

- `src/scripts/script_004.htmlpart` 的測驗核心位於 IIFE 內，透過 `window.__aniQuizStateV45` 提供唯讀狀態快照，並透過 `window.__aniQuizStopStateV82`、`window.__aniQuizSubmitV47` 等明確橋接提供部分生命週期操作。快照不是 setter，也不代表核心已完全解耦。
- 答題結算仍依賴較早載入的全域函式 `st`、`save`、`updateStats`、`render`。這些函式在 `src/scripts/script_001.htmlpart` 定義；fragment manifest 顯示 script_001 的載入順序早於 script_004。這是可確認的載入順序／全域符號耦合，尚無證據證明其本身造成故障。
- `playQuizAudio` 呼叫 `listenSong`，並暫時包裝全域 `window.mediaFiles` 以在猜歌模式只保留音訊候選，呼叫後恢復原函式。這裡存在同步全域替換與播放器內部讀取時機的耦合。現有測試使用媒體 stub，未證明真實 provider 的延遲／非同步讀取行為；本階段不合併 listener、不更動播放程式。
- `classifyQuiz`、`submitQuiz` 會改動測驗狀態、計時與 DOM，並透過事件通知其他功能。事件消費者應視為另一條介面，不能只靠函式名稱判定單一所有權。

## 2. AMQ 自訂清單到出題池

- `src/scripts/script_025.htmlpart` 管理 `aniCustomPracticeListsV1`，清單以 `animeIds` 表示作品 ID；`validAnimeIds` 透過作品資料驗證 ID，`animeSongs` 再將作品集合轉成歌曲列。
- script_025 不直接包裝 IIFE 私有的 `getQuizPool`，而是註冊 `window.__aniApplyQuizCustomListScopeV8265` adapter。這是刻意建立的跨 IIFE 邊界。
- `src/scripts/script_004.htmlpart` 先建立音源健康篩選，再呼叫 custom-list adapter。若 adapter 拋錯，會採 fail-closed（空候選）處理；若 adapter 不存在，核心另檢查舊設定與 invalid-scope 標記，避免靜默放寬範圍。
- 風險不是「清單程式一定有 bug」，而是候選池順序與 adapter 缺席時的 fallback 都是行為契約，任何搬動都需要保留空清單、失效 scope、學習焦點模式與音源健康篩選的順序。

## 3. EMQ 清單到出題池

- `src/scripts/script_040.htmlpart` 讀寫 `aniEmqWorkListsV8254`、`aniEmqWorkListsSelectedV8254`、音源 override 與設定等 localStorage keys。
- `src/modules/emq_list_membership.htmlpart` 將清單中的 `workIds`、`vndbIds`、`songIds` 轉成歌曲 ID：VNDB ID 可經 `getWorkByVndbId` 對應作品，作品 ID 與直接歌曲 ID 也會參與 membership 判斷。
- script_040 在 EMQ API ready 後包裝 `__aniEmqAPI.combinePool`，將選取清單解析成 song ID set，再交給原 combinePool；無選取且 scope 正常時沿用原行為，invalid-scope 時傳入空集合。這是重要的資料邊界：work ID、VNDB ID、song ID 不能互換。
- 現有 `emq_selection_contract.test.cjs`、`custom_list_crud_reload_contract.test.cjs` 與瀏覽器驗收覆蓋部分選取、membership、reload 與 invalid-scope 行為；本階段新契約補上來源介面與接線存在性檢查，不宣稱涵蓋所有 CRUD、備份及損毀資料情境。

## 4. 儲存介面與 legacy 路徑

- `src/modules/storage_repository.htmlpart` 對外提供 `window.__aniStorageRepositoryV1`，包含 adapter registry、`registerAdapter`、`setDefaultAdapter` 與 legacy import preview/import 等能力。
- AMQ 與 EMQ 自訂清單程式目前仍直接使用 localStorage keys，並非全部透過 storage repository adapter。這是兩條並存的儲存路徑，不能因為 repository module 存在就推論所有資料都已遷移。
- 本階段不移轉 key、不更改資料格式、不將直接 localStorage 存取改成非同步 adapter。遷移需要獨立的讀寫失敗、舊資料相容、備份還原與重新載入驗收。

## 5. 已確認／尚未解決

| 項目 | 判定 | 下一步 |
|---|---|---|
| script_001 的 `st/save/updateStats/render` 被測驗核心使用 | 已確認的全域／載入順序耦合 | 未有回歸測試前不移動定義 |
| AMQ custom-list adapter 連到私有出題池 | 已確認的明確 adapter | 保留 fail-closed 與 filter order 契約 |
| EMQ `combinePool` 包裝與 ID 轉換 | 已確認的 API/ID 邊界 | 擴充 work/song/VNDB 跨 reload/backup 測試 |
| Storage repository 與直接 localStorage 同時存在 | 已確認的雙路徑 | 先盤點遷移範圍，不做大規模切換 |
| 真實播放器對全域 `mediaFiles` 的非同步讀取時機 | 尚未驗證 | 真實 provider acceptance；不從 stub 推論 |
| 所有 75 個跨片段呼叫與 359 個 ambiguous edge | 尚未全部分類 | 逐一優先處理高風險 call sites，不宣稱全圖完成 |

## 6. 測試與產物

新增 `tests/unit/critical_cross_fragment_dependency_contract.py`，以目前正式來源檢查：
1. 測驗狀態／停止橋接與播放器呼叫邊界存在。
2. AMQ 清單 adapter、作品 ID 驗證及 fail-closed 接線存在。
3. EMQ 清單的 work/VNDB/song ID membership 與 combinePool wrapper 存在。
4. Storage repository 的 adapter API 與 legacy localStorage 路徑同時存在。
5. backlog 對 TODO-007、TODO-008、TODO-010 的部分進度標記一致。

GitHub Actions 的 `tools/verify.py` 仍是產品 fingerprint 與 deterministic V82.82 build 的主要驗證。此報告不將靜態契約測試冒充瀏覽器或真實 provider 驗收。

## 7. 風險、回滾與下一步

- 風險：本階段沒有搬動產品程式，因此不會消除既有全域耦合；真實音訊 provider、Firefox、正式網域儲存政策與完整 IndexedDB 故障矩陣仍是外部門檻。
- 回滾：revert 本分支新增報告、契約測試及 backlog/status/workflow 文件更新即可；不需要產品回滾。
- 下一步：針對 AMQ／EMQ 清單的 ID 流程做跨 CRUD、localStorage reload、backup/restore 的完整邊界矩陣；同時另立真實播放器 provider 驗收，不在本階段抽離 `listenSong` 或 `mediaFiles`。
