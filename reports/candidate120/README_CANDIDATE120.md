# AMQ 學習工具 Candidate 120

- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_120.html`
- Size: 9,235,686 bytes
- SHA-256: `2b5f874693998f9748ddd579737563a78a22c3c7db0d089547cfc891fb6248a2`
- Parent Candidate 119 SHA-256: `eff6a381c00c33442ff2392f99feab1b1966872476b7748a162465a3e75e093e`
- Accepted rollback before this work: Candidate 118, SHA-256 `bb1536744bea764ecf9cb010a6cb1f23fcea2ab69f809193125c695ba9404163`

## Changes
- VNDB rail destination calls the existing VNDB list API instead of clicking a possibly hidden duplicate control.
- Learning Plan rail destination calls the existing `learningPlan` route directly.
- Custom-list rail destination opens the existing `watchlist` route and activates the existing custom-list tab.

## Test status
- Stage 2 route regression: 17 PASS / 0 FAIL.
- Workspace/custom-list operations: 12 PASS / 0 FAIL in a Playwright page using an in-memory storage shim.
- Static checks: 5 PASS / 0 FAIL; 62 inline JS scripts parse, 90 CSS blocks / 2,569 qualified rules parse.
- ZIP integrity: PASS.

Important: durable persistence after a real browser reload is BLOCKED. Managed Chromium rejects `file://` and localhost navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`; storage checks used an in-memory shim. This is not a persistence PASS. Live AniList/MAL/VNDB import requests and real audio playback were not run.

Stage 3 osu!stable geometry comparison has NOT started because pre-Stage-3 validation remains incomplete.
Import validation note: the isolated blank-input Playwright attempt timed out (180 seconds, driver EPIPE); it produced no accepted PASS results. Audio playback is user-confirmed working, not independently tested in this environment.
