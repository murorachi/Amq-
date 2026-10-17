# Baseline lock

- Candidate: V82.65 `amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Bytes: 8786930
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- Verified this run: local baseline bytes and exact SHA-256; build output remains byte-identical.
- Not verified this run: the full V82.65 delivery ZIP bytes (`124658780`, expected SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`), ZIP CRC and internal manifest, because the official delivery archive is not present in the available workspace.
- `/mnt/data/AMQ_V82_65_AUDIT_01.zip` was inspected and contains an audit bundle (standalone baseline HTML plus inventories and reports), not the official full delivery archive. It must not be substituted for the missing delivery ZIP.
- No fallback to V82.64 or another historical product HTML was used.
