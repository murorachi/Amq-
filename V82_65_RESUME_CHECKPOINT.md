# V82.65 工作續接檢查點

狀態：候選題池一致性檢查點，可續接；不是整體工程完成版。

## 唯一基準

- V82.64 Release ZIP：53,366,951 bytes；SHA-256 `260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7`
- Release：https://github.com/murorachi/Amq-/releases/tag/AMQ

## 目前 V82.65 產品指紋

- HTML：8,786,930 bytes；SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Server：88,403 bytes；SHA-256 `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736`
- Catalog：36,540,011 bytes；SHA-256 `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652`
- Unavailable registry：40 bytes；SHA-256 `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a`

## 目前交付包

- ZIP：124658780 bytes
- ZIP SHA-256：`db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`
- ZIP CRC PASS；291 entries；內部 SHA256SUMS 290/290 PASS；UTF-8 檔名正常。
- Sidecar：`AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip.sha256` 已在 GitHub 分支 `v82.65-resume-checkpoint`。
- GitHub 續接分支：https://github.com/murorachi/Amq-/tree/v82.65-resume-checkpoint

## 已驗收且不應無故重做

- 主彙總：8 batches / 22 named commands PASS, 0 FAIL, 0 TIMEOUT, 0 aggregation errors.
- Full-HTML Chromium：AMQ custom-list/year hard scope, EMQ-only/Mixed modes 2/2, personal-condition scenarios 5/5.
- JS/Python metadata 固定案例比對、54,778-row catalog 完整性、設定遷移、備份控制測試及繼承回歸。

## 尚未完成

- 所有個人熟悉度、tag、focus、觀看狀態、VNDB／個人清單、EMQ 專用清單和黑名單的全模式交叉組合。
- Server-authoritative 個人狀態契約。
- 真實外網音訊/API、IndexedDB Blob 往返、兩裝置 LAN/WebSocket/重連。
- 八項工程整頓工作流全維持 PARTIAL。

## 中斷後續接

1. 核對 VERSION.json、總測試報告和四項產品指紋；一致就保留 22 個有效命令的證據。
2. 指紋無變時，不要重跑已通過的命令；只從 NEXT_TASK.md 未完成項目續接。
3. 文件或報告變更後執行 `python tools/build_v82_65_package.py`，重新檢查 ZIP sidecar、CRC、內部 manifest。
4. 不清除真實 LocalStorage、IndexedDB、學習紀錄、清單或伺服器狀態。

GitHub connector 可提交文字文件與 sidecar，但目前沒有直接上傳二進位 Release asset 的操作；不要宣稱此 ZIP 本體已上傳到 Release。
