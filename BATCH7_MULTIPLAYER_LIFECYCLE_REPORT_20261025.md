# Batch 7 — Multiplayer lifecycle and script-load topology

Date: 2026-10-25

## Baseline and protection
- Candidate302: 1,720,249 bytes; SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd.
- Application HTML/source modified: NO. Deletions: 0.
- No real credentials, production storage, or real server were used.

## Multiplayer fake-server tests
The actual extracted v82-34-multiplayer-ui script was evaluated in Chromium against Candidate302 static markup/CSS, with isolated synthetic storage, fake HTTP responses, and a fake WebSocket.

- Initialization: PASS in classic and team scenarios.
- Restoring a synthetic session and starting HTTP room polling: PASS; multiple room GETs were observed before navigating away.
- Navigate away: PASS; no additional room GET occurred during the post-navigation observation window. The real ani-app-navigation listener called stopPoll().
- Team WebSocket: PASS; one fake socket opened and sent the expected auth message; route-away changed it to CLOSED and disabled live mode.
- Local release: PASS; releaseLocal(false) cleared the synthetic session and live state.
- Browser page errors: 0 in both scenarios.

## Heartbeat finding
A heartbeat POST was observed after navigation away. Current heartbeat() exits only when there is no session, a heartbeat is already in progress, or the document is hidden. Navigation away stops room polling and live WebSocket but preserves the room session. This is not classified as a bug without deciding whether background room presence should continue.

## Script-load topology
- Candidate302 contains 70 inline script tags.
- No duplicate script IDs were found.
- No duplicate non-empty inline-script source hashes were found; the only identical source-hash group consists of two empty script tags.
- Each of the eight Batch 6 manual-reinjection candidates appears exactly once in formal HTML.
- Repeated registration was demonstrated only under manual re-evaluation, not via duplicate static script tags. Static markup cannot rule out runtime eval/reinjection, so the eight items remain NEEDS_CONFIRMATION, not DELETE.

## Test status
- Isolated fake-server Chromium tests: PASS for stated assertions.
- Full application E2E with matching AMQ/EMQ data assets: NOT RUN (assets unavailable in work directory).
- Candidate302 remote HTML upload/hash verification: BLOCKED/NOT_FOUND.
- Real network multiplayer and real user-data persistence: NOT RUN.

## Decision and next step
No application code modified or deleted. Keep heartbeat behavior as an explicit design question, not an unverified defect. Next highest-value work: trace script injection/eval/load paths and determine whether page-level heartbeat should persist while a retained room session is off-view.
