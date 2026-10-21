# osu!stable Reference Audit — Proto24

Audit date: 2026-10-21
Current audit branch: `v82.85.30-proto24-stable-reference-audit-02`
AMQ repository: https://github.com/murorachi/Amq-
Pinned AMQ candidate branch: `v82.85.30-proto24-accepted-delivery-02`
Pinned AMQ candidate commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`

## AMQ candidate pinned before any new UI edits

- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- UI acceptance workflow: https://github.com/murorachi/Amq-/actions/runs/39479839526
- UI acceptance source branch: `v82.85.30-proto24-workspace-ui-pass-01`
- UI acceptance source commit: `25ac425472198e4f2a4547a3ca9d073a279a1c63`
- Delivery branch is five commits ahead of the UI acceptance branch. Candidate HTML and its SHA-256 manifest are present on the delivery branch.
- Prior workflow report says the artifact ZIP digest was `c85bcdf78094ac801654b275e8ef41901f7095495d636587079a85134a39ef01`; the candidate HTML digest is the separate value above.

## Official osu!stable release identity

- Official osu! changelog identifies the latest stable build checked on this audit date as **Stable 20260924.1**, released 2026-09-24:
  https://osu.ppy.sh/home/changelog/stable40/20260924.1
- Official release listing: https://osu.ppy.sh/home/changelog
- This proves the public release label, not a source-control commit.

## Pinned official UI documentation and source files

Official osu! Wiki source repository: https://github.com/ppy/osu-wiki
Pinned wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`

| Purpose | Pinned file | Git blob SHA |
|---|---|---|
| Main menu, Play menu, Song Select documentation | `wiki/Client/Interface/en.md` | `de13d6eb6473199116211b878e847858194791c4` |
| Options sidebar/settings documentation | `wiki/Client/Options/en.md` | `1425a773d472533507a4cdfab11f0c139c11229e` |
| Main menu screenshot | `wiki/Client/Interface/img/main-menu.jpg` | `f6617a0da2058f79d9bdf11191326df8e74ecba1` |
| Play menu screenshot | `wiki/Client/Interface/img/play-menu.jpg` | `a4413f514a4aec91ee3c45995ee500cff882de3f` |
| Song Select screenshot | `wiki/Client/Interface/img/song-selection.jpg` | `1e927a00a1984a5ba20fa5efec639410f349607a` |
| Options sidebar screenshot | `wiki/Client/Options/img/options_basic.jpg` | `05d5917ccc53c67e70415f7a88d084c711f9b9cc` |

Pinned links:
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/en.md
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Options/en.md
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/main-menu.jpg
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/play-menu.jpg
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg
- https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Options/img/options_basic.jpg

These files provide traceable official UI documentation and visual evidence. They do not prove that the screenshots were captured from Stable 20260924.1.

## Source-code investigation and blocker

**BLOCKED: the exact osu!stable client source commit and matching UI implementation files have not been verified.**

- The public `ppy/osu` repository explicitly describes itself as the successor client released under the codename lazer. It is not a valid substitute for stable source.
- The public `ppy/osu-stable-issues` repository is an issue tracker, not the stable client source.
- Upstream public discussions and source references mention `peppy/osu-stable-reference`, including commit `baa8705f782c0de2b10a7387d78014c61c8b17fb`. That reference has not been verified as the repository head or source mapping for Stable 20260924.1. It must not be presented as the target release's source commit.
- Official release notes identify a release label but do not establish the corresponding source commit or prove which files implement the target screens.
- Further investigation must verify the upstream repository, release/source relationship, exact commit, and relevant files and contents. If that mapping cannot be established, preserve the blocker and do not begin formal UI implementation.

## Existing candidate acceptance and limitations

The existing workflow `39479839526` is recorded as successful in the prior engineering report. That report lists browser acceptance for homepage navigation, native storage persistence, mobile overflow, Learning Center and Analysis workspace rendering, and no browser/console errors. It does not cover real audio output, full quiz-answer lifecycle regression, or multiplayer lifecycle regression.

Prior independent local checks recorded:
- HTML parser: PASS.
- 219 element IDs, zero duplicates: PASS.
- 40 executable inline JavaScript blocks checked with `node --check`: PASS.
- Candidate size and SHA-256 matched the published manifest: PASS.

These are not visual similarity acceptance. The candidate screenshot was reported to contain a `♫ ?` placeholder mark, a plain dark background, rectangular action cards, and large profile/player panels. Same-version, same-resolution comparison and the requested 90%+ visual similarity remain NOT VERIFIED.

## Change boundary

This audit is documentation-only. Do not modify candidate HTML, application CSS/JS, production files, or unrelated behavior while the stable source/version gate remains blocked.
