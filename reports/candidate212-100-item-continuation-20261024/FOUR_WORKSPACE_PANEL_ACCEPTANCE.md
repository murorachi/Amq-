# Candidate212 Four-workspace Panel Lifecycle Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: readable reconstructed Candidate212 with in-memory storage. No HTML source modified.

## Executed test
Directly invoked the existing `__amqWorkspaceContentOpen()` adapter for each of these keys: `custom-list`, `learning-center`, `quiz`, and `multiplayer`. For each target, asserted that the existing node moved into the single `#amqWorkspaceContentBody`, the Song Select route remained active, the shared panel opened, and closing restored the node's original parent and hidden/class state.

## Results
- PASS: all four target panels mount using existing DOM nodes.
- PASS: one shared workspace panel remains; no duplicate panel is created.
- PASS: Song Select route remains active while panels are open and after close.
- PASS: close restores the target node to its original parent and restores hidden/class state.
- PASS: zero uncaught page errors.

## Important navigation gap
This test invokes the internal adapter directly. It does **not** prove users can reach all four panels through visible navigation. Static markup still has only `data-ws="lists"` and `data-ws="learning"` dock buttons plus a separate quiz action; no visible multiplayer dock/action entry was found. The workspace definition includes a multiplayer action, but its route is not exposed by the current dock markup. This is a separate P0 navigation defect; do not mark four-workspace user-flow acceptance complete until the visible entry and return/back path are implemented and tested.

## Scope limits
Native file/localhost navigation, persistent storage reload, actual audio output, live multiplayer room creation/join/leave/reconnect, and observer/timer teardown counts were not tested. Source is not byte-identical to recorded Candidate212, so no source change was made.