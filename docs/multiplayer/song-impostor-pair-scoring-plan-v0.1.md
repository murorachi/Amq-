# Song Impostor — Pair Scoring and Simulation Plan v0.1

- Branch: `multiplayer-song-impostor-spec-01`
- Related spec: `docs/multiplayer/song-impostor-gameplay-spec-v0.1.md`
- Status: proposed algorithm; not yet implemented or calibrated.

## 1. Separate eligibility from scoring

A score must never make an invalid pair valid. Run hard filters first:

1. Stable, distinct song IDs.
2. Both records are playable and clip duration is valid.
3. No exact duplicate recording/version pair.
4. Enough metadata exists for at least one approved pairing strategy.
5. Pair is not explicitly excluded and does not violate reuse constraints.
6. Exposure and difficulty gaps are inside configured safety bounds when those estimates exist.

Return structured rejection codes (for example `INVALID_ID`, `SAME_SONG`, `UNPLAYABLE`, `INSUFFICIENT_FEATURES`, `EXPOSURE_GAP`, `DIFFICULTY_GAP`, `RECENTLY_USED`). Never silently drop every candidate and choose a random fallback.

## 2. Feature model

Every feature has a value, evidence/source, confidence, and optional missing state. The score function must not infer facts from absent data.

### Relationship plausibility

Start with auditable rules, not a black-box model:
- same work, different song: strong relationship signal;
- same artist, different work: medium-to-strong signal;
- same broad song type/genre/year band: weak-to-medium signal;
- known similar audio descriptors: signal only if descriptor provenance and quality are established.

This is a relationship feature, not a final pair score. A same-work pair can still be rejected if its opening is too recognizable or its difficulty gap is extreme.

### Exposure balance

Use aggregate exposure counts only after they exist. Normalize counts with a capped logarithm or quantile buckets so a few viral songs do not dominate. Until real usage data exists, mark exposure as unknown and do not manufacture popularity ranks.

### Recognition difficulty

Estimate from aggregate correct-answer rate for the same clip duration and answer mode, with minimum sample counts and uncertainty intervals. Do not compare raw rates from different clip lengths or different answer categories. Before such data exists, this feature is unavailable.

### Player familiarity

Excluded from the first MVP's automatic selection. Later, optional self-report or sufficiently sampled aggregate accuracy may inform room-level estimates. Avoid inferring a player's knowledge from a handful of misses.

### Contrast signal

Ensure the pair is not effectively identical for the current game question, but do not use contrast alone to maximize difference. Its first implementation may be a bounded, manually reviewed category relationship, pending reliable audio features.

## 3. Score calculation

For available features only:

`weightedMean = sum(weight_i * confidence_i * score_i) / sum(weight_i * confidence_i)`

Then apply explicit bounds before selection:
- minimum relationship plausibility;
- maximum exposure gap;
- maximum recognition-difficulty gap;
- minimum evidence coverage;
- configured target score band.

The weighted mean is a ranking aid, not a substitute for hard limits. If the denominator is zero or evidence coverage is below threshold, reject the candidate.

Suggested initial weights (unvalidated): relationship 0.25, exposure balance 0.20, difficulty balance 0.20, familiarity balance 0.15, contrast 0.20. In MVP, unavailable features are omitted and remaining weights are renormalized. If this leaves the score dependent on only one weak feature, reject it.

## 4. Avoid selection bias

- Randomize whether the pair's A or B side is the majority target, but only after checking that both directions meet fairness constraints.
- Use a seeded RNG passed as a dependency; never use global random state inside scoring logic.
- Track pair and song use to reduce repetition, with a clear rule for relaxing reuse constraints if the pool is small.
- Do not repeatedly sample until a lucky candidate appears without a hard attempt cap.
- Record the selector version and score breakdown so reports can be reproduced.
- Never expose secret song IDs or score breakdown to public client state before reveal.

## 5. Simulation plan

The first simulation is a property/robustness test, not a prediction of real player behavior.

Input dimensions:
- pool size and missing-metadata rates;
- relationship category distributions;
- configured score bands and thresholds;
- room sizes;
- repeat-history lengths;
- fixed seeds across runs.

Report:
- eligible candidate count;
- rejection counts by reason;
- score distribution and feature coverage;
- selection frequency per song and pair;
- A/B direction balance;
- no-eligible-pair rate;
- repeat rate;
- score sensitivity to weight/threshold changes.

Synthetic recognition/exposure values must be explicitly labeled synthetic. Do not report simulated impostor detection or win rate as evidence until a behavior model has been calibrated against real anonymized rounds.

## 6. Required unit tests

1. Empty pool returns a typed failure.
2. Invalid/missing/duplicate IDs are rejected.
3. Same song or same recording pair is rejected.
4. Missing optional fields are handled without NaN or fabricated values.
5. Zero usable feature evidence rejects the pair.
6. A hard-bound violation cannot be rescued by a high weighted mean.
7. Equal inputs and equal seed produce the same selection.
8. Different seeds can select different eligible pairs without changing eligibility.
9. Both assignment directions are considered; the selector does not always assign a particular side to the impostor.
10. Recently used pairs are avoided when alternatives exist.
11. A too-small eligible pool returns failure, not an unrelated fallback.
12. Every selected result includes selector version and explainable score breakdown.
13. Public result serialization excludes private assignment and secret song IDs.
14. Score values remain finite and in their documented range.

## 7. Next engineering action

Inspect the current repository's actual song record schema, candidate-pool utilities, test runner conventions, and multiplayer authority model. Only then implement a pure selector module and tests. Do not wire it into UI or live multiplayer before its isolated contracts pass.
