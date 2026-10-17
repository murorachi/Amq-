# V82.65 AUDIT-01：唯讀靜態架構盤點

日期：2026-10-18（Asia/Taipei）

## 基準驗證範圍

實際取得的 HTML：`amq_learning_tool_v82_65_candidate_pool_cleanup.html`  
大小：8,786,930 bytes  
SHA-256：`abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`

本次重新計算的 HTML SHA-256 與既有 V82.65 HTML 指紋相符。這只驗證 HTML，不代表正式 ZIP、server、catalog 或整包 manifest 已在本次重新驗證。產品檔未修改。

## 靜態盤點

- 50 個 CSS style 區塊，已記錄順序、行號、位元組長度與區塊 SHA-256。
- 41 個 inline script 區塊，包含可執行 JavaScript 與非執行資料 payload；無外部 script src。
- 已產生 script、CSS、storage 靜態盤點 CSV。
- 已產生 ARCHITECTURE.md、DEPENDENCY_MAP.md、REFACTOR_PLAN.md、BASELINE.md、CURRENT_STATUS.md、NEXT_TASK.md。
- 最大 inline script 約 5.06 MB；大型內嵌資料區塊約 2.68 MB。拆分時必須區分執行程式與資料，且保留順序與原始位元。

## 本次未完成

- 正式 V82.65 ZIP 本體及其 sidecar 配對驗證。
- 完整呼叫圖、動態 storage key、timer/listener 與 DOM writer/reader 的完整追蹤。
- 模組化原始碼建置、deterministic build、自動化回歸及真實 Firefox／外網音訊／IndexedDB／多裝置驗收。

## 交付封裝

本地唯讀盤點包：`AMQ_V82_65_AUDIT_01.zip`  
大小：4,370,764 bytes  
SHA-256：`f2ae2ce39ae182d33b1d681d6cd6b00aaa6b772f5956a7394addffad423db111`  
ZIP CRC：PASS；11 個唯一路徑；內部 SHA-256：PASS。

注意：此文件是盤點摘要，不代表 ZIP 二進位已上傳至 GitHub。完整 ZIP 與 sidecar 仍以本次對話中的本地交付檔為準。

## 下一步

先取得並驗證指定 V82.65 正式交付 ZIP；基準包未完成驗證前，不修改產品程式。之後核對 SOURCE_SPLIT_01 分離包及其重建 HTML 是否與上述基準逐位元相同，再開始無損分離與可重現建置。
