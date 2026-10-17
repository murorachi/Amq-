# AMQ 練習工具維護基準

## 唯一直接基準

- 版本：V82.64 Release「AMQ V82.64」
- Release：https://github.com/murorachi/Amq-/releases/tag/AMQ
- 原始 ZIP：baseline/V82_64_exact_release/V82.64_Release_original.zip
- 大小：53,366,951 bytes
- SHA-256：260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7
- GitHub Release API digest 相符，且 GitHub Actions 已實際下載並通過 SHA-256 與 ZIP CRC 驗證。

## V82.64 正式資產指紋

| 檔案 | 大小 | SHA-256 |
|---|---:|---|
| amq_learning_tool_v82_64_history_data_cleanup.html | 8,774,647 | dc1c2d1fc147b0659779e48ff9294f6718f87abc712cd374f52207a81652c17c |
| anisong_multiplayer_room_server_v82_64.py | 87,389 | b675da8fd0abc7c4f0819af59d1b1332ac954d968930eff918e7b9c20caa83fd |
| anisong_multiplayer_catalog_server.json | 36,540,011 | 2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652 |
| anisong_multiplayer_unavailable_audio_v82_59.json | 40 | a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a |

## V82.65 候選指紋

| 檔案 | 大小 | SHA-256 |
|---|---:|---|
| amq_learning_tool_v82_65_candidate_pool_cleanup.html | 8,786,930 | abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33 |
| anisong_multiplayer_room_server_v82_65.py | 88,403 | 41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736 |
| anisong_multiplayer_catalog_server.json | 36,540,011 | 2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652 |
| anisong_multiplayer_unavailable_audio_v82_59.json | 40 | a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a |

V82.61/V82.62/V82.59 備份只供追溯、比較和回滾，不得當成 V82.65 的直接基準或混入執行資產。原始 V82.64 檔案不可覆蓋。測試 PASS 僅適用於報告所列精確指紋；正式清單以 VERSION.json、SHA256SUMS.txt 及 ZIP 外部 .sha256 為準。
