# Testing — continuous audit checkpoint

## PASS
- Playwright: 26 assertions, 0 failures across 1648×928, 1440×900 and 1280×720.
- Song rows: 7.5 visible rows, no document overflow; at 1648×928 first eight row tops differ from targets by at most 2 px.
- Interaction checks: selection, ArrowUp/ArrowDown, hover movement, search fallback, EMQ-only filtering, workspace panel, profile move/restore, real AMQ stats and filter visibility.
- Static JavaScript: 61 inline blocks checked, 0 syntax errors; 5 data blocks skipped.
- CSS: 2,648 qualified rules parsed, 0 parse errors.
- Scene manager: empty-store initialization and synthetic image input/preview status passed; no uncaught page errors.

## BLOCKED
- Direct file:// and localhost navigation: BLOCKED_BY_ADMINISTRATOR.
- Scene image blob rendering and durable IndexedDB apply/export/clear/restore: BLOCKED by opaque origin (blob:null/) and unavailable intended runtime.

## NOT RUN
- Real audio playback and live API requests.
- Durable storage across reload/browser restart.
- Full custom-list create/add/remove/filter/persistence regression.
- Full four-workspace routing and cross-workspace regression.
- Full acceptance of direct double-click single-file HTML.

## Interpretation
The Playwright harness uses page.set_content and a test-only in-memory Storage shim. Passing its assertions is not intended-runtime acceptance. Candidate 161 is not accepted.
