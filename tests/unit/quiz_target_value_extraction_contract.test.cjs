'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_004.htmlpart'), 'utf8');
const moduleSource = fs.readFileSync(path.join(root, 'src/modules/quiz_target_value.htmlpart'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'reports/FRAGMENT_MANIFEST.json'), 'utf8'));
const marker = '<!-- AMQ_SPLIT_MODULE:quiz_target_value -->';
const expectedSource = "const getTargetValue=(s,type)=>type==='artist'?String(s?.[5]||'').trim():(type==='anime'||type==='all')?String((window.__aniEmqAPI?.getWorkSummary?.(s?.[0])||window.byAnime.get(s?.[0]))?.[1]||'').trim():String(s?.[4]||'').trim();";
const sha256 = b => crypto.createHash('sha256').update(b).digest('hex');
let assertions = 0;
function check(name, condition) { assert.ok(condition, name); assertions++; console.log('PASS ' + name); }
const record = manifest.modules.find(x => x.name === 'quiz_target_value');
check('module manifest fingerprint matches exact bytes', !!record && record.byte_length === Buffer.byteLength(moduleSource) && record.sha256 === sha256(Buffer.from(moduleSource)));
check('source marker occurs exactly once', source.split(marker).length - 1 === 1);
check('original declaration position is preserved', source.includes("const norm=x=>String(x??'').normalize('NFKC').toLocaleLowerCase().replace(/[\\s\\p{P}\\p{S}\\p{C}]/gu,'');\\n" + marker + "\\nfunction enterSpecial"));
check('restoring module restores the original declaration bytes', source.replace(marker, moduleSource).includes(expectedSource));
check('module is exact original declaration without wrapper/import/export', moduleSource === expectedSource && !/\b(?:import|export)\b/.test(moduleSource));
const animeRow = [12, 'Catalog Anime', 'Catalog Romaji'];
const windowStub = {
  byAnime: new Map([[12, animeRow], [13, [13, 'Fallback Anime']]]),
  __aniEmqAPI: { getWorkSummary: id => String(id) === '12' ? [12, 'EMQ Work', 'EMQ Romaji'] : null }
};
const context = vm.createContext({ window: windowStub, String, Map });
const getTargetValue = vm.runInNewContext(moduleSource + '\ngetTargetValue', context, { timeout: 1000 });
const song = [12, 0, 1, 1, '  Song Title  ', '  Artist Name  '];
const cases = [
  ['artist target trims artist name', song, 'artist', 'Artist Name'],
  ['title target trims song title', song, 'title', 'Song Title'],
  ['anime target prefers EMQ work summary', song, 'anime', 'EMQ Work'],
  ['all target uses same work name as anime target', song, 'all', 'EMQ Work'],
  ['missing EMQ summary falls back to anime catalog', [13, 0, 1, 1, 'Other Title', 'Other Artist'], 'anime', 'Fallback Anime'],
  ['unknown target follows existing title fallback', song, 'unknown', 'Song Title'],
  ['null song is safe for title target', null, 'title', ''],
  ['null song is safe for artist target', null, 'artist', ''],
  ['null song is safe for anime target', null, 'anime', ''],
  ['missing title returns empty string', [12, 0, 1, 1, '', 'Artist'], 'title', ''],
  ['missing artist returns empty string', [12, 0, 1, 1, 'Title', ''], 'artist', '']
];
for (const [name, row, target, expected] of cases) check(name, getTargetValue(row, target) === expected);
check('resolver contains no DOM, storage or timer dependencies', !/document|localStorage|sessionStorage|setTimeout|setInterval/.test(moduleSource));
console.log('RESULT ' + assertions + ' assertions passed');
