# CURRENT_STATUS.md: Candidate 108

## Artifact
- `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_108.html`
- Size: 9,218,491 bytes
- SHA-256: `5252758b935b01e528fef28ea58523666520bac2bcb41f8de512c93b1e9d5a26`
- Parent: Candidate 107

## Changes
1. Moved song browser from x≈1014 to x≈651.
2. Collapsed search and filters into one top row.
3. Aligned first song row at y=94.
4. Preserved player dock at y=822, height 106; list bottom y=820.
5. Set row height to 64 px; hover movement remains -7 px.

## Tests
- JavaScript syntax: PASS, 60 inline script blocks, 0 syntax errors.
- CSS parse: PASS, 87 style blocks, 2535 qualified rules, 0 parse errors.
- Song Select route and 8 rail entries: PASS.
- Custom-list picker and list-ID wiring: PASS with in-memory localStorage shim.
- Source switching changes future extraction mode without changing current title: PASS.
- Bottom dock/list geometry and hover behavior: PASS.
- No uncaught browser errors in focused run: PASS.
- Full-frame pixel comparison: Candidate 104 SSIM 0.30112; Candidate 108 SSIM 0.30682. MAE/RMSE increased, so the raw score is mixed and is not a pure styling metric.
- Durable storage across reload: BLOCKED by sandbox policy.
- Audible remote playback: NOT RUN / NOT VERIFIED due unavailable external media networking.
- Hover/selected-state pixel parity: NOT RUN.