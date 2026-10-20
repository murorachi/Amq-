# osu!stable Reference Audit — Proto24

Audit date: 2026-10-21
Repository: https://github.com/murorachi/Amq-
AMQ base candidate branch: `v82.85.30-proto24-accepted-delivery-02`
AMQ base commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`

## AMQ candidate pinned before any new UI edits

- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- UI acceptance workflow: https://github.com/murorachi/Amq-/actions/runs/39479839526
- UI acceptance source branch: `v82.85.30-proto24-workspace-ui-pass-01`
- UI acceptance source commit: `25ac425472198e4f2a4547a3ca9d073a279a1c63`
- The delivery branch is five commits ahead of the UI acceptance branch. The candidate HTML and its SHA-256 manifest are present on the delivery branch.
- The artifact ZIP was downloaded and its SHA-256 verified against the GitHub artifact digest: `c85bcdf78094ac801654b275e8ef41901f7095495d636587079a85134a39ef01`.

## Official osu!stable release identity

- The official osu! changelog lists the latest stable build on the audit date as **Stable 20260924.1**, released 2026-09-24:
  https://osu.ppy.sh/home/changelog/stable40/20260924.1
- Official release listing: https://osu.ppy.sh/home/changelog
- This establishes the public release label, not a source-control commit. The stable client build does not expose a verified matching source commit in the public repository checked during this audit.

## Pinned official UI documentation and source files

Official osu! Wiki source repository: https://github.com/ppy/osu-wiki
Pinned wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`

| Purpose | Pinned file | Git blob SHA |
|---|---|---|
| Main menu, play menu, song select documentation | `wiki/Client/Interface/en.md` | `de13d6eb6473199116211b878e847858194791c4` |
| Options sidebar/settings documentation | `wiki/Client/Options/en.md` | `1425a773d472533507a4cdfab11f0c139c11229e` |
| Main menu screenshot | `wiki/Client/Interface/img/main-menu.jpg` | `f6617a0da2058f79d9bdf11191326df8e74ecba1` |
| Play menu screenshot | `wiki/Client/Interface/img/play-menu.jpg` | `a4413f514a4aec91ee3c45995ee500cff882de3f` |
| Song select screenshot | `wiki/Client/Interface/img/song-selection.jpg` | `1e927a00a1984a5ba20fa5efec639410f349607a` |
| Options sidebar screenshot | `wiki/Client/Options/img/options_basic.jpg` | `05d5917ccc53c67e70415f7a88d084c711f9b9cc` |

Pinned file links:
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/en.md
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Options/en.md
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/main-menu.jpg
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/play-menu.jpg
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Options/img/options_basic.jpg

The documentation describes the osu!stable main menu, osu! cookie, profile/user options, jukebox controls, Play menu, Song Select, grouping/sorting/search, and left-side Options panel. The documented Play menu uses `Solo`, `Multi`, and `Back`; AMQ's required labels and actions must be mapped to existing AMQ features rather than copied as dead buttons.

## Source-code commit status

**BLOCKED: exact osu!stable client source commit and matching UI implementation files are not verified.**

- The public `ppy/osu` repository identifies itself as the successor client that will evolve until users prefer it over osu!stable. It is not a valid substitute for stable source.
- The `peppy/osu-stable-reference` links appear in public upstream discussions/commits, including reference SHA `baa8705f782c0de2b10a7387d78014c61c8b17fb`, but the repository could not be retrieved through the available GitHub integration during this audit. That SHA must not be claimed as the source commit for Stable 20260924.1 or as verified main-menu source.
- The pinned wiki screenshots are official UI evidence, but their files do not state that they were captured from Stable 20260924.1. They are a traceable visual reference, not proof of a version-matched client source tree.

Do not silently replace this blocker with osu!lazer source. Before UI implementation starts, obtain verifiable UI evidence captured from Stable 20260924.1 or explicitly document an approved fallback to the pinned official Wiki screenshots. Until that reference gate is resolved, do not modify the candidate HTML or create a new formal HTML deliverable.

## Existing candidate acceptance and limitations

The workflow `39479839526` completed successfully. The checked artifact report records browser acceptance for homepage navigation, native storage persistence, mobile overflow, Learning Center and Analysis workspace rendering, and no browser/console errors. It explicitly does **not** cover real audio output, full quiz-answer lifecycle regression, or multiplayer lifecycle regression.

Independent local checks on the downloaded artifact:
- HTML parser: PASS.
- 219 element IDs, zero duplicates: PASS.
- 40 executable inline JavaScript blocks checked with `node --check`: PASS.
- Candidate size and SHA-256 matched the published manifest: PASS.

These results are not a visual similarity acceptance. The screenshot still shows a placeholder circular mark (`♫ ?`), a plain dark background, rectangular action cards, and large profile/player panels. It has not been measured against a same-resolution capture of the pinned osu!stable reference, so the requested 90%+ visual similarity is **NOT VERIFIED**.

## No source modifications

This audit changes no AMQ HTML, application logic, CSS, or tests. The new audit branch is isolated from the original candidate and production branches.
