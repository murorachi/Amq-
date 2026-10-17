# PROJECT HANDOFF：AMQ 練習工具 V82.65

## 唯一基準與目前交付

唯一直接基準為 V82.64 Release ZIP，53,366,951 bytes，SHA-256 260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7。不可用 V82.61/V82.62 替代或混搭。

- GitHub repo：https://github.com/murorachi/Amq-
- 工作分支：https://github.com/murorachi/Amq-/tree/v82.65-resume-checkpoint
- 續接錨點：https://github.com/murorachi/Amq-/blob/v82.65-resume-checkpoint/V82_65_RESUME_CHECKPOINT.md
- 正式候選交付 ZIP：124,644,301 bytes
- ZIP SHA-256：137181402b43b4d3fa790e04565b382200d8429b794f758b3610748956d4284b
- ZIP CRC：PASS；286 個封裝項目；內部 285/285 SHA-256 PASS
- 外部校驗檔：https://github.com/murorachi/Amq-/blob/v82.65-resume-checkpoint/AMQ_V82_65_%E5%80%99%E9%81%B8%E9%A1%8C%E6%B1%A0%E8%88%87%E7%AF%A9%E9%81%B8%E8%B3%87%E6%96%99%E6%B5%81%E6%95%B4%E9%A0%93%E6%AA%A2%E6%9F%A5%E9%BB%9E.zip.sha256

## 正式候選資產

- V82.65 HTML：8,786,930 bytes；SHA-256 abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33
- V82.65 server：88,403 bytes；SHA-256 41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736
- Catalog：36,540,011 bytes，54,778 rows；SHA-256 2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652
- Unavailable registry：40 bytes；SHA-256 a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a

## 已有有效驗收

V82.65 彙總 7 批、21/21 命令 PASS，0 FAIL、0 TIMEOUT，彙總器無錯誤。EMQ-only/Mixed 完整 HTML 報告另列兩個子案例都通過。測試涵蓋 candidate policy、合成個人條件、清單範圍 adapter、Chromium 單人範圍流程、來源模式流程、54,778 筆 metadata ID 序列比對、曲庫完整性、設定遷移、備份控制測試和繼承回歸。測試只對上述精確指紋有效。

## 未完成狀態

整體仍為 PARTIAL。個人 tag/status/focus/VNDB/清單在所有模式的完整 UI 交叉組合未全測；伺服器尚不能依原始使用者資料自行重算所有個人狀態；真實外網音訊、IndexedDB Blob 往返、兩裝置 LAN/WebSocket/重連未驗收。八項工程整頓矩陣全為 PARTIAL。

測試工具：run_regression_tests.py、tests/aggregate_v82_65_runs.py、tools/rebuild_integrity_manifest.py、tools/build_v82_65_package.py。不中斷前無需重跑有效 21 項；先核對 VERSION.json 中的四項指紋。不可清除真實 LocalStorage、IndexedDB、學習歷史、清單或伺服器狀態。

## GitHub 二進位資產狀態

文件與校驗字串已提交至本分支。這個 GitHub 連接器沒有直接上傳二進位 Release asset 的工具；因此不能聲稱 124 MB ZIP 已出現在 GitHub Release。實際 ZIP 由 ChatGPT 的下載連結交付，遠端校驗字串已提交作為後續核對依據。
