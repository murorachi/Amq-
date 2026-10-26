# Candidate346 Browser Probe — 2026-10-26

## Purpose
Attempt one materially different browser route after prior `file://` and localhost restrictions: load the HTML into a real headless Chromium page using Playwright `page.set_content`, avoiding navigation to `file://` or localhost.

## Artifact
- File: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`
- Size: 1,625,225 bytes
- SHA-256: `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`

## Results
- **PASS (limited harness):** `page.set_content` accepted the HTML; document title `AMQ學習工具`; DOM was created with 567 ID-bearing elements and 152 buttons.
- **BLOCKED:** Direct navigation to the local file still returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- **NOT RUN:** Full application interactions and end-to-end workflows. The `set_content` probe creates an opaque `about:blank` origin and is not equivalent to running the app from its supported origin.
- **FAIL (isolated probe runtime only; not classified as app regression):** Runtime logged `DB is not defined`, `anime is not defined`, `Cannot access 'tab' before initialization`, and `audioEl is not defined`. Local storage access was denied for the opaque document, and EMQ loader reported that embedded EMQ library data was not found. These failures may arise from missing script/dependency context and opaque-origin storage; they must not be interpreted as a validated production-origin regression.

## Conclusion
A different browser route was attempted and confirms DOM construction, but it does not enable valid full-app acceptance. No application HTML was changed. Candidate346 remains experimental; Candidate302 remains the formal baseline. Do not mark AMQ/EMQ/MIX or other functional regression tests PASS based on this probe.
