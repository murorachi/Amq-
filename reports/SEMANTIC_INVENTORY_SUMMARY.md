# Static semantic inventory summary

Generated from byte-preserved fragments and source modules. Regex-based inventory only; not a full JavaScript AST or call graph.

- Script/data fragments and source modules scanned: 43
- Named function/arrow-style declarations recorded: 817
- Names with more than one detected definition: 31
- Explicit window property assignments: 89
- DOM ID references: 391

Duplicate names are review leads, not proof of redundancy. Listener/timer counts do not establish leaks. Literal storage-key matching misses dynamic keys. DOM references do not fully identify writers. Embedded JSON/compressed payloads are preserved and are not treated as executable logic.
