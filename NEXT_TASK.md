# NEXT_TASK.md

## Highest-value next work
1. Fix the confirmed VNDB routing collision at source: the Candidate210 click handler and `apply()` currently rewrite `data-c99-action="vndb"` to `song-batch`. Inspect the actual rail markup and shared import handler ordering, then preserve VNDB import routing without resurrecting a duplicate batch entry.
2. Define the replacement for song batch operations inside the formal list-management workspace. Preserve bulk familiarity, tag, blacklist and custom-list add/remove behavior; do not simply delete these capabilities.
3. Decide and test selection lifetime: clear selection on incompatible catalog/mode changes or scope selected IDs by source/catalog. Confirm AMQ/EMQ ID collisions before implementing.
4. Test the song-list MutationObserver lifecycle when route changes or the tracklist element is replaced; disconnect stale observers and rebind only if runtime evidence confirms replacement occurs.
5. Run actual browser tests for VNDB import click, batch actions, list membership add/remove, status/tag/blacklist updates, route/back navigation, and AMQ/EMQ switches. Mark any unavailable tests BLOCKED/NOT RUN.
6. Continue separate Song Select CSS cascade audit; resolve `#amqWorkspaceDock` only after determining whether it is redundant with `#c99LeftRail` and `#audioDock`.
7. Attempt GitHub HTML upload using a supported binary/blob route if available; verify remote path, exact version, byte size and SHA-256. Otherwise record the limitation without claiming upload success.
