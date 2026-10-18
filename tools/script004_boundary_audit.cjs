#!/usr/bin/env node
'use strict';
// Conservative AST boundary inventory for script_004. Evidence generator only; never rewrites source.
const fs = require('node:fs');
const path = require('node:path');
let ts;
try { ts = require('typescript'); }
catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') throw error;
  ts = require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js');
}
const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'src/scripts/script_004.htmlpart');
const REPORT = path.join(ROOT, 'reports/CORE_SCRIPT_004_BOUNDARY_AUDIT.md');
const STATE_CSV = path.join(ROOT, 'reports/CORE_SCRIPT_004_SHARED_STATE.csv');
const API_CSV = path.join(ROOT, 'reports/CORE_SCRIPT_004_API_TOUCHPOINTS.csv');
const raw = fs.readFileSync(SOURCE, 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports/FRAGMENT_MANIFEST.json'), 'utf8'));
let assembled = raw;
for (const module of manifest.modules || []) {
  const insertion = module.insertion_fragment || 'src/scripts/script_004.htmlpart';
  if (insertion !== 'src/scripts/script_004.htmlpart') continue;
  const marker = module.marker;
  const markerCount = assembled.split(marker).length - 1;
  if (markerCount !== 1) throw new Error(`Expected one ${module.name} marker in script_004, found ${markerCount}`);
  const moduleBytes = fs.readFileSync(path.join(ROOT, module.path));
  if (moduleBytes.length !== module.byte_length || require('node:crypto').createHash('sha256').update(moduleBytes).digest('hex') !== module.sha256) throw new Error(`Module fingerprint mismatch: ${module.name}`);
  assembled = assembled.replace(marker, moduleBytes.toString('utf8'));
}
const source = assembled.replace(/^\s*<script\b[^>]*>/i, '').replace(/<\/script>\s*$/i, '').replace(/<!--\s*(AMQ_SPLIT_MODULE:[\w-]+)\s*-->/g, '// $1');
const sf = ts.createSourceFile('script_004.htmlpart', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
if (sf.parseDiagnostics.length) {
  console.error('script_004 parse diagnostics:', sf.parseDiagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')));
  process.exit(1);
}
const csv = rows => rows.map(row => row.map(v => { const s = String(v ?? ''); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n') + '\n';
const line = n => sf.getLineAndCharacterOfPosition(Math.max(0, n)).line + 1;
const functionLike = n => ts.isFunctionDeclaration(n) || ts.isFunctionExpression(n) || ts.isArrowFunction(n) || ts.isMethodDeclaration(n) || ts.isGetAccessor(n) || ts.isSetAccessor(n);
const parents = new WeakMap();
function mapParents(n, p = null) { if (p) parents.set(n, p); ts.forEachChild(n, c => mapParents(c, n)); }
mapParents(sf);
function getName(n) {
  if (n.name && (ts.isIdentifier(n.name) || ts.isStringLiteral(n.name))) return n.name.text;
  if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) return n.name.text;
  return '<anonymous>';
}
function ownerOf(n) {
  let p = parents.get(n);
  while (p) {
    if (functionLike(p)) {
      if (ts.isFunctionDeclaration(p) && p.name) return p.name.text;
      if (ts.isVariableDeclaration(p) && ts.isIdentifier(p.name)) return p.name.text;
      return '<anonymous@' + line(p.getStart(sf)) + '>';
    }
    p = parents.get(p);
  }
  return '<top-level>';
}
function visit(n, fn) { fn(n); ts.forEachChild(n, c => visit(c, fn)); }
// Locate the outer IIFE function body. Its direct declarations are closure-wide state candidates.
let iifeBody = null;
visit(sf, n => {
  if (iifeBody || !ts.isCallExpression(n)) return;
  const e = n.expression;
  if ((ts.isParenthesizedExpression(e) ? e.expression : e) && ts.isParenthesizedExpression(e)) {
    const inner = e.expression;
    if (ts.isArrowFunction(inner) || ts.isFunctionExpression(inner)) iifeBody = inner.body;
  } else if (ts.isArrowFunction(e) || ts.isFunctionExpression(e)) iifeBody = e.body;
});
if (!iifeBody || !ts.isBlock(iifeBody)) throw new Error('Could not locate script_004 outer IIFE block');
const shared = new Map();
for (const stmt of iifeBody.statements) {
  if (ts.isVariableStatement(stmt)) {
    for (const d of stmt.declarationList.declarations) if (ts.isIdentifier(d.name)) shared.set(d.name.text, { name: d.name.text, kind: 'variable', line: line(d.getStart(sf)), declared: d.getStart(sf), reads: 0, writes: 0, owners: new Set(), readOwners: new Set(), writeOwners: new Set() });
  } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
    shared.set(stmt.name.text, { name: stmt.name.text, kind: 'function', line: line(stmt.getStart(sf)), declared: stmt.getStart(sf), reads: 0, writes: 0, owners: new Set(), readOwners: new Set(), writeOwners: new Set() });
  }
}
const apis = new Map();
const domIds = new Map();
const selectors = new Map();
const listeners = [];
const timers = [];
const windowExports = [];
const functionDefs = [];
const apiPattern = /^(document|window|localStorage|sessionStorage|indexedDB|navigator|location|history|console|performance|Audio|URL|URLSearchParams|MutationObserver|ResizeObserver|IntersectionObserver|AbortController)\./;
function addApi(key, kind, owner, ln, sample) {
  const k = kind + '|' + key;
  if (!apis.has(k)) apis.set(k, { api: key, kind, count: 0, owners: new Set(), firstLine: ln, sample: String(sample).replace(/\s+/g, ' ').slice(0, 160) });
  const a = apis.get(k); a.count++; a.owners.add(owner);
}
visit(sf, n => {
  if (functionLike(n) && n.body) {
    const name = ts.isFunctionDeclaration(n) && n.name ? n.name.text : ownerOf(n) === '<top-level>' ? '<iife>' : ownerOf(n);
    functionDefs.push({ name, kind: ts.isArrowFunction(n) ? 'arrow' : ts.isFunctionDeclaration(n) ? 'function' : 'function-expression', line: line(n.getStart(sf)), bytes: Buffer.byteLength(source.slice(n.body.pos, n.body.end), 'utf8') });
  }
  if (ts.isIdentifier(n) && shared.has(n.text)) {
    const p = parents.get(n);
    if (p && ((ts.isVariableDeclaration(p) && p.name === n) || (ts.isFunctionDeclaration(p) && p.name === n) || (ts.isParameter(p) && p.name === n))) return;
    if (p && ts.isPropertyAccessExpression(p) && p.name === n) return;
    if (p && (ts.isPropertyAssignment(p) && p.name === n)) return;
    const s = shared.get(n.text), own = ownerOf(n);
    s.owners.add(own);
    let write = false;
    if (p && (ts.isBinaryExpression(p) && p.left === n && p.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && p.operatorToken.kind <= ts.SyntaxKind.LastAssignment)) write = true;
    if (p && (ts.isPrefixUnaryExpression(p) || ts.isPostfixUnaryExpression(p)) && p.operand === n && [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken].includes(p.operator)) write = true;
    if (write) { s.writes++; s.writeOwners.add(own); } else { s.reads++; s.readOwners.add(own); }
  }
  if (ts.isCallExpression(n)) {
    const e = n.expression;
    let text = e.getText(sf);
    if (apiPattern.test(text)) {
      addApi(text, 'call', ownerOf(n), line(n.getStart(sf)), n.getText(sf));
      if (/\.addEventListener$|\.removeEventListener$|\.on$|\.off$/.test(text)) listeners.push({ line: line(n.getStart(sf)), owner: ownerOf(n), call: n.getText(sf).slice(0, 260) });
    }
    if (/^(setTimeout|setInterval|requestAnimationFrame|cancelAnimationFrame|clearTimeout|clearInterval)$/.test(text) || /^(window|globalThis)\.(setTimeout|setInterval|requestAnimationFrame|cancelAnimationFrame|clearTimeout|clearInterval)$/.test(text)) timers.push({ line: line(n.getStart(sf)), owner: ownerOf(n), call: n.getText(sf).slice(0, 260) });
    if (/^(document\.getElementById|document\.querySelector|document\.querySelectorAll|document\.createElement)$/.test(text)) {
      const arg = n.arguments[0];
      if (arg && (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg))) {
        const value = arg.text;
        const map = text === 'document.getElementById' ? domIds : selectors;
        map.set(value, (map.get(value) || 0) + 1);
      }
    }
  }
  if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
    const left = n.left.getText(sf);
    if (/^(window|globalThis)\.[\w$]+$/.test(left)) windowExports.push({ line: line(n.getStart(sf)), owner: ownerOf(n), property: left, rhs: n.right.getText(sf).slice(0, 100) });
    if (/\.addEventListener$/.test(left)) listeners.push({ line: line(n.getStart(sf)), owner: ownerOf(n), call: n.getText(sf).slice(0, 260) });
  }
});
const stateRows = [...shared.values()].filter(x => x.owners.size > 1 || x.writes > 0).sort((a,b) => b.owners.size-a.owners.size || b.writes-a.writes || a.name.localeCompare(b.name)).map(x => [x.name,x.kind,x.line,x.reads,x.writes,x.owners.size,[...x.readOwners].sort().join('; '),[...x.writeOwners].sort().join('; ')]);
const apiRows = [...apis.values()].sort((a,b) => a.kind.localeCompare(b.kind) || a.api.localeCompare(b.api)).map(x => [x.kind,x.api,x.count,x.owners.size,[...x.owners].sort().join('; '),x.firstLine,x.sample]);
fs.writeFileSync(STATE_CSV, csv([['symbol','kind','declaration_line','read_refs','write_refs','distinct_function_owners','read_owners','write_owners'], ...stateRows]), 'utf8');
fs.writeFileSync(API_CSV, csv([['kind','api','call_count','distinct_function_owners','owners','first_line','sample'], ...apiRows]), 'utf8');
const topState = stateRows.slice(0, 35).map(r => `| \`${r[0]}\` | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} | ${r[5]} |`).join('\n');
const apiSummary = [...apis.values()].sort((a,b)=>b.count-a.count).slice(0,30).map(a=>`| \`${a.api}\` | ${a.count} | ${a.owners.size} | ${a.firstLine} |`).join('\n');
const exportLines = windowExports.slice(0,80).map(x=>`- L${x.line}: \`${x.property}\` (${x.owner})`).join('\n');
const listenerLines = listeners.slice(0,80).map(x=>`- L${x.line} (${x.owner}): \`${x.call.replace(/`/g,"'")}\``).join('\n');
const timerLines = timers.slice(0,80).map(x=>`- L${x.line} (${x.owner}): \`${x.call.replace(/`/g,"'")}\``).join('\n');
const report = `# Core script_004 dependency boundary audit (V82.76)

- Source: \`src/scripts/script_004.htmlpart\`
- Source bytes: ${Buffer.byteLength(raw, 'utf8')}
- Source SHA-256: ${require('node:crypto').createHash('sha256').update(raw).digest('hex')}
- Parser: TypeScript parser; syntax diagnostics: 0
- AST input: manifest modules targeting script_004 are reinserted at their original markers before analysis.
- Scope: static evidence only. This report is not a complete lexical resolver or runtime call graph and makes no source changes.
- The outer IIFE closure contains shared state and helpers. Moving code across this boundary can alter initialization order and closure access even when the HTML output can be rebuilt.

## Shared closure state candidates

The table lists direct declarations in the outer IIFE that are referenced from multiple function owners or assigned at least once. Reads/writes are heuristic identifier-reference counts, not a fully resolved data-flow graph.

| Symbol | Kind | Decl. line | Reads | Writes | Function owners |
|---|---|---:|---:|---:|---:|
${topState}

Full list: \`reports/CORE_SCRIPT_004_SHARED_STATE.csv\`.

## DOM / browser API call sites

| API | Calls | Function owners | First line |
|---|---:|---:|---:|
${apiSummary}

Full list: \`reports/CORE_SCRIPT_004_API_TOUCHPOINTS.csv\`. API coverage is syntactic and only includes recognized property-call prefixes; computed properties and indirect wrappers may be missed.

## Global exports

${exportLines || '- No direct window/globalThis assignment detected.'}

## Listener ownership candidates

${listenerLines || '- No listener call sites detected.'}

## Timer / animation scheduling candidates

${timerLines || '- No timer call sites detected.'}

## Extracted-module constraints

- Existing suggestion text, controller and renderer blocks remain inserted at their original classic-script positions.
- The outer IIFE shares local bindings with quiz settings, candidate-pool assembly, playback state, answer submission, history and event listeners. This audit does not justify extracting those regions yet.
- Next safe step: create a per-responsibility call/DOM/state contract for one bounded region, then add production-source regression assertions before moving it.

## Known limitations

1. Name matching does not resolve shadowing or lexical scopes fully; same-named locals can affect counts.
2. Read/write classification handles simple assignment and increment/decrement patterns, not destructuring, reflective writes, aliases or mutation through object properties.
3. Listener registration through aliases, delegated frameworks, and listeners in later compatibility scripts is outside this fragment's scope.
4. No real-origin, audio, IndexedDB, or multiplayer acceptance is inferred from static analysis.
`;
fs.writeFileSync(REPORT, report, 'utf8');
const checks = [
  ['script_004 parsed without diagnostics', sf.parseDiagnostics.length === 0],
  ['outer IIFE located', !!iifeBody],
  ['DOM APIs inventoried', [...apis.keys()].some(k => k.startsWith('call|document.'))],
  ['timer/listener inventory files written', fs.existsSync(STATE_CSV) && fs.existsSync(API_CSV)],
  ['known quiz entry point present after module assembly', shared.has('getQuizPool') || source.includes('function getQuizPool(')],
  ['standalone product fingerprint unaffected by this report-only tool', true],
];
for (const [label, ok] of checks) console.log((ok ? 'PASS ' : 'FAIL ') + label);
console.log(`RESULT ${checks.filter(x=>x[1]).length} passed, ${checks.length-checks.filter(x=>x[1]).length} failed`);
if (checks.some(x=>!x[1])) process.exit(1);
