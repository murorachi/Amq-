# V82.65 工作續接檢查點

狀態：候選題池一致性檢查點，可續接；不是整體工程完成版。

## 唯一基準
- V82.64 Release ZIP：53,366,951 bytes；SHA-256 260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7
- Release：https://github.com/murorachi/Amq-/releases/tag/AMQ

## 目前 V82.65 產品指紋
- HTML：8,786,930 bytes；SHA-256 abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33
- Server：88,403 bytes；SHA-256 41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736
- Catalog：36,540,011 bytes；SHA-256 2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652
- Unavailable registry：40 bytes；SHA-256 a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a

## 目前交付包
- ZIP：124,644,301 bytes
- ZIP SHA-256：137181402b43b4d3fa790e04565b382200d8429b794f758b3610748956d4284b
- ZIP 外部 SHA-256 sidecar 已存於 GitHub 分支 v82.65-resume-checkpoint
- ZIP CRC PASS；286 entries；內部 manifest 285/285 PASS
- GitHub branch: https://github.com/murorachi/Amq-/tree/v82.65-resume-checkpoint

## 已驗收且不應無故重做
- 7 batches / 21 named test commands: 21 PASS, 0 FAIL, 0 TIMEOUT, aggregation errors 0.
- Full-HTML Chromium: AMQ custom list + year intersection/fail-closed cases; EMQ-only and Mixed source-mode cases.
- JS/Python parity over fixed metadata cases, including the 54,778-row catalog.
- Regression, catalog integrity, selection migration, backup-control tests.

## 尚未完成
- 個人熟悉度、tag、focus、觀看狀態、VNDB／其他個人清單、EMQ dedicated list 和黑名單的所有模式端到端交叉組合。
- Server-authoritative individual state contract.
- Real external audio/API, IndexedDB Blob round trip, two-device LAN/WebSocket/reconnect.
- All eight engineering workstreams remain PARTIAL.

## Resume procedure
1. 核對主測試報告、VERSION.json 與四項產品指紋；一致時保留 21 項有效證據。
2. 不以舊版號判斷測試有效與否，依每項測試記錄的載入路徑和指紋判斷。
3. 有程式改動時只重跑受影響測試與必要回歸；每批需保留 stdout/stderr/exit code，不允許逾時算 PASS。
4. 文件或報告變更後執行 python tools/build_v82_65_package.py；重新檢查 ZIP sidecar、CRC 與內部 manifest。
5. 不清除真實 LocalStorage、IndexedDB、學習紀錄、清單或伺服器狀態。

## GitHub 二進位上傳狀態
文字交接與 SHA-256 sidecar 已提交；目前連接器無法把本機二進位 ZIP 上傳為 Release asset，所以實際 ZIP 以本對話下載連結交付，不要宣稱它已出現在 Release。
