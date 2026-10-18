# Baseline lock and current engineering checkpoint

## V82.86.03
- Parent branch: `v82.86.02-engineering-backlog-01`.
- Parent commit: `5ed5249c7f6f3865a2ab518c87a55d8ffb4ff793`.
- Current branch: `v82.86.03-quiz-lifecycle-ownership-01`.
- Report: `reports/V82_86_03_QUIZ_LIFECYCLE_OWNERSHIP_01.md`.
- Unit contract: `tests/unit/quiz_lifecycle_ownership_contract.test.cjs`.
- Browser test: `tests/browser/quiz_answer_playback_lifecycle.py`.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- Engineering-only; no product JS/CSS, manifest or generated HTML changes.
- CI pending; do not mark new tests PASS before completion.

## Scope rules
1. Shared state evidence is not automatically a confirmed defect.
2. Do not merge distinct audio listeners merely because both observe `playing`.
3. Do not claim listener-leak absence without heap/listener lifecycle evidence.
4. Keep real provider, Firefox, native storage and live multiplayer gates separate.
