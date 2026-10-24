# Stage54：批次 1 基準與版本關係核對
日期：2026-10-25。只讀核對，未修改任何 HTML。

## 結論
正式基準仍未能重新驗證，Candidate212 原始位元組不可取得；不升格任何本機候選版。Candidate277 可在本機重算 SHA，但尚未遠端保存。

## 已查證
- Repository：murorachi/Amq-；default branch main，HEAD 0ebea5488149775f55808683e59dbed168fc0363。
- main 的根目錄 HTML 是 amq_learning_tool_v82_85_30_workspace_proto17.html，8,833,238 bytes，Git blob SHA 799ca066c53617fce9e6ff345b90b663738b1e93；不是最新 Song Select 候選。
- Candidate212：歷史記錄 9,352,632 bytes，SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952；原始位元組無法 materialize，不能重算。
- Candidate229 branch HEAD 4ce4af799d00a21390376832af500379e89ef67a；manifest 記錄 HTML 9,366,832 bytes，SHA-256 8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448。
- Candidate231 branch HEAD d9527cb3e251833c3845a73062d60a89689e812a；manifest 記錄 HTML 9,367,325 bytes，SHA-256 74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf。
- Candidate229→Candidate231：12 commits ahead；Candidate231→Candidate264：140 commits ahead、behind 0。Candidate231 是 Candidate264 的祖先。
- Candidate264 branch HEAD 830c1cb8f923daa46928d75aed91aa21d6c04bd1。
- main 與 Candidate264 diverged，main ahead 14、behind 970；不得將兩者視為同一基準。
- Candidate229/231 HTML 不在對應 branch Git tree；manifest 雜湊是歷史記錄，不是本次遠端二進位讀回驗證。
- Candidate277 local: 9,373,238 bytes；SHA-256 b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371；remote upload/readback NOT RUN。

## 發現
Candidate277 build comment 標 Candidate277，但 <title> 仍是 Candidate219，html data-amq-candidate 仍為 227。此 metadata defect 記錄待修；本輪未修改 HTML。原本本機 CURRENT_STATUS/BASELINE/NEXT_TASK 停留於 Candidate273/275，已在本機保存 pre-stage54 備份並更新。

## 測試
- PASS：repository/default branch、refs、compare 查詢、Candidate277 本機 size/SHA 重算。
- BLOCKED：Candidate212 raw bytes 無法取得，不能重算原始 SHA。
- NOT RUN：Candidate229/231 HTML remote bytes readback；Candidate277 upload/readback/hash。
- 本輪未修改 HTML；Candidate277 與 Candidate276 均保留。
