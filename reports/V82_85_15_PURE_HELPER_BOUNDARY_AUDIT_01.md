# V82.85.15 Pure-helper boundary audit 01

Date: 2026-10-18
Parent accepted checkpoint: V82.85.14, commit `e9b249364a79d7da896ff731899c879d29ddfebd`.
Branch: `v82.85.15-pure-helper-boundary-audit-01`.
Scope: audit only. No production source, manifest, build output, CSS, or product HTML changed.

## Audit performed

Inspected the current source fragments for navigation/watchlist (`src/scripts/script_002.htmlpart`), ANN cover loading/dashboard (`src/scripts/script_003.htmlpart`), and EMQ custom lists (`src/scripts/script_040.htmlpart`), alongside the existing module inventory.

### Candidates and disposition

| Candidate | Observed dependencies | Decision |
|---|---|---|
| EMQ `loadDb()` / `saveDb()` | localStorage, mutable `db`, timestamps, rendering and selector refresh | Reject: persistence/UI side effects; not pure. |
| EMQ `getSelectedIds()` | DOM picker or localStorage, mutable `db.lists`, deduplication | Reject: source precedence and mutable-state contract; already covered by the EMQ selection contract. |
| EMQ `addMembers()` / `removeMembers()` | live EMQ API, mutable membership, persistence, timestamps | Reject: domain mapping and writes are inseparable without a broader API contract. |
| EMQ `buildAllWorkIndexV8254()` | live API readiness, row/meta/alias lookups and module cache | Reject: cache and external API lifecycle make this a higher-risk boundary. |
| Dashboard local `metric()` / `row()` helpers in `renderDashboardV10()` | arguments plus locale formatting and HTML template strings | Potential future extraction, but dashboard-specific and low value; do not split solely to increase module count. |
| ANN cover queue and retry logic | network fetch, timers, queue mutation, cache, DOM connectivity and image state | Reject: asynchronous lifecycle boundary, not a pure helper. |

## Decision

No production extraction was made. The only apparently pure candidate found in this bounded review is the dashboard's two local HTML-formatting helpers, whose extraction would provide little architectural value and introduce extra source/build/test surface. Per project policy, do not force a module boundary just to produce a checkpoint.

## Validation and limits

- Static source review: completed for the three listed fragments and existing module inventory.
- Unit tests: not run; no source or test code changed.
- Deterministic build / product fingerprint: not run in this audit-only checkpoint.
- Browser acceptance: not run.
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 remains unchanged.
- No claim is made that native storage, Firefox, real audio, or multiplayer acceptance has passed.

## Next task

Review the remaining non-lifecycle pure helpers identified by the AST/dependency inventory and select one only if it has meaningful reuse or a non-trivial behavior contract. Otherwise prioritize making the full source/build/test tree and its clean-checkout build reproducible, rather than accumulating trivial modules.
