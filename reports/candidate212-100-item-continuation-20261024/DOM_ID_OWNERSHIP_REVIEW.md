# Candidate212 DOM ID Ownership Review

Date: 2026-10-24
Source: Candidate212 readable Library text export; static review only.

## Initial DOM result

A BeautifulSoup parse of the initial HTML markup found 296 ID attributes and 296 unique values: no duplicate IDs exist in the initial parsed markup. Repeated ID strings found by whole-source grep mostly occur inside JavaScript templates, fallback builders, or CSS selectors. These must not be treated as simultaneous duplicate DOM nodes without runtime evidence.

## ID ownership and cleanup disposition

| ID / family | Observed owners or creation paths | Likely lifecycle | Disposition | Evidence needed before removal |
|---|---|---|---|---|
| `discoverCard` | Initial homepage markup; main script `ensureDiscoveryCardV60()` creates it only if missing | Initial DOM with a guarded fallback | KEEP fallback unless redundant guard can be proven | Startup with missing section; homepage navigation; discovery refresh |
| `discoverListen` | Initial discovery markup; fallback card template in main script | One card per discovery view | KEEP / verify template replacement | Repeated discovery refresh and click behavior |
| `discAnother` | Multiple strings inside `showDiscovery()` render branches | `innerHTML` is replaced as discovery content changes | KEEP; not evidence of simultaneous duplicates | Verify only one effective button after repeated rerender |
| `watchModeTab` / `customModeTab` | Initial markup; conditional `.mylistModeTabs` fallback in `v82-25-custom-lists-and-practice-hub` | Initial tabs or fallback tabs, not intended to coexist | KEEP fallback; INTEGRATE binding logic only after runtime proof | Repeated script evaluation, mount/unmount, click counts |
| `v44VolumeControl` / `v44Volume` / `v44VolumeValue` | Primary V44 builder and V82.35 media-toolbar fallback | One shared control, fallback may construct if primary is absent | INTEGRATE; do not delete fallback yet | Root present/absent, injected failure, exactly one element, volume persistence, mute at zero, audio replacement |
| `aniSrsLearningWidget` | Learning widget ensure/render path(s) | Conditional host creation | NEEDS CONFIRMATION | Trace all creators, ensure guard and owner teardown |
| `mpPause` / `mpLobby` | Multiple game-phase HTML template branches in `v82-34-multiplayer-ui` | Phase-dependent markup replaces prior game content | KEEP unless runtime proves simultaneous duplicate IDs | Test waiting/preparing/running/paused/reveal/final transitions and event delegation |
| `mpVideoMount` | Running and reveal phase templates in multiplayer UI | Phase-dependent video mount point | KEEP; phase template contract | Switch phases while video is loading; ensure old video is detached/stopped |
| `vn49BackSongs` | Two VN detail/list render templates in `v82-49-vn-library-navigation-script` | View-specific markup replaces the root content | KEEP; template reuse is expected | Navigate list/detail repeatedly and verify one live back button |
| `amqSongSelectRankingPlaceholder` | Candidate70 guarded creator; Candidate71 guarded creator; CSS and workspace-shell consumers | Shared route frame with multiple fallback-like creators and multiple styling owners | INTEGRATE / NEEDS CONFIRMATION; highest-priority owner cleanup candidate | One canonical creator, all consumers mapped, route entry/re-entry, focus restore, geometry and keyboard close |
| Template-expression matches such as `${esc(list.id)}` and `${kind===...}` | Regex matches inside interpolated template expressions, not literal DOM IDs | Static scan false positives | IGNORE as IDs | Confirm parsed DOM only if needed; do not change source |

## Root-cause observations

1. The initial DOM has no duplicate IDs, so the 18 repeated whole-source ID values are not proof of invalid initial markup.
2. Several repeated IDs are expected across mutually exclusive templates. Multiplayer phase templates use the same control IDs across alternate HTML strings; this is acceptable only if render replaces the previous phase markup before attaching handlers.
3. `watchModeTab` and `customModeTab` have one initial owner and one conditional fallback template. Candidate218's idempotent handler assignment is defensive; the normal initialization call graph does not itself prove duplicate listener stacking.
4. The volume control has two actual builder branches with differing behavior, so it is a genuine consolidation candidate rather than a name-only duplicate.
5. `amqSongSelectRankingPlaceholder` has at least two guarded creators and multiple generations of layout/route consumers. This is a stronger integration candidate, but deleting a creator could break workspace-shell initialization because the shell returns early when the frame is missing.

## Cleanup classification

- **KEEP:** custom-list and learning data owners; multiplayer phase templates; view-specific VN templates; discovery UI fallback until its owner contract is tested.
- **INTEGRATE:** volume-control factory/mount logic; ranking-frame creation into one canonical ensure function; duplicate layout/route responsibilities after call-chain tracing.
- **DELETE:** none proven unreachable by this pass.
- **NEEDS CONFIRMATION:** learning-widget host creators, all long-lived observer targets, route-shell teardown, template replacement order, and every dynamic ID family above until runtime tests confirm mutual exclusivity.

## Test status

- PASS: initial markup ID uniqueness check (296 IDs, 296 unique).
- PASS: static ownership/creation-site mapping for the listed IDs.
- NOT RUN: DOM ID uniqueness after dynamic rendering, event counts across template transitions, route remounts, and teardown.
- BLOCKED: browser runtime tests in the current environment, per prior `file://` / localhost restrictions.