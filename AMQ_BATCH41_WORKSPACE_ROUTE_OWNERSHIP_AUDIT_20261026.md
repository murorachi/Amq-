# AMQ Batch 41 — Workspace / route ownership consolidation audit

Date: 2026-10-26
Input: Candidate337, SHA-256 `901322cb3af2d44f40bdeb9e23fdeb3048003d6d760d3e757bf2d93394d1a39e`.
No application source changes were made in this audit.

## Findings
- Candidate15 owns legacy `#wsActions [data-ws-action]` delegation; its source comment says Candidate82 capture handling consumes actions it owns.
- Candidate70 creates Song Select back button, Escape behavior, ranking placeholder and scene-background shortcut. These are live behaviors and are not safe deletion candidates based on hidden dock CSS alone.
- Candidate76 owns Song Select sidebar close-button setup, ARIA wiring, geometry and route/resize synchronization.
- Candidate77 owns capture-phase `#amqWorkspaceDock [data-ws]` click behavior, dock reparent/reset, and navigation-related panel closing. Its responsibility differs from Candidate76 despite shared DOM state.
- Candidate82 owns `#amqWorkspaceContentPanel` and exposes `window.__amqWorkspaceContentOpen/Close`; Candidate193 calls this API.
- Candidate99 creates `#c99LeftRail`, `#c99Back`, `#c99Home`, `#c99PlayerProgress` and related controls.
- Candidate60 wraps `window.__aniNavigateApp` for standalone-route state and `[data-home-action]` handling.
- Candidate193 adds a distinct outer wrapper for Song Select route interception and VNDB list opening. The wrappers have different side effects and must be merged, not blindly deleted.

## Decision ledger
| Module | Decision | Evidence |
|---|---|---|
| Candidate70 | KEEP for now | Live back/Escape/placeholder/background behaviors. |
| Candidate76 | INTEGRATE later | Sidebar close, ARIA, geometry and route/resize sync. |
| Candidate77 | INTEGRATE later | Dock click capture and navigation behavior. |
| Candidate82 | KEEP / panel owner | Content panel API has active callers. |
| Candidate99 | KEEP / rail owner | Creates main Song Select navigation/player controls. |
| Candidate60 + Candidate193 | INTEGRATE, not blind delete | Distinct standalone-route, VNDB and Song Select interception side effects. |

## Verification
- Static source extraction and ownership comparison: PASS.
- Application source changed: NO; new HTML candidate: NO.
- Browser behavior tests: NOT RUN (prior browser navigation was blocked by `net::ERR_BLOCKED_BY_ADMINISTRATOR`).
- Full-app route/dock/panel/storage/media/multiplayer regression: NOT RUN.
- GitHub upload/read-back for this report: pending at report creation.

## Next implementation batch
Build one navigation dispatcher that owns `window.__aniNavigateApp` once, preserving in order: Song Select panel interception, VNDB list opening, base navigation, and standalone-route/body-class side effects. Before replacement, enumerate current call sites and validate route mappings in a static harness. Then unify Candidate76/77 sidebar writes behind one panel-state API. Do not remove Candidate70 live behaviors as part of this change.
