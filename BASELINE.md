# Baseline checkpoint: V82.85.26 suggestion cache invalidation dedup

- Parent checkpoint: V82.85.25 multiplayer audio failure handler dedup, commit `c648e6d33fe787e4af1a3e8adc9e7504553d0bd4`.
- Current branch: `v82.85.26-suggestion-cache-invalidation-dedup-01`.
- Immutable V82.82 product remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change is limited to deleting the duplicate 95-character anime suggestion-cache invalidation loop from the display-language listener; the shared refresh function remains the single owner.
- Focused contract asserts one invalidation loop, refresh ownership, all three suggestion fields, and listener delegation. CI verification is pending after the manifest update.
- Modified fragment: 139,664 bytes / SHA-256 `c349421f2a4759677669079d5e37a212795958ec6e556b56f36cadddeb56d018`.
- Candidate V82.85.26: 8,787,009 bytes / SHA-256 `1745600f52de09983ca3b66e45341a27acbd463e233fc77719e42f4673d4abad`; the next CI run must verify this pin. V82.82 remains immutable.
- Rollback: restore the listener's invalidation loop and revert this stage's contract, workflow, package and manifest updates.
