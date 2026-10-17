# V82.65 工作續接檢查點

建立時間：2026-10-17（Asia/Taipei）
狀態：候選池整頓檢查點，可續接；**不是整體工程完成版**。

## 1. 唯一基準與目前候選指紋

- 唯一直接基準：V82.64 Release ZIP，baseline/V82_64_exact_release/V82.64_Release_original.zip
- V82.64 ZIP：53,366,951 bytes；SHA-256 260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7
- V82.64 HTML：8,774,647 bytes；SHA-256 dc1c2d1fc147b0659779e48ff9294f6718f87abc712cd374f52207a81652c17c
- V82.65 HTML：8,786,930 bytes；SHA-256 abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33
- V82.65 server：88,403 bytes；SHA-256 41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736
- Catalog：36,540,011 bytes；SHA-256 2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652
- Unavailable-audio registry：40 bytes；SHA-256 a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a

若受測資產任一指紋改變，不能沿用這份測試總覽當作新指紋的通過證據。

## 2. 已完成的可追溯工作

- V82.64 Release ZIP 已重新下載，實際大小、SHA-256 與 ZIP CRC 均驗證通過。
- 原始 V82.64 HTML／伺服器與歷史 V82.61／V82.62 備份均保留；歷史檔只供比較和回滾。
- V82.65 已整理候選 metadata 政策、AMQ 清單正式候選入口 adapter、失效範圍 fail-closed、來源適用範圍、設定遷移及伺服器端 metadata 政策鏡像。
- reports/V82_65_完整測試總覽.json 彙總 6 批、20 個已完成命令：20 PASS、0 FAIL、0 TIMEOUT；每個命令有退出碼與日誌路徑，各批受測資產指紋相同。
- 覆蓋政策邊界、合成交集／個人隔離、EMQ 清單 adapter、Chromium 完整 HTML 的單人 AMQ 清單＋年份流程、54,778 筆曲庫的 JavaScript／Python metadata ID 順序比對、曲庫完整性、備份邏輯與既有回歸。
- python tools/rebuild_integrity_manifest.py 會驗證總覽與目前受測指紋一致後重建 VERSION.json 和 SHA256SUMS.txt。
- 最終檢查點 ZIP：124,574,989 bytes；SHA-256 cd286ae77b894ca635f00746c3cc616f5e638ead3b38424d44aa38518760c0ce。外部 sidecar 檔名為 AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip.sha256。ZIP CRC 通過；271 個 ZIP entries；內部 manifest 270/270 通過。

## 3. 尚未完成／不得宣稱通過

- UI → storage → migration → AMQ／EMQ／Mixed 各模式 runtime 的全部組合未全量驗證。
- 熟悉度、標籤、焦點學習、觀看狀態、VNDB 個人清單、EMQ 專用清單與所有其他條件的端到端交集仍需擴大驗收。
- 曲庫跨語言比對只證明 metadata 政策固定案例和 ID 順序，不等於個人資料流全面一致。
- 未實際呼叫外網音訊／第三方 API；Chromium 音訊和外網請求為 mock／阻擋。
- IndexedDB 場景／背景 Blob 真正匯出還原未驗收。
- 多人測試只有合成資料與 loopback HTTP，沒有兩台裝置 LAN／WebSocket／斷線重連實測。
- 八項工程整頓矩陣均為 PARTIAL；20/20 僅適用於列出的測試與這組指紋，不是整體完工宣告。

## 4. 中斷後怎樣接續，不要從頭重跑

1. 讀本檔、VERSION.json、reports/V82_65_完整測試總覽.json、reports/V82_65_八項工程整頓驗收矩陣.csv。
2. 先核對上述 HTML／server／catalog／registry 指紋；完全一致時保留已完成批次，不要無理由重跑。
3. sha256sum -c SHA256SUMS.txt 必須成功；若報告或文件改了，先跑 python tools/rebuild_integrity_manifest.py。
4. 重建 ZIP 與外部 .sha256，執行 ZIP CRC 與內部 manifest 校驗。
5. 從未完成的驗收項目續接。改動程式後另存新指紋，並只重跑受影響測試及必要回歸。
6. 不刪除真實 LocalStorage／IndexedDB／伺服器狀態；只用隔離或合成資料。

本檔是對話以外的續接錨點，不代替程式包、測試日誌、規則契約或實機驗收。
