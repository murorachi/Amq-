# Stage55：批次 2 全專案依賴盤點與清理分類
日期：2026-10-25。盤點對象為本機 Candidate277 唯讀快照與既有 Candidate212/231/232 報告；未修改 HTML/CSS/JS 或資料。

## 靜態掃描
- Candidate277：9,373,238 bytes；SHA-256 b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371。
- 初始 DOM：272 IDs，272 unique。
- 69 script tags：67 executable JS + 2 data payloads (AniList ID map JSON、EMQ gzip/base64)。
- JavaScript：67/67 node --check PASS。
- CSS：109 style blocks；3,628 qualified rules including nested conditions；2,244 selector strings；647 selector strings repeated, 1,384 extra repeated occurrences；stylesheet/declaration parse errors 0。
- Event mentions: addEventListener 479, removeEventListener 4.
- Observer mentions: MutationObserver 54, ResizeObserver 3, IntersectionObserver 5.
- Timer mentions: setTimeout 144, setInterval 10, clearTimeout 38, clearInterval 9.
- fetch mentions 19; indexedDB mentions 15.
- Repeated selectors are integration hotspots, not safe deletion targets. CSS count differs from Candidate231 report because candidate version and nested-rule counting method differ.

## Keep
Song Select core; AMQ/EMQ/MIX/Singer and payload; custom-list CRUD/storage; separate EMQ list storage; watch-status/source import; learning history/wrong answers/familiarity/blacklist/SRS; audio/video/queue/volume/scene background IndexedDB; multiplayer/settings; separate work-ID and song-ID batch ownership.

## Integrate
- Route/workspace controller and panel lifecycle.
- CSS cascade by view/state with source-order/media/computed-style evidence.
- syncListSelectors reader/writer callers.
- Watch/custom tab and fallback/template creators.
- Remaining work-batch actions into canonical API only after mapping all callers.
- Shared import validation/error/timeout logic while preserving provider-specific data semantics.
- Observer/timer ownership and teardown.

## Delete (only previously evidenced historical removals; do not repeat)
- Candidate84 relabel-only “資料品質” script and Candidate105 no-reader marker are documented as previously removed; do not resurrect.
- Duplicate Song Select keyboard handler was previously isolated and removed; do not add a second owner.
- Candidate277 no longer contains literal runtime refs to #quicktools, bulkPracticeAction, bulkCustomList, applyBulkPracticeAction; “quicktools” occurs only in historical build comments. Static text absence alone is not full dynamic reachability proof.

## Defer / evidence needed
1. Complete AST/call graph: script block → DOM/template → caller/action → event/observer/timer → storage keys → tests.
2. Dynamic DOM IDs, aria/labels, template/clone/fallback simultaneous existence.
3. CSS computed styles and fixed reference screenshot; never delete based on repeated selector count alone.
4. Storage reader/writer/backup/import/export graph; AMQ and EMQ keys remain separate until lossless migration/rollback exists.
5. Observer/timer owner, target and disconnect/clear path.
6. Live AniList/MAL/VNDB, cover CDN, audio, multiplayer, IndexedDB Blob restore, pixel comparison.
7. Candidate277 formal build source and remote HTML hash.
8. Candidate212 original bytes unavailable; Candidate277 remains audit snapshot, not formal baseline.

## Tests
- PASS: hash/size; HTML root tags; 272 initial DOM IDs unique; 67/67 JS syntax; 109 CSS blocks and 3,628 parsed rules, zero stylesheet/declaration parse errors.
- PASS (static inventory only): CSS hotspot and event/observer/timer/API mentions indexed.
- NOT RUN: complete AST graph, real DOM lifecycle, durable reload, live APIs/audio/multiplayer, pixel diff.
- BLOCKED: native browser navigation/reload by recorded managed Chromium URLBlocklist.
- No source deletions or code changes in this stage.
