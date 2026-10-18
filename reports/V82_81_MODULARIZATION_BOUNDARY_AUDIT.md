# V82.81 Modularization Boundary Audit

Generated from the current source tree; static evidence only. No CSS rule order was changed.

## Scope and counts

- Source modules: 8.
- Script/data fragments: 41.
- CSS fragments: 50.
- Fragments with direct storage references: 23 / 41.
- Fragments with AMQ/EMQ boundary references: 23.
- History/SRS candidate fragments: 14.
- Selector records generated: 2355.

## 1. GitHub full-source publication

Status: OPEN. Current remote branch is an overlay, not a complete reproducible source tree. The required completion proof is the full manifest/source/tests/tools tree present remotely, a fresh checkout build, and readback SHA-256 verification. The available GitHub connector can create/update text files and Git objects, but does not expose a direct local-archive upload operation; this audit does not claim the ZIP or full tree was published.

## 2. getQuizPool pure calculation boundary

- `calculateQuizPoolCandidatesV8280(ctx)` now owns candidate calculation and returns `{pool, diagnostic}` without DOM, `window`, or storage access.
- `getQuizPool()` is a thin adapter that gathers the current IIFE state, invokes the calculator, and writes the status message.
- Differential contract compares V82.79 original behavior to V82.80 across candidate ordering, focus scope, filters, malformed settings, duplicate IDs and empty-pool diagnostics.

## 3. History/SRS/storage boundary

- Direct storage references are inventoried per script and literal key.
- History/SRS candidate functions and keys are inventoried separately.
- Real-origin localStorage/IndexedDB persistence is still blocked in this environment; no history/SRS storage refactor is made without that acceptance.

## 4. Custom playlists and AMQ/EMQ

- AMQ/EMQ source references, API terms and scope-setting references are inventoried per fragment.
- Existing EMQ API, solo list handoff, history isolation and backup/restore contracts remain the semantic safety net.
- The high-coupling list membership, metadata, source-mode and multiplayer paths remain unextracted pending a source-ID contract and real service acceptance.

## 5. CSS semantic mapping

- Selector inventory maps selectors to tentative view/component groups using explicit prefixes.
- Mapping is heuristic, selectors can span views, and cascade order remains behaviorally significant. No rules were reordered or deduplicated.
- V82.81 adds a Chromium screenshot/geometry baseline for home and quiz; it is not cross-browser pixel equality. The selector map remains heuristic and manual review is still required before moving CSS.

## Files generated

- `reports/STORAGE_ACCESS_BOUNDARY_V82_81.csv`
- `reports/HISTORY_SRS_BOUNDARY_V82_81.csv`
- `reports/AMQ_EMQ_SOURCE_BOUNDARY_V82_81.csv`
- `reports/CSS_SELECTOR_COMPONENT_MAP_V82_81.csv`
