# AMQ Learning Tool Next Task

1. **P0: close the long-session acceptance gap.** A monolithic mock-browser run stalled while transitioning from provider imports to custom-list filtering, although the same CRUD/reload cases pass in an isolated context. Reproduce in a browser that can open the standalone HTML and observe page errors, DOM mutation rate and memory after repeated routes and multiple catalog batches.
2. **P0: verify real persistence.** Create/add/remove/filter/delete a custom list, reload the same origin and compare serialized state using origin-backed localStorage.
3. **P1: live imports.** Verify AniList and MAL public/authorized users, malformed/private/empty lists, VNDB username/ID lookup, network failures and recovery with real responses.
4. **P1: live covers.** Verify actual AnimeNewsNetwork and VNDB cover URLs, not only mocked image loads.
5. **P2: official osu!stable visual comparison.** Obtain the pinned reference screenshot and compare identical viewport screenshots, geometry, hover/selected states, expanded work/song rows and dock layout.
6. **GitHub release.** Upload the standalone Candidate 97 HTML and test artifacts, then verify remote file size and SHA-256. Documentation is committed; do not claim HTML upload is complete until remote bytes match.
7. **Legacy batch-code cleanup.** After guarding old unguarded handlers, delete the hidden `#quicktools` DOM and obsolete batch action code rather than leaving compatibility DOM.
