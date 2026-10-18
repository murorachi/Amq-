# V82.82 GitHub overlay publication status

- Branch: v82.82-emq-invalid-scope-ui-acceptance-01
- Parent: v82.81-modularization-boundary-and-lifecycle-01
- Product HTML SHA-256: 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b
- Engineering package SHA-256: 7b9e77ca8802846c624ad78b7827499a4e6d4a206a23f286206ecdfa4e4b6cb0
- Patch artifact: patches/V82_82_script_040_invalid_scope_key.patch

Publication is partial. This branch is still an overlay, not a complete reproducible source tree. The GitHub connector can commit text files but cannot upload the local ZIP/binary tree directly; the complete manifest, source fragments, template, modules, all tests, and visual screenshot assets have not been synchronized as a coherent tree. The remote clean-checkout build and full SHA-256 readback have not been run.

The previous remote/local blob mismatch for tools/modularization_boundary_audit.py remains unresolved. It must not be described as fixed until the exact local file bytes are published and the remote blob SHA-1 matches.

Native-origin localStorage/IndexedDB, backup import/restore rollback, Firefox, real audio, and two-client multiplayer remain unverified for the reasons in the V82.82 engineering report.
