# Baseline lock and current engineering checkpoint

## V82.86.04
- Branch: `v82.86.04-critical-cross-fragment-ownership-01`.
- Parent: `v82.86.03-quiz-lifecycle-ownership-01`, commit `55f290ebdeefcbb0fc1b21abc64ccddc0e8e372b`.
- Audit report: `reports/V82_86_04_CRITICAL_CROSS_FRAGMENT_OWNERSHIP_01.md`.
- Contract: `tests/unit/critical_cross_fragment_dependency_contract.py`.
- Scope is engineering-only: no product JS/CSS, source fragment, manifest or generated HTML changes.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- CI acceptance: pending; record only verified runs.

## Findings and constraints
1. Quiz answer settlement consumes classic-script globals from script_001; script_004's state bridge is a boundary, not complete decoupling.
2. AMQ custom lists use an explicit adapter into the quiz pool and must fail closed on invalid scope.
3. EMQ list membership keeps work IDs, VNDB IDs and song IDs distinct before wrapping combinePool.
4. Storage repository adapter and direct localStorage list paths coexist; do not infer that all keys migrated.
5. Shared global mediaFiles replacement and listenSong behavior still require real-provider timing acceptance.
6. Static dependency counts are not defect counts. Do not move code until contracts and lifecycle behavior justify it.
