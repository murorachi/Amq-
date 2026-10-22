# Next Task

1. Migrate the workspace actions into the retained right-side popup without leaving Song Select where the action is intended to be in-place. Use `engineering/CANDIDATE80_WORKSPACE_ACTION_AUDIT.md` as the source-of-truth classification.
2. Start with one domain at a time, reusing existing renderers/data stores rather than cloning them. Keep selection separate from apply/commit actions.
3. Preserve the current safety rule: batch apply-target actions locate and focus the existing confirmation controls but do not activate them automatically.
4. For each migrated action, test visible result, route stays Song Select when required, Escape closes only the popup, data mutations require existing confirmation, and the dock bounding box remains stable after interaction.
5. Obtain normal-origin browser verification for storage persistence, audio, and cover loading; current page.set_content tests cannot validate these.
6. Refine mobile behavior after functional migration: at 390x844 the popup is viewport-constrained but overlays the frame controls while open.
7. Keep Candidate 76 immutable as rollback checkpoint. Do not remove legacy views until all migrated actions pass regression.
