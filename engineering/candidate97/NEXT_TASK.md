# AMQ Learning Tool Next Task

1. **P0: long-session browser stability.** In an environment that can open the standalone HTML, repeat catalog/list/workspace transitions and multiple catalog batches while recording page errors, DOM mutation rate and memory.
2. **P0: real persistence.** Create/add/remove/filter/delete a custom list, reload the same origin and compare serialized state.
3. **P1: live imports.** Verify AniList and MAL public/authorized users, malformed/private/empty lists, VNDB username/ID lookup, network failures and recovery with real responses.
4. **P1: live covers.** Verify actual AnimeNewsNetwork and VNDB cover URLs, not only mocked image loads.
5. **P2: official osu!stable visual comparison.** Obtain the pinned reference screenshot and compare identical viewport screenshots, geometry, hover/selected states, expanded work/song rows and dock layout.
6. **GitHub release.** Upload the standalone Candidate 97 HTML and test artifacts to this branch, then verify remote file size and SHA-256. Do not claim the HTML upload is complete until the remote bytes match the local candidate.
