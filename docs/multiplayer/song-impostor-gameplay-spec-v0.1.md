# Song Impostor Mode — Gameplay Specification v0.1

- Workstream: independent multiplayer-mode design.
- Branch: `multiplayer-song-impostor-spec-01`.
- Parent checkpoint: `v82.85.35-selected-list-validation-dedup-01`.
- Product/runtime impact: none. This stage adds design documentation only; it does not change the standalone HTML or existing multiplayer protocol.
- Status: draft for implementation planning, not yet user-playtested.

## 1. Goal

Create a social-deduction mode for AMQ in which most players hear a shared target song while one impostor hears a different, plausibly related song. Players should infer suspicious knowledge gaps through ordinary answers and discussion. A wrong answer is evidence, not proof.

The mode is not a normal quiz with a hidden-role label. The song-pair selection is a core gameplay system and must be evaluated for fairness, detectability, and information value.

## 2. Initial rules (MVP proposal)

1. A room has at least 4 players. Exactly one impostor is selected for the first MVP. The host may later configure impostor count, but that is out of scope now.
2. The impostor knows their role. They do not know the shared song or the other players' assigned song.
3. Non-impostors hear the same shared song. The impostor hears the paired alternate song.
4. All players receive the same clip duration and answer window. Avoid giving away the role through timing or playback behavior.
5. Players submit answers privately before discussion/voting. Answer format and whether the answer is song, anime, or artist must be consistent within a round.
6. After the answer phase, players discuss and vote. The exact voting and win conditions must be finalized before runtime integration.
7. Do not expose role-specific song IDs, pair scores, familiarity estimates, or the target song in public room state/logs before reveal.
8. If a valid song pair cannot be selected, fail closed: reject the round/start or use an explicitly configured fallback pool. Never silently fall back to an arbitrary unrelated song.

## 3. Design principles

- Plausible difference: the songs are distinguishable but not trivially unrelated.
- No guaranteed tell: artist/series identity must not automatically reveal the impostor song unless that is an intentional difficulty setting.
- Symmetry: either song may be assigned to the majority or impostor when the pair is otherwise eligible; do not always give the more obscure song to the impostor.
- Player-knowledge uncertainty: historical accuracy is a noisy proxy for familiarity, not a claim about what a player knows.
- Explainability: every candidate pair has recorded feature values and a rejection/selection reason.
- Determinism for tests: the selector accepts an injected seeded random source; unit tests must not depend on Math.random().
- Data minimization: store only the per-round statistics needed to tune pairs; do not retain private discussion content.
- Safe degradation: missing metadata reduces confidence or excludes a pair. It must not create fabricated similarity.

## 4. Song metadata contract

The initial selector may use only metadata that actually exists in the current song data. Before integration, inventory the available schema and map fields explicitly. Do not assume all fields exist.

Candidate optional fields:
- stable song ID;
- anime/work ID and normalized work identity;
- artist IDs or normalized artist names;
- song type (OP/ED/insert/other), if reliable;
- release year, if reliable;
- duration and available clip start/end, if known;
- genre/style tags, only if sourced and normalized;
- aggregate exposure/familiarity estimate, only after real usage data exists.

Unknown values remain unknown. Missing data must not be converted into false negative matches or default popularity claims.

## 5. Pair scoring model (initial, rule-based)

First apply hard eligibility filters:
- both songs are playable and have valid stable IDs;
- they are not the same song/version;
- both have enough valid audio for the configured clip;
- required metadata is present for the selected pairing strategy;
- no explicit blocked pair or duplicate assignment exists.

Then calculate interpretable sub-scores in [0, 1]:
- musical/work relationship plausibility;
- exposure/popularity balance;
- recognition-difficulty balance;
- estimated player-familiarity balance, when enough data exists;
- contrast signal: enough distinction remains for discussion and inference.

Do not collapse all goals into “maximize similarity.” The selector should target a configurable band: related enough to be plausible, distinct enough to support deduction. Missing optional features are omitted and the remaining weights renormalized; if too little evidence remains, reject the pair.

Initial default weights are a hypothesis to be calibrated, not facts:
- relation plausibility: 0.25
- exposure balance: 0.20
- recognition-difficulty balance: 0.20
- player-familiarity balance: 0.15
- contrast signal: 0.20

These weights are only an initial configuration. They must not be considered validated until simulated and then tested with humans. A pair should also pass explicit minimum/maximum bounds for critical dimensions; a weighted average must not hide a catastrophic mismatch.

## 6. Candidate selection pipeline

1. Normalize and validate the candidate pool.
2. Generate pair candidates using known relationships and/or trusted audio descriptors.
3. Apply hard filters and record rejection reasons.
4. Calculate sub-scores with missing-data handling.
5. Enforce fairness bounds, including exposure and difficulty gaps.
6. Select from the eligible score band using a seeded random source, avoiding repetitive pairs and role-direction bias.
7. Produce an internal selection record containing IDs, feature snapshot, score breakdown, selector version, seed/round ID, and rejection statistics. Do not publish the secret assignment to clients.
8. If the eligible pool is below the minimum, stop with a clear error instead of choosing a poor pair.

## 7. Fairness and difficulty

Difficulty is a target band, not a single maximum score. Track at least:
- majority answer rate;
- impostor answer rate;
- impostor vote-out rate;
- round duration / number of discussion cycles;
- player-reported fairness and difficulty;
- pair reuse frequency;
- outcomes by room size and broad experience cohort, only where sample size protects privacy.

A single round is not enough evidence to tune a pair. Avoid per-player adaptation in the MVP: it adds cold-start, privacy, and exploitability risks. Begin with room-level/aggregate evidence and optional self-reported familiarity later.

## 8. Security and information boundaries

Public room state may contain only information needed by all players: round phase, shared timer, public submissions after lock, discussion/voting state, and reveal after the round. Role, impostor song, pair metadata, and private assignment must remain server-authoritative or in the existing trusted host flow, depending on the current architecture. The architecture must be audited before choosing an implementation.

Never assume client-side hidden state is secure. If the current multiplayer model is peer-hosted/client-authoritative, document that limitation and avoid claiming strong secrecy.

## 9. MVP exclusions

- No AI-generated song metadata.
- No external audio fingerprint service.
- No automatic scraping of personal player profiles.
- No per-player predictive profiling.
- No new UI or changes to existing quiz mode in the design stage.
- No ranked matchmaking or long-term rating system.
- No multiple impostors, special roles, hints, or alternate victory conditions until the base loop is validated.

## 10. Acceptance criteria before UI/runtime integration

- Rules and win conditions are unambiguous.
- Actual song schema is inventoried; every feature has a source and missing-data policy.
- Pure selector can be run without DOM, network, audio playback, or the standalone HTML.
- Unit tests cover invalid pool, duplicate IDs, missing metadata, hard bounds, deterministic seed, role-direction balance, repeat avoidance, and no-eligible-pair failure.
- Simulation report includes distributions, rejection reasons, pair reuse, and sensitivity to weights; synthetic simulation is labeled as such and is not presented as human-play evidence.
- No existing product runtime or HTML fingerprint changes during this design/algorithm stage.

## 11. Open decisions

1. Exact win condition: eliminate the impostor, survive until time runs out, or score-based?
2. Answer format: guess song title, anime/work, artist, or a configurable category?
3. Is discussion/voting once per round or repeated across several rounds?
4. Which actual song metadata is reliable enough to score in the current database?
5. Does the current multiplayer architecture provide a trusted authority for secret assignments?

These decisions must be resolved before the mode is integrated into existing multiplayer lifecycle code.
