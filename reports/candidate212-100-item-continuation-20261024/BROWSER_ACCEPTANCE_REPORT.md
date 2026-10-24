# Candidate212 Browser Interaction Acceptance Report

Date: 2026-10-24
Browser: system Chromium via Playwright, headless, viewport 1920×1080
Target: Candidate212 readable Library text export reconstructed as `/mnt/data/amq_work/candidate212_reconstructed.html` (9,352,606 bytes)

## Critical test limitation

Native navigation to both `file:///mnt/data/.../candidate212_reconstructed.html` and `http://127.0.0.1:8765/...` was blocked by browser policy with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. To continue runtime checks, the HTML was injected with Playwright `page.set_content()`. An in-memory mock for `localStorage` and `sessionStorage` was inserted before the application's scripts; external HTTPS requests were aborted. This permits real Chromium DOM/event execution but is **not** a native single-file launch, a real persistent-origin test, or an external API test. The source text export is 26 bytes shorter than the recorded baseline and is not byte-identical to Candidate212.

## Executed results

| Test | Result | Evidence / assertion |
|---|---|---|
| Chromium page initialization | PASS | `document.readyState=complete`, title `AMQ學習工具`, `__aniNavigateApp` exists, core catalog/quiz/watchlist roots exist |
| Initial/dynamic DOM IDs | PASS | 631 live ID attributes after startup; zero duplicate ID values in the live DOM |
| Watch/custom-list tab clicks | PASS | Document capture listener observed exactly one click per click: count 1 after custom tab and 2 after watch tab |
| Workspace panel open/close lifecycle | PASS | 5 UI entry points (import, batch, lists, learning, dashboard) × 2 rounds = 10 successful open/close transitions |
| Workspace panel uniqueness | PASS | `#amqWorkspaceContentPanel` remained exactly one instance through repeated switches |
| Panel teardown | PASS | After each close, panel became hidden, `amq-ws-content-open` cleared, and `amq-batch-mode` cleared |
| Custom list creation | PASS | UI prompt created `AMQ Smoke List` with a generated unique ID and stored its record under `aniCustomPracticeListsV1` in the isolated mock store |
| Custom list membership add/remove | PASS | `__aniCustomListMembershipV1.toggle()` added a catalog work ID, `has()` returned true, then removal succeeded and `has()` returned false |
| Custom list deletion | PASS | UI delete action confirmed; list array became empty and the stored payload became `{"version":1,"lists":[]}` |
| Batch selection | PASS | `選取目前載入歌曲` selected 180 loaded song rows |
| Batch familiarity update | PASS | `批次標記聽過` wrote updated app data to isolated `aniCollection_v2` storage; no page errors |
| Runtime page errors in workspace lifecycle / custom-list probe | PASS | Zero uncaught page errors in those isolated test runs |
| Native `file://` launch | BLOCKED | `ERR_BLOCKED_BY_ADMINISTRATOR` |
| Native `localhost` launch | BLOCKED | `ERR_BLOCKED_BY_ADMINISTRATOR` |
| Actual localStorage/sessionStorage persistence after reload | BLOCKED | The injected page uses in-memory storage; native persistent origin could not be reached |
| Actual IndexedDB persistence/Blob backup | NOT RUN | Not tested by this interaction suite |
| Real external API and cover recovery | BLOCKED | External HTTPS requests were deliberately aborted |
| Real AMQ/EMQ/MIX audio output and seeking | NOT RUN | No real audio acceptance was performed |

## Additional observations requiring follow-up

1. The visible `批次整理` panel is still a live module, not a dead shell. It offers batch familiarity, tags, blacklist, and custom-list membership operations. Its list-membership path uses the same `aniCustomPracticeListsV1` key as the primary custom-list system. It should be integrated into the official song/list management surface before the standalone batch entry/runtime is removed; deleting it immediately would remove live functionality.
2. The visible custom-list panel supports creation, membership changes, and deletion. Reload persistence remains unverified because native navigation/storage was blocked.
3. Directly calling the legacy `__aniNavigateApp('dashboard'|'learningPlan'|'practice')` API can leave `__aniGetActiveViewV82()` reporting `catalog` while the corresponding workspace panel is displayed. The actual workspace UI buttons correctly open and close the panel. This is a route-contract question for the shell adapter, not a confirmed user-flow failure; determine whether `catalog` is intentionally the base Song Select route while workspace content is mounted in the shell.
4. The screenshot from this test run shows the current Song Select view with the old left-side entries `清單匯入`, `批次整理`, `自訂清單管理`, `學習計畫`, and `學習統計`. These entries and their handlers need explicit keep/integrate/delete decisions under checklist items 68–70.

## Next acceptance gate

Obtain a byte-preserving source path and a browser environment that permits native `file://` or localhost navigation. Re-run these tests with real browser storage, including page reload, custom-list persistence, IndexedDB Blob restore, and audio playback. Do not promote a candidate based only on the `page.set_content()` suite.