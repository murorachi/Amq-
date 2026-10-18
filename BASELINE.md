# Baseline lock and current engineering checkpoint

## V82.86.03
- Branch: `v82.86.03-quiz-lifecycle-ownership-01`.
- Parent engineering backlog commit: `5ed5249c7f6f3865a2ab518c87a55d8ffb4ff793`.
- Audit report: `reports/V82_86_03_QUIZ_LIFECYCLE_OWNERSHIP_01.md`.
- Unit contract: `tests/unit/quiz_lifecycle_ownership_contract.test.cjs`.
- Browser test: `tests/browser/quiz_answer_playback_lifecycle.py`.
- Verified run: `39155616680`, both CI jobs PASS.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- Engineering-only; no product JS/CSS, manifest or generated HTML changes.
- Backlog statuses reconciled: TODO-001/002/004 Done; TODO-003 In Progress due incomplete dynamic listener/heap audit.

## Scope rules
1. Shared state evidence is not automatically a confirmed defect.
2. Do not merge distinct audio listeners merely because both observe `playing`.
3. Do not claim listener-leak absence without heap/listener lifecycle evidence.
4. Keep real provider, Firefox, native storage and live multiplayer gates separate.
