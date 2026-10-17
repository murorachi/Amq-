# PROJECT HANDOFF：AMQ 練習工具 V82.65

## 基準與目前候選

唯一直接基準為 V82.64 Release ZIP，53,366,951 bytes，SHA-256 260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7。不可用 V82.61/V82.62 替代或混搭。

- GitHub repo：https://github.com/murorachi/Amq-
- 工作分支：https://github.com/murorachi/Amq-/tree/v82.65-resume-checkpoint
- 續接錨點：https://github.com/murorachi/Amq-/blob/v82.65-resume-checkpoint/V82_65_RESUME_CHECKPOINT.md
- V82.65 HTML：8,786,930 bytes；SHA-256 abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33
- V82.65 server：88,403 bytes；SHA-256 41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736
- Catalog：36,540,011 bytes，54,778 rows；SHA-256 2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652
- Registry：40 bytes；SHA-256 a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a

## 已有有效驗收

V82.65 彙總 7 批、21/21 命令 PASS，0 FAIL、0 TIMEOUT。EMQ-only/Mixed 完整 HTML 報告另列兩個子案例都通過。測試涵蓋 candidate policy、合成個人條件、清單範圍 adapter、Chromium 單人範圍流程、來源模式流程、54,778 筆 metadata ID 序列比對、曲庫完整性、設定遷移、備份控制測試和繼承回歸。測試只對上述精確指紋有效。

## 未完成狀態

整體仍為 PARTIAL。個人 tag/status/focus/VNDB/清單在所有模式的完整 UI 交叉組合未全測；伺服器尚不能依原始使用者資料自行重算所有個人狀態；真實外網音訊、IndexedDB Blob 往返、兩裝置 LAN/WebSocket/重連未驗收。八項工程整頓矩陣全為 PARTIAL。

## 測試工具／不要重做

入口 run_regression_tests.py；分批參數與總覽見 README_V82_65_候選題池整頓檢查點.md；彙總器 tests/aggregate_v82_65_runs.py；版本／雜湊工具 tools/rebuild_integrity_manifest.py。測試每項保留 stdout、stderr、退出碼與指紋。不因對話串流錯誤就重跑 21 個已有效命令；先核對指紋。不可清除真實 LocalStorage、IndexedDB、學習歷史、清單或伺服器狀態。

## 下一步

依 NEXT_TASK.md 先補完整頁面個人條件交集及多人 server-authoritative 契約，再做空池診斷，之後才評估模組化。MODULARIZATION_PLAN.md 現階段僅規劃，尚未拆模組。

GitHub 連接器可提交文字文件，但目前沒有直接上傳二進位 Release asset 的操作；目前 124 MB 完整 ZIP 可由本對話的下載連結取得，沒有宣稱 ZIP 已上傳至 GitHub Release。下載後如需正式 Release 資產，需由有權限的上傳流程另行傳送，並以外部 .sha256 校驗。
