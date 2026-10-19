# AMQ Learning Tool — Independent New Architecture

This directory is a separate implementation track. It must not import, execute, patch, or depend on the existing AMQ application. Integration remains out of scope until the legacy codebase is re-evaluated and both projects pass separate acceptance gates.

Checkpoint: `NEW_ARCH_V0.1.0_FOUNDATION_01`.

The local checkpoint package contains modular source, a deterministic standalone-HTML builder, tests, and the generated HTML. **The source package and HTML have not yet been uploaded to this branch** because the available GitHub connection can write text files but does not expose a local-file/binary transfer path. Do not treat this documentation overlay as a reproducible release.

Local commands: `python tools/build.py`; `node --test tests/*.test.cjs`.