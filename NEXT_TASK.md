# Next task

Current checkpoint: **V82.85.13 EMQ selection contract, awaiting CI**.
Branch: `v82.85.13-emq-selection-contract-01`.
Parent: `0d1ec323bb927c03538f20672b8f17cce8b2fa6c`.
Product lock: V82.82 standalone HTML, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

Acceptance: new selection contract passes 8/8; existing unit and browser acceptance suites pass; deterministic build reproduces V82.82 byte-identically; final branch HEAD matches successful GitHub Actions run.

Next after acceptance: audit a small existing pure helper outside the EMQ persistence/selection cluster. Keep quiz/multiplayer lifecycle extraction deferred until a safe boundary and regression contract are established. CSS remains separate.

Rollback: return to `v82.85.12-emq-list-normalization-01` at `0d1ec323bb927c03538f20672b8f17cce8b2fa6c`.
