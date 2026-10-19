export const GAME_RULES_VERSION = '0.1.0';
export const GAME_IDS = Object.freeze({
  COIN_CALL: 'coin-call', EXACT_SEVEN: 'exact-seven',
  VAULT: 'vault-push-your-luck', BLIND_HIGH_CARD: 'blind-high-card',
});

function integerRange(value, min, max, name) {
  if (!Number.isSafeInteger(value) || value < min || value > max) {
    throw new RangeError(name + ' must be an integer from ' + min + ' to ' + max);
  }
}
function positiveStake(stake) {
  if (!Number.isSafeInteger(stake) || stake <= 0) throw new RangeError('stake must be a positive safe integer');
}
export function grossReturn(stake, numerator, denominator) {
  positiveStake(stake);
  integerRange(numerator, 1, Number.MAX_SAFE_INTEGER, 'numerator');
  integerRange(denominator, 1, Number.MAX_SAFE_INTEGER, 'denominator');
  const payout = (BigInt(stake) * BigInt(numerator)) / BigInt(denominator);
  if (payout > BigInt(Number.MAX_SAFE_INTEGER)) throw new RangeError('payout exceeds safe integer range');
  return Number(payout);
}
export function resolveCoinCall({ choice, outcome, stake }) {
  positiveStake(stake);
  if (!['heads', 'tails'].includes(choice)) throw new TypeError('choice must be heads or tails');
  if (!['heads', 'tails'].includes(outcome)) throw new TypeError('outcome must be heads or tails');
  const won = choice === outcome;
  const payout = won ? grossReturn(stake, 19, 10) : 0;
  return Object.freeze({ gameId: GAME_IDS.COIN_CALL, rulesVersion: GAME_RULES_VERSION, won, payout, balanceDelta: payout - stake });
}
export function resolveExactSeven({ stake, dieOne, dieTwo }) {
  positiveStake(stake);
  integerRange(dieOne, 1, 6, 'dieOne');
  integerRange(dieTwo, 1, 6, 'dieTwo');
  const sum = dieOne + dieTwo;
  const won = sum === 7;
  const payout = won ? grossReturn(stake, 27, 5) : 0;
  return Object.freeze({ gameId: GAME_IDS.EXACT_SEVEN, rulesVersion: GAME_RULES_VERSION, won, sum, payout, balanceDelta: payout - stake });
}
const VAULT_STEPS = Object.freeze([
  Object.freeze({ step: 1, successBasisPoints: 8000, numerator: 12, denominator: 10 }),
  Object.freeze({ step: 2, successBasisPoints: 7000, numerator: 17, denominator: 10 }),
  Object.freeze({ step: 3, successBasisPoints: 6000, numerator: 27, denominator: 10 }),
]);
export function getVaultStep(step) {
  integerRange(step, 1, VAULT_STEPS.length, 'step');
  return VAULT_STEPS[step - 1];
}
export function resolveVaultStep({ stake, step, rollBasisPoints }) {
  positiveStake(stake);
  const rule = getVaultStep(step);
  integerRange(rollBasisPoints, 0, 9999, 'rollBasisPoints');
  const succeeded = rollBasisPoints < rule.successBasisPoints;
  const payout = succeeded ? grossReturn(stake, rule.numerator, rule.denominator) : 0;
  return Object.freeze({
    gameId: GAME_IDS.VAULT, rulesVersion: GAME_RULES_VERSION, step, succeeded,
    successBasisPoints: rule.successBasisPoints, payout, balanceDelta: payout - stake,
    terminal: !succeeded || step === VAULT_STEPS.length,
  });
}
export function resolveBlindHighCard({ entries, ranks }) {
  if (!Array.isArray(entries) || entries.length < 2) throw new TypeError('at least two entries are required');
  const ids = new Set();
  let pot = 0;
  for (const entry of entries) {
    if (!entry || typeof entry.playerId !== 'string' || !entry.playerId.trim()) throw new TypeError('each entry requires a playerId');
    if (ids.has(entry.playerId)) throw new TypeError('playerId must be unique');
    ids.add(entry.playerId);
    positiveStake(entry.stake);
    pot += entry.stake;
    if (!Number.isSafeInteger(pot)) throw new RangeError('pot exceeds safe integer range');
  }
  if (!ranks || typeof ranks !== 'object') throw new TypeError('ranks must map player IDs to ranks');
  for (const id of ids) integerRange(ranks[id], 1, 13, 'rank for ' + id);
  const highestRank = Math.max(...entries.map((entry) => ranks[entry.playerId]));
  const winners = entries.map((entry) => entry.playerId).filter((id) => ranks[id] === highestRank).sort();
  const share = Math.floor(pot / winners.length);
  let remainder = pot % winners.length;
  const payouts = Object.fromEntries(entries.map((entry) => [entry.playerId, 0]));
  for (const id of winners) payouts[id] = share + (remainder-- > 0 ? 1 : 0);
  return Object.freeze({
    gameId: GAME_IDS.BLIND_HIGH_CARD, rulesVersion: GAME_RULES_VERSION, pot, highestRank,
    winners: Object.freeze(winners), payouts: Object.freeze(payouts),
  });
}
export const GAME_RULES = Object.freeze({
  [GAME_IDS.COIN_CALL]: Object.freeze({ version: GAME_RULES_VERSION, winProbability: '1/2', grossMultiplier: '19/10' }),
  [GAME_IDS.EXACT_SEVEN]: Object.freeze({ version: GAME_RULES_VERSION, winProbability: '1/6', grossMultiplier: '27/5' }),
  [GAME_IDS.VAULT]: Object.freeze({ version: GAME_RULES_VERSION, steps: VAULT_STEPS }),
  [GAME_IDS.BLIND_HIGH_CARD]: Object.freeze({ version: GAME_RULES_VERSION, ranks: '1..13; highest rank wins; ties split pot' }),
});
