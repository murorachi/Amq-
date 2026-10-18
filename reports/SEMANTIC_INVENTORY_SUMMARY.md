# Static semantic inventory summary

Generated from the byte-preserved script fragments and extracted source modules in the current checkpoint. Regex-based inventory only; not a complete JavaScript AST or call graph.

- Script/data fragments and source modules scanned: 44
- Named function/arrow-style declarations recorded: 817
- Names with more than one detected definition: 31
- Explicit window property assignments: 89
- DOM ID references: 391

## Interpretation rules
- Duplicate function names are leads for review, not proof of redundant behavior; later assignments may intentionally override earlier functions.
- Listener and timer counts are syntactic occurrence counts, not proof that duplicate listeners or leaked timers exist.
- Storage keys are literal matches only; dynamic/template keys and indirect repository access require manual tracing.
- DOM references are reads/selectors; this inventory does not fully identify all writers or dynamic IDs.
- Embedded JSON and compressed/base64 payloads are retained and are not treated as executable logic.
