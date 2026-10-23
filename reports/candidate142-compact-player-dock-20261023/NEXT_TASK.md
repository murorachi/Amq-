# Next task — visual reconstruction, not accepted release

1. Preserve Candidate 141 and Candidate 142 unchanged.
2. Use `VISUAL_AUDIT.md` as the region-level gap list. Largest blockers: missing real scene artwork, left-rail content mismatch, top metadata hierarchy and bottom-control composition.
3. Test the scene-background manager with a real user-stored image and the no-image fallback. Do not fabricate cover art or use the reference screenshot as app artwork.
4. Inspect actual child bounding boxes in the bottom dock and change only controls with measured mismatches. Keep the 7.5-row geometry and 76px dock unless evidence justifies changing them.
5. Preserve entry points for AniList/MAL, VNDB, custom-list management and learning tools. Compacting must not silently remove features or make them unreachable.
6. Required acceptance remains: direct-file load, durable persistence, real audio, full custom-list CRUD, cross-workspace regression, and region-level screenshot improvement. Current browser environment cannot verify all intended-runtime conditions; label them BLOCKED/NOT RUN until actually tested.
