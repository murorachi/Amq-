# UI conformance matrix

Checkpoint: `NEW_ARCH_V0.1.2_HOME_WIKI_REBUILD_01`; parent v0.1.1 preserved.

| Screen | Reference direction | v0.1.2 status | Gate |
|---|---|---|---|
| Main menu | Official osu! stable Interface Wiki composition | Rebuilt: large cookie-like focal element left, route menu right, user/status top, tip/local status footer | User visual acceptance pending; fix only this page if rejected |
| Song select | Wiki song-select density, selected state and composition | v0.1.1 list/detail implementation unchanged | Fail / not accepted; begin after home acceptance |
| Quiz | AMQ interaction and visual direction | Centered quiz card | Not accepted |
| Results | osu!-inspired result hierarchy | Generic metric tiles | Not accepted |
| Other pages | Previously agreed 13-stage specification | Generic sidebar/topbar/panels remain | Not accepted |
| Shared buttons | Consistent size, spacing and alignment | Home menu uses consistent grid columns and height; other pages not fully checked | Partial |

## Evidence and limitations

- Official reference: https://osu.ppy.sh/wiki/en/Client/Interface and https://osu.ppy.sh/wiki/zh/Client/Interface.
- Chromium `set_content` smoke test at 1440×900 and 390×844: 5 home menu controls, catalog navigation works, no mobile horizontal overflow.
- Node tests: 10 passed, 0 failed. Unit tests do not establish visual fidelity.
- Direct `file://` and localhost navigation are blocked by the environment. Actual double-click/storage behavior and pixel-measured Wiki comparison remain unverified.
- Home visual acceptance is pending. Do not start song select before acceptance.
- Legacy AMQ is untouched.
