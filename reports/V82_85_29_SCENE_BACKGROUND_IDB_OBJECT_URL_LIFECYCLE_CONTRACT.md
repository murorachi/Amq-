# Scene-background IndexedDB and object-URL lifecycle contract — V82.85.29

## Scope

- Production file: `src/scripts/script_036.htmlpart`.
- Test: `tests/unit/scene_background_idb_object_url_lifecycle_contract.test.cjs`.
- Workflow step: `Test scene-background IndexedDB and object-URL lifecycle`.
- Production code is unchanged.

## Exact-source scenarios

1. Reject IndexedDB transaction requests when the database is not initialized.
2. Resolve transaction work only on transaction completion and return the underlying request result.
3. Reject transaction error and abort events.
4. Reject synchronous exceptions thrown by the transaction callback.
5. Reject database open when IndexedDB is unavailable.
6. Create the object store during upgrade and resolve the opened database.
7. Revoke an old scene URL before creating/replacing its URL.
8. Reject a non-Blob payload and remove the stale URL mapping.
9. Make URL revocation idempotent when a mapping is absent or already removed.
10. Revoke and clear temporary preview URL/blob/name/file-input state.

The test extracts the named production functions and supplies deterministic fake transaction objects and synthetic Blob URLs. It does not contact a real browser database or modify user files.

## Acceptance status

- Static review: test targets the current production function bodies and isolates storage/URL side effects.
- Automated execution: pending CI at report creation. Update with actual assertion count and run ID only after the focused test and source/unit job complete.
- Not covered: real-browser quota/security behavior, browser shutdown during an active transaction, image decode limits in a real browser, visual rendering, or actual IndexedDB persistence across browser restarts.

## Rollback

Remove the new test and workflow step, then revert this report/status reference. No production source or immutable baseline rollback is needed.
