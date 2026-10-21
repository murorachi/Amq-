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

Do not silently replace this blocker with osu!lazer source. The user explicitly instructed that the official osu!-wiki be used when exact osu! pages are unknown. This is the approved fallback for UI implementation. Use the pinned official Wiki screenshots as a traceable visual target, while retaining the limitation that the screenshots are not proven to be captures of Stable 20260924.1. The matching Stable source commit remains blocked and must not be fabricated. Candidate UI changes may proceed on an isolated working branch; do not overwrite the pinned Proto24 baseline or promote without full acceptance.

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

## Proto25 screenshot comparison — 2026-10-21

Comparison sources: the pinned official screenshots listed above and the downloaded Proto25 browser artifact screenshots. This is a qualitative geometry audit, not a pixel-similarity score; the captures use different viewports and the wiki images do not identify their exact Stable build.

| Screen element | Official Stable reference | Previous Proto25 capture | Observed delta / action |
|---|---|---|---|
| Main-menu cookie/logo | Approximately 480px diameter in a 1280px-wide reference; it overlaps the left edge of the menu blades. | Approximately 292px diameter in a 1440px-wide capture, separated from the menu. | Materially undersized and too isolated. Increased the desktop logo to a 400–490px range and translated it into the menu area; increased the landing region and primary action row height. Browser assertions now guard logo width, landing height and action height. |
| Play submenu cookie/logo | Approximately 500px diameter in a 1280px-wide reference; overlaps the menu blades. | Approximately 356px diameter in a 1440px-wide capture. | Materially undersized. Increased the desktop cookie to a 460–500px range and shifted it toward the menu; increased the three action blades to 92px minimum height and 16px spacing. Added desktop browser assertions for logo width and all three button heights. |
| Primary menu blades | Large purple trapezoids with italic white labels and relatively generous vertical spacing. | Shape/color direction was already close, but the previous actions were short and tightly packed. | Retained the existing AMQ routes and Stable-inspired clip-path/gradient; enlarged desktop actions without changing their click handlers. |
| Options sidebar | Screenshot shows a wide left options surface with an icon rail and settings content over the home scene. | AMQ options drawer is narrower and contains only controls supported by this app. | Keep AMQ-specific controls rather than inventing osu! options. Width and information hierarchy remain a possible visual delta; review after the current main-menu/Play-menu changes. |
| Song Select | Skin-driven background, song/difficulty list, sorting/grouping and score panels. | AMQ catalog/detail is a different data model and has a sparse single-row fixture in the browser screenshot. | Do not claim equivalence. Keep AMQ catalog semantics; future work may improve the Stable-inspired visual structure only where it does not invent beatmap features. |
| Background/skin | Official screenshots use a user skin/background with substantial texture and animation. | Candidate uses a restrained CSS texture and gradients. | Exact background matching is not possible from a generic screenshot without a version-matched client capture or licensed/reference assets. Do not use the official screenshot as a fake page background. |

The home and Play-menu size adjustments passed workflow [39530034146](https://github.com/murorachi/Amq-/actions/runs/39530034146): 18 browser assertions passed, page/console errors were zero, the downloaded candidate SHA-256 matched its manifest, and the Stage 24 remote HTML/manifest/report were verified. The latest screenshots show the intended larger cookie and overlapping blades. Exact >=90% similarity remains NOT VERIFIED.


## Proto25 Stage 30 — Options sidebar and responsive review

Evidence workflow: [39536870515](https://github.com/murorachi/Amq-/actions/runs/39536870515), successful on tested source commit `a05c66401f0053d2c7bee53f5a965422edd8f9e9`.

- Reviewed the latest desktop and mobile home, Play menu and Settings screenshots from the workflow artifact.
- The mobile home cookie and primary blades stack without horizontal overflow; the 390px viewport and document widths both measure 390px.
- The mobile Play menu keeps all three required labels visible and the implementation note remains reachable below the actions.
- The Settings surface was previously 292px wide at desktop resolution, making it visually cramped compared with the Stable Options-sidebar reference. Increased desktop width to 340px while retaining 292px on mobile. Browser acceptance now asserts desktop width between 336px and 344px and checks mobile document width does not exceed the 390px viewport.
- Latest Settings screenshot confirms the 340px panel stays inside the desktop viewport, the existing controls remain visible, and the home composition remains behind the sidebar. The change does not add fictional options or change settings behavior.
- Stage 30 validation: static HTML/duplicate-ID/inline JavaScript checks PASS; 18 browser assertions PASS; page errors 0; console errors 0. Candidate size 8,918,095 bytes, SHA-256 `0ae1692288d85c3d7750af365b9fcb60cd57744e47b979ab9cdef08ce7a30232`; downloaded candidate matched its manifest and remote Stage 24 HTML/manifest/report were verified.
- Remaining material differences are now more concentrated in the synthetic CSS cookie artwork/background, the compact profile/player header and the fact that AMQ's catalog/detail data model differs from osu!Stable Song Select. Improve these only with traceable visual evidence and without inventing osu! functionality. Exact >=90% similarity remains NOT VERIFIED.
