# Next task

Current checkpoint: **V82.85.12 EMQ list normalization, accepted**.
Branch: `v82.85.12-emq-list-normalization-01`.
Final source/test commit: `ff790bc38f6662b0a0c38d8c9a9231b9aa3dc660`.
Acceptance: [GitHub Actions run 39131137249](https://github.com/murorachi/Amq-/actions/runs/39131137249), both jobs passed.

Product lock:
- V82.82 standalone HTML: 8,787,490 bytes.
- SHA-256: `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable. CSS remains separate.

Next stage:
1. Audit adjacent EMQ list helpers around persistence and selection for another existing pure boundary.
2. Avoid extracting `loadDb()`, `readEmqLists()`, or UI-coupled selectors because they combine storage/DOM effects with normalization.
3. Prefer a small helper with no storage, DOM, timer, audio, or network side effects; add exact-source contract tests before moving it.
4. Keep quiz/multiplayer lifecycle extraction deferred until a safe boundary and regression contract are established.

Rollback: return to accepted parent branch `v82.85.11-amq-list-normalization-01` at `8de8ab357f985542981e974e1c113731cf5bd537`. Product baseline remains V82.82.
