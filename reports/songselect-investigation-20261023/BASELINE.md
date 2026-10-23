# BASELINE — Song Select investigation checkpoint (2026-10-23)

- Verified local baseline: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_130.html`
- Size: 9,237,889 bytes
- SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`
- Immutable rollback: Candidate 130. Do not overwrite.
- Reference: `image.png`, 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.

## Missing/conflicting artifacts
- Candidate 125: recorded SHA `6dfe4ddc2b48e3a1c5ee7c12ae42f371877d1b30aae6abf99f68caebf3221145`; binary absent locally and from branch tree.
- Candidate 126: recorded SHA `15e8644ec1ea079b6784fdeb8ac399aeecfc57ba00bd2b13b4d8b9b0a6a286a4`; binary absent locally and from branch tree. Library raw-byte materialization was blocked.
- Candidate 131: remote report SHA `f5e475819810a9b71101e3e70ab073815f12b5dd1e073ecf81631451ced897d3`; local same-name file SHA `375a412243517ceb9e14bcf4ec830db838e646b66cba323d808f7d7a66a99a55`. Different artifacts.
- Candidate 132: report SHA `1de08a187020d1818a9f752ba565a04deea576d8bb6d59673af002df9bbd6cce`; Candidate 134 report cites a different parent SHA `558076127bf072b992543c32224e1890c331c7ba3116d58d153757349aa739f1`.
- Candidate 134 is explicitly rejected for catalog duplication/lifecycle regression.
- Candidate 135 report claims SHA `9e2a86313613da2e8a4b23bb66e42d4616a82637447175791eb05aae7bf94ee7`, but the HTML binary is absent locally and from the branch tree; parent Candidate 134 hash also conflicts with its experiment report.

Decision: Candidate 130 is the only verified local HTML baseline. No missing candidate identity is reused.