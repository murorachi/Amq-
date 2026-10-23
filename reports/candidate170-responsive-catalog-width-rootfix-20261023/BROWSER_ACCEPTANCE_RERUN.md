# Candidate 170 Browser Acceptance Rerun (2026-10-23)

## Candidate identity
- File: `dist/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_170_responsive_catalog_width_rootfix.html`
- SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`
- Method: Playwright + Chromium, `page.set_content` on opaque about:blank origin. This is not native file:// or HTTP-origin acceptance.

## Results
- PASS: document reaches `readyState=complete`.
- PASS: navigation reaches active Song Select/catalog route.
- PASS: 180 catalog cards/rows populate.
- PASS: EMQ mode shows 16,839 records with source counts exclusively EMQ.
- PASS: AMQ mode restores and shows 38,821 records with source counts exclusively AMQ.
- PASS: catalog bounds do not exceed document viewport width at 1280x720, 1440x900, 1648x928, 1920x1080, 2555x1438, and 900x700.
- PASS: ArrowDown changes the selected inline song (data-id 45305 -> 13404).
- PASS: zero non-storage uncaught page errors.
- PASS: HTML SHA-256 during rerun matches candidate identity above.

## Warnings and coverage limits
- LocalStorage/sessionStorage access is blocked by the opaque origin; persistence is not verified.
- External resource resolution reported `ERR_NAME_NOT_RESOLVED`; live APIs and cover loading/failure recovery are not verified.
- Native `file://` launch and real browser reload persistence are not verified.
- Real audio playback, CRUD lifecycle, and the historical 26-test suite were not run in this rerun.
- Official osu!stable reference pixel-diff remains BLOCKED: attempt to retrieve the pinned image from raw.githubusercontent.com failed due DNS/network resolution failure in this execution environment.
- Screenshot reviewed: `candidate170_1280x720_acceptance_rerun.png`; this is a visual inspection, not a pixel-diff score.

## Status
Candidate 170 remains experimental and is not promoted to accepted baseline. Candidate 169 rollback SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.
