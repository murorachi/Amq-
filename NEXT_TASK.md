# Next task

Current checkpoint: **V82.85.12 EMQ list normalization, awaiting CI**.
Branch: `v82.85.12-emq-list-normalization-01` (parent `8de8ab357f985542981e974e1c113731cf5bd537`).
Product lock: V82.82 standalone HTML, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

Acceptance criteria:
1. `tests/unit/emq_list_normalization_contract.test.cjs` passes all 14 cases.
2. Existing custom-list CRUD, AMQ validation/normalization, native-storage, backup/restore, browser acceptance and source verifier pass.
3. Builder reconstructs V82.82 byte-identically; product HTML is not regenerated as a new release.
4. Remote branch and final commit are verified against successful GitHub Actions.

Next after acceptance: audit adjacent list-helper boundaries around EMQ persistence and selection. Do not extract `loadDb()`, `readEmqLists()`, or UI-coupled selectors as pure functions. Prefer another existing pure helper with a small exact-source boundary. Keep quiz/multiplayer lifecycle deferred and CSS separate.

Rollback: return to accepted parent `v82.85.11-amq-list-normalization-01` at `8de8ab357f985542981e974e1c113731cf5bd537`; product baseline remains V82.82.

---

