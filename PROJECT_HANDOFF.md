# PROJECT HANDOFF：AMQ 練習工具 V82.65

## 唯一基準與交付檔

唯一直接基準是 V82.64 Release ZIP，53,366,951 bytes，SHA-256 `260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7`。不可用 V82.61/V82.62 替代或混搭。

- GitHub repo：https://github.com/murorachi/Amq-
- 工作分支：https://github.com/murorachi/Amq-/tree/v82.65-resume-checkpoint
- 續接錨點：https://github.com/murorachi/Amq-/blob/v82.65-resume-checkpoint/V82_65_RESUME_CHECKPOINT.md
- 交付 ZIP：AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip
- ZIP 大小：124658780 bytes
- ZIP SHA-256：`db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`
- ZIP CRC PASS；291 個封裝項目；內部 290/290 SHA-256 PASS；UTF-8 檔名正常。
- 下載用外部 sidecar：`AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip.sha256`，已提交至本分支。

## V82.65 正式候選資產指紋

- HTML：8,786,930 bytes；SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Server：88,403 bytes；SHA-256 `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736`
- Catalog：36,540,011 bytes、54,778 rows；SHA-256 `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652`
- Unavailable registry：40 bytes；SHA-256 `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a`

## 已有有效驗收

- 主測試總覽：8 批、22/22 命令 PASS、0 FAIL、0 TIMEOUT、0 彙總錯誤。
- 完整 HTML Chromium 個人條件：5/5 案例 PASS。
- 完整 HTML Chromium 來源模式：EMQ-only/Mixed 2/2 子案例 PASS。
- JS/Python metadata 固定案例比對覆蓋完整 54,778 筆曲庫。
- 每批保存退出碼、stdout/stderr 與資產 fingerprint；測試只適用於上述精確指紋。

## 尚未完成

整體仍為 PARTIAL。熟悉度、tag、focus、觀看狀態、VNDB／個人清單、EMQ dedicated list 與黑名單的全部模式交叉組合尚未全驗；多人 server-authoritative 個人資料契約未完成；真實外網音訊／API、IndexedDB Blob 往返、兩裝置 LAN/WebSocket/重連未驗收。八項工程整頓工作流均維持 PARTIAL。

## 測試工具／不要重做

`run_regression_tests.py`、`tests/aggregate_v82_65_runs.py`、`tools/rebuild_integrity_manifest.py`、`tools/build_v82_65_package.py`。先核對 VERSION.json 四項產品指紋；相同時不要無故重跑已有效的 22 個命令。不得清除真實 LocalStorage、IndexedDB、學習歷史、清單或伺服器狀態。

## GitHub 上傳狀態

交接文件和外部 SHA-256 sidecar 已提交到此分支，並可從 GitHub 讀回。現有連接器沒有直接上傳本機二進位 ZIP 成為 Release asset 的工具，因此**不能聲稱 ZIP 本體已上傳到 GitHub Release**。ZIP 由對話中的下載連結提供。
