# Candidate 54 Test Report

- Artifact: amq_learning_tool_v82_85_30_workspace_proto26_song_select_54-songselect-root-cause-fix.html
- SHA-256: 181dbc556e85660cb806996943e16d3d8ac1b1a8550916cd80d60ec5a81b8b9f
- Size: 9,010,777 bytes
- Parent Candidate 53 SHA-256: 12659ee82e8c99689ddd0e988e8fb4546a82d0a5d9d310460329eff3c2165f5c

## Changes
- Consolidated Song Select viewport geometry after earlier conflicting CSS blocks.
- Made selected-song metadata a compact transparent top-left overlay.
- Hid legacy workspace sidebar inside and outside Song Select stage.
- Removed automatic selected-work cover replacement of the center scene background.
- Kept the scene image layer enabled for the existing scene background feature.
- Enlarged catalog rows to 70px, covers to 54px, titles to 13px.

## Tests
- PASS: Node syntax checks on 43 executable inline JavaScript blocks; zero failures.
- PASS: 8 targeted static assertions.
- BLOCKED: Playwright Chromium navigation to both file:// and localhost returned ERR_BLOCKED_BY_ADMINISTRATOR before DOMContentLoaded.
- NOT RUN: browser interaction, responsive checks, custom-background interaction, screenshot overlay/pixel comparison.
- Visual acceptance: NOT ACCEPTED.

## GitHub status
- Isolated branch created: amq-candidate54-songselect-root-cause.
- This report and engineering state are being recorded separately.
- Candidate HTML upload and remote SHA verification are not completed; no verified local-artifact upload route was available in this execution.

## Rollback
Candidate 53 SHA-256: 12659ee82e8c99689ddd0e988e8fb4546a82d0a5d9d310460329eff3c2165f5c.
