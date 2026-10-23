# NEXT TASK — Continue Candidate 190 Root-cause Integration

1. Preserve Candidate 178 as recovery baseline and all candidate files unchanged.
2. Candidate 190 fixes two import actions that bypassed the shared workspace: AniList/MAL opens the existing modal in place; VNDB opens its existing view via the shared content panel. These are targeted changes, not overall acceptance.
3. Next inspect and fix remaining legacy route calls from workspace actions, especially learning actions that still invoke `practice`, and ensure the shared panel restores moved DOM nodes and focus safely on close/back/Escape.
4. Decide the four useful workspace destinations from existing functionality. Do not restore the removed batch organizer or leave misleading dead controls; do not invent placeholder panels.
5. Test opening, switching, closing, Escape, focus restoration, backdrop/back, repeated switching, and ensure Song Select stays active with no duplicated nodes/listeners.
6. Verify custom-list CRUD and reload persistence, AniList/MAL/VNDB import/error paths, cover recovery, player geometry and real playback, Enter selection, and reference screenshot geometry.
7. Browser environment currently blocks native local-file navigation; use an approved browser context if available. Opaque-origin `page.set_content` localStorage errors are BLOCKED, not PASS.
8. Update the validation report and handoff docs after each meaningful verified change. Upload the final HTML and confirm remote path, version, byte size, and SHA-256 before calling delivery complete.
