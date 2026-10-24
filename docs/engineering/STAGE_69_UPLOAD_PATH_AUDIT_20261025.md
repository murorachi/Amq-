# Stage 69 — Candidate283 上傳路徑盤點（2026-10-25）

## 目標
找出可將精確 Candidate283 HTML 安全送至 GitHub／雲端瀏覽器的既有通道；不以舊版檔案代替，不變更正式 HTML。

## 已確認事實
- Candidate283 本機檔案：`amq_learning_tool_v82_85_97_candidate283_version_metadata_sync_20261025.html`
- 大小：`9,379,765` bytes
- SHA-256：`aa1af13d2ff9419968ba92f382c75e0fd65d0ae4b72957331a1b488f65d74a0b`
- Candidate282 parent SHA-256：`66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- Candidate283 與 Candidate282 正規化後完全相同；只有第一個 AMQ build 註解及 `<title>` 兩處變更。

## 上傳通道盤點
- GitHub Connector 提供 `create_blob`（UTF-8/base64 字串）、tree、commit、ref 操作，但目前沒有直接把本機路徑作為二進位檔上傳的 action。
- 本機容器沒有可用的外網 DNS（`curl https://github.com` 回報 `Could not resolve host: github.com`），也沒有可見的 GitHub token 環境變數或已設定本機 git checkout。
- 現有 GitHub workflow `.github/workflows/download-file-for-chatgpt.yml` 只接受公開 HTTPS `download_url`，下載後產生 Actions artifact；它不能接收本機路徑或直接接收附件 bytes。
- 目前沒有已確認的公開 HTTPS URL 指向 Candidate283；因此無法安全觸發該 workflow 取得正確檔案。
- 不以 9.38 MB HTML 直接塞入聊天工具字串參數；在未確認 payload 限制與完整性前，存在截斷／請求失敗風險。

## 測試與狀態
- PASS：本機 SHA-256 與大小已重算。
- PASS：Candidate282 → Candidate283 的 diff 僅含兩個預期 metadata 變更；將這兩處還原後與 Candidate282 全檔相同。
- PASS：GitHub workflow 清單已查閱，確認既有下載 workflow 只接受 HTTPS URL。
- BLOCKED：無可直接使用的本機檔案二進位上傳通道，且沒有公開下載 URL。
- NOT RUN：遠端 Candidate283 bytes/SHA 驗證、Candidate283 雲端瀏覽器互動測試。

## 決策
不建立假的遠端驗收，不用 v82.85.30 或 v82.85.46 代替 Candidate283，也不修改 HTML 來繞過上傳問題。先取得可用的 HTTPS 檔案來源或受支援的 binary upload action，再進行上傳及遠端 SHA 驗證。

## 下一步
1. 提供一個可讓 GitHub Actions 下載 Candidate283 的公開 HTTPS 檔案 URL，或在可用的上傳介面將該檔案發布到指定位置。
2. 執行既有 `download-file-for-chatgpt.yml`，核對下載檔名、大小、SHA-256，並取回 artifact。
3. 將已驗證檔案放到可執行的測試來源，再用 TinyFish 進行頁面互動驗收。
4. 若要正式提交到分支，先確認目標路徑、分支及完整 bytes 傳輸方式；不得只提交 metadata 或文件卻聲稱 HTML 已上傳。
