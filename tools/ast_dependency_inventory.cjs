#!/usr/bin/env node
'use strict';
// Parser-backed static dependency inventory. This is an evidence generator, not a source rewriter.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('./load_typescript.cjs');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'reports');
const SCRIPT_DIR = path.join(ROOT,'src','scripts');
const MODULE_DIR = path.join(ROOT,'src','modules');
const DEFAULT_TARGETS = fs.readdirSync(SCRIPT_DIR).filter(x=>/^script_\d+\.htmlpart$/.test(x)).sort().concat(fs.readdirSync(MODULE_DIR).filter(x=>/\.(?:js|htmlpart)$/.test(x)).sort());
const TARGETS = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_TARGETS;
const csv = rows => rows.map(row => row.map(v => { const s=String(v ?? ''); return /[",\n\r]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; }).join(',')).join('\n')+'\n';
const stripHtml = s => s.replace(/^\s*<script\b[^>]*>/i,'').replace(/<\/script>\s*$/i,'').replace(/<!--\s*(AMQ_SPLIT_MODULE:[\w-]+)\s*-->/g, '// $1');
const allRows = [], defRows = [], callRows = [], globalsRows = [], diagnosticsRows = [], summaryRows=[];
function visit(node, fn) { fn(node); ts.forEachChild(node, child => visit(child, fn)); }
function lineAt(sf, pos) { return sf.getLineAndCharacterOfPosition(Math.max(0,pos)).line+1; }
function isFunctionLike(n) { return ts.isFunctionDeclaration(n)||ts.isFunctionExpression(n)||ts.isArrowFunction(n)||ts.isMethodDeclaration(n)||ts.isGetAccessor(n)||ts.isSetAccessor(n); }
function nameOf(n,sf) {
 if (n.name && (ts.isIdentifier(n.name)||ts.isStringLiteral(n.name)||ts.isNumericLiteral(n.name))) return n.name.text;
 if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) return n.name.text;
 return '<anonymous>';
}
function functionNodeForDeclaration(n) { return n.initializer && (ts.isArrowFunction(n.initializer)||ts.isFunctionExpression(n.initializer)) ? n.initializer : null; }
for (const base of TARGETS) {
 const scriptFile = path.join(SCRIPT_DIR,base);
 const moduleFile = path.join(MODULE_DIR,base);
 const file = fs.existsSync(scriptFile) ? scriptFile : moduleFile;
 if (!fs.existsSync(file)) { console.error('Missing source fragment/module',base); process.exitCode=1; continue; }
 const raw=fs.readFileSync(file,'utf8');
 const typeMatch=raw.match(/<script\b[^>]*\btype=[\"']([^\"']+)[\"']/i);
 const dataOnly=!!typeMatch && /^(application\/json|application\/octet-stream)$/i.test(typeMatch[1]);
 const source=stripHtml(raw);
 const sf=ts.createSourceFile(base,dataOnly?'':source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
 const parseDiags=sf.parseDiagnostics||[];
 for (const d of parseDiags) diagnosticsRows.push([base,lineAt(sf,d.start||0),ts.flattenDiagnosticMessageText(d.messageText,' '),source.slice(Math.max(0,(d.start||0)-90),Math.min(source.length,(d.start||0)+140)).replace(/\s+/g,' ')]);
 const declarations = new Map();
 const functions=[];
 const parentOf = new WeakMap();
 function mapParents(node,parent=null){ if(parent) parentOf.set(node,parent); ts.forEachChild(node,child=>mapParents(child,node)); }
 mapParents(sf);
 function enclosingFunction(node){ let p=parentOf.get(node); while(p){ if(isFunctionLike(p)){
   if(ts.isFunctionDeclaration(p)&&p.name) return p.name.text;
   if(ts.isVariableDeclaration(p)&&ts.isIdentifier(p.name)) return p.name.text;
   return '<anonymous@'+lineAt(sf,p.getStart(sf))+ '>';
  } p=parentOf.get(p); } return '<top-level>'; }
 visit(sf,n=>{
  if(ts.isFunctionDeclaration(n)&&n.name&&n.body) functions.push({name:n.name.text,node:n,body:n.body,kind:'function',owner:enclosingFunction(n)});
  if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name)){
   declarations.set(n.name.text,{kind:'variable',node:n,top:enclosingFunction(n)==='<top-level>'});
   const f=functionNodeForDeclaration(n);
   if(f&&f.body) functions.push({name:n.name.text,node:n,body:f.body,kind:ts.isArrowFunction(f)?'arrow':'function-expression',owner:enclosingFunction(n)});
  }
 });
 visit(sf,n=>{ if(ts.isFunctionDeclaration(n)&&n.name) declarations.set(n.name.text,{kind:'function',node:n,top:enclosingFunction(n)==='<top-level>'}); });
 const fnNames = new Set(functions.map(f=>f.name));
 // Record named function definitions and direct identifier call edges within each lexical body.
 for (const f of functions) {
  const start=f.node.getStart(sf), end=f.node.end;
  defRows.push([base,f.name,f.kind,lineAt(sf,start),start,end, f.body?Buffer.byteLength(source.slice(f.body.pos,f.body.end),'utf8'):0]);
  if (!f.body) continue;
  const calls=new Map(), globals=new Map(), api=new Map();
  const localNames=new Set();
  visit(f.body,n=>{
   if ((ts.isParameter(n)||ts.isVariableDeclaration(n)||ts.isFunctionDeclaration(n)||ts.isClassDeclaration(n))&&n.name&&ts.isIdentifier(n.name)) localNames.add(n.name.text);
  });
  visit(f.body,n=>{
   if (ts.isCallExpression(n)) {
    const e=n.expression;
    if(ts.isIdentifier(e)) calls.set(e.text,(calls.get(e.text)||0)+1);
    else if(ts.isPropertyAccessExpression(e)) {
     const txt=e.expression.getText(sf)+'.'+e.name.text;
     if(/^(window|document|localStorage|sessionStorage|indexedDB|navigator|location|history|console)\./.test(txt)) api.set(txt,(api.get(txt)||0)+1);
    }
   }
   if (ts.isIdentifier(n) && n.parent && ts.isPropertyAccessExpression(n.parent) && n.parent.name===n) return;
   if (ts.isIdentifier(n) && declarations.has(n.text) && !localNames.has(n.text)) globals.set(n.text,(globals.get(n.text)||0)+1);
  });
  for (const [callee,count] of calls) callRows.push([base,f.name,callee,count,fnNames.has(callee)?'same-file function':'unresolved/external/global']);
  for (const [name,count] of globals) globalsRows.push([base,f.name,name,count,declarations.get(name).kind]);
  for (const [name,count] of api) allRows.push([base,f.name,'API_CALL',name,count]);
 }
 // Capture top-level global exports, direct DOM/storage/lifecycle operations, and data payload statement size.
 let dataStmt=null;
 for(const st of sf.statements) {
  const txt=st.getText(sf);
  if (/^let\s+DB\s*=/.test(txt)) dataStmt=st;
  visit(st,n=>{
   if(ts.isBinaryExpression(n) && n.operatorToken.kind===ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(n.left)) {
    const lhs=n.left.getText(sf);
    if(/^(window|globalThis|document)\./.test(lhs)) allRows.push([base,'<top-level>','PROPERTY_WRITE',lhs,1]);
   }
   if(ts.isCallExpression(n)) {
    const e=n.expression;
    if(ts.isPropertyAccessExpression(e)) {
     const txt=e.expression.getText(sf)+'.'+e.name.text;
     if(/^(document|localStorage|sessionStorage|indexedDB|window)\./.test(txt) || /\.(addEventListener|removeEventListener|setTimeout|setInterval|clearTimeout|clearInterval|requestAnimationFrame|cancelAnimationFrame)$/.test(txt)) allRows.push([base,'<top-level>','API_CALL',txt,1]);
    }
   }
  });
 }
 if (dataStmt) {
  const rhs=dataStmt.declarationList.declarations[0]?.initializer;
  let dbShape='';
  if(rhs&&ts.isObjectLiteralExpression(rhs)) {
   dbShape=rhs.properties.map(p=>ts.isPropertyAssignment(p)?p.name.getText(sf):ts.SyntaxKind[p.kind]).join('|');
   for(const prop of rhs.properties) if(ts.isPropertyAssignment(prop)&&(ts.isIdentifier(prop.name)||ts.isStringLiteral(prop.name))&&ts.isArrayLiteralExpression(prop.initializer)) allRows.push([base,'<top-level>','DB_DATA_ARRAY',prop.name.text,prop.initializer.elements.length]);
  }
  allRows.push([base,'<top-level>','LARGE_DATA_INITIALIZER','DB',Buffer.byteLength(source.slice(dataStmt.getStart(sf),dataStmt.end),'utf8')]);
  allRows.push([base,'<top-level>','DB_TOP_LEVEL_KEYS',dbShape, rhs&&ts.isObjectLiteralExpression(rhs)?rhs.properties.length:0]);
 }
 summaryRows.push([base,Buffer.byteLength(raw,'utf8'),Buffer.byteLength(source,'utf8'),parseDiags.length,sf.statements.length,functions.length,dataStmt?Buffer.byteLength(source.slice(dataStmt.getStart(sf),dataStmt.end),'utf8'):0,dataOnly?'DATA_BLOCK':(parseDiags.length?'PARSE_DIAGNOSTIC':'PARSED')]);
}
fs.writeFileSync(path.join(OUT,'AST_FUNCTION_DEFINITIONS.csv'),csv([['fragment','function','kind','line','start_offset_utf16','end_offset_utf16','body_bytes_utf8'],...defRows]));
fs.writeFileSync(path.join(OUT,'AST_DECLARED_SYMBOL_REFERENCES.csv'),csv([['fragment','function','referenced_top_level_symbol','occurrences','symbol_kind'],...globalsRows]));
fs.writeFileSync(path.join(OUT,'AST_API_TOUCHPOINTS.csv'),csv([['fragment','owner','kind','api_or_property','count'],...allRows]));
fs.writeFileSync(path.join(OUT,'AST_PARSE_DIAGNOSTICS.csv'),csv([['fragment','line','diagnostic','context'],...diagnosticsRows]));
// Resolve direct identifier calls against definitions across all parsed fragments.
const defsByName = new Map(); for(const r of defRows){const name=r[1],fragment=r[0];if(!defsByName.has(name))defsByName.set(name,new Set());defsByName.get(name).add(fragment);}
for(const r of callRows){const matches=defsByName.get(r[2]);r[4]=!matches?'unresolved/external/global':(matches.size===1?(matches.has(r[0])?'same-file definition':'cross-fragment definition'):'ambiguous duplicate name: '+[...matches].join(';'));}
fs.writeFileSync(path.join(OUT,'AST_DIRECT_CALL_EDGES.csv'),csv([['fragment','caller','callee','call_count','resolution'],...callRows]));
fs.writeFileSync(path.join(OUT,'AST_DEPENDENCY_SUMMARY.csv'),csv([['fragment','raw_bytes','parsed_source_bytes','parse_diagnostics','top_level_statements','function_definitions_all_scopes','large_data_initializer_bytes','status'],...summaryRows]));
const totalFunctions=defRows.length, parsedCount=summaryRows.filter(r=>r[7]==='PARSED').length, dataCount=summaryRows.filter(r=>r[7]==='DATA_BLOCK').length, diagCount=summaryRows.reduce((n,r)=>n+Number(r[3]),0);
const resCount={}; for(const r of callRows){const k=r[4].startsWith('ambiguous')?'ambiguous':r[4];resCount[k]=(resCount[k]||0)+1;}
const s001=summaryRows.find(r=>r[0]==='script_001.htmlpart'), s004=summaryRows.find(r=>r[0]==='script_004.htmlpart');
const dbRows=allRows.filter(r=>r[0]==='script_001.htmlpart'&&r[2]==='DB_DATA_ARRAY');
const focusEdges=callRows.filter(r=>r[0]==='script_004.htmlpart'&&(r[4]==='cross-fragment definition'||r[4].startsWith('ambiguous'))).slice(0,40);
const lines=['# Parser-backed dependency inventory (V82.69)','',
'Generated by `node tools/ast_dependency_inventory.cjs` using the TypeScript JavaScript parser. This is static analysis only; it does not execute the app or authorize automatic source movement.','',
'## Parse coverage','',
`- Script/data fragments and source modules scanned: ${summaryRows.length} (41 scripts/data + ${summaryRows.length-41} modules)`,
`- Executable JS fragments/modules parsed without syntax diagnostics: ${parsedCount}`, 
`- Non-executable data blocks intentionally excluded from JS parsing: ${dataCount} (script_030 JSON map, script_037 compressed EMQ payload)`,
`- Parser diagnostics in executable fragments: ${diagCount}`,
`- Function declarations / named function-valued variables across scopes: ${totalFunctions}`,
`- Direct identifier-call edge records: ${callRows.length}; counts: ${Object.entries(resCount).map(([k,v])=>`${k} ${v}`).join(', ')}.`,
'',
'## Critical findings','',
`- \`script_001.htmlpart\` is ${Number(s001[1]).toLocaleString()} bytes. Its top-level \`DB\` initializer occupies ${Number(s001[6]).toLocaleString()} bytes and has top-level keys \`anime\` and \`songs\`. Parsed row counts: ${dbRows.map(r=>`${r[3]} ${Number(r[4]).toLocaleString()}`).join(', ')}. The remaining ${Number(s001[1])-Number(s001[6])} bytes contain executable initialization and functions; therefore the whole fragment is **not** a pure data asset.`,
`- \`script_001.htmlpart\` includes history/status persistence and other runtime functions after the DB initializer. Data extraction must target only the initializer and preserve exact bytes/order, while leaving executable code at its current execution point until dependencies are verified.`,
`- \`script_004.htmlpart\` is ${Number(s004[1]).toLocaleString()} bytes and contains ${s004[5]} named function/function-valued definitions within its application IIFE. It mixes quiz setup, settings, candidate-pool assembly, answer suggestions, playback/answer settlement and timers.`,
`- Among direct identifier calls recorded from script_004, ${callRows.filter(r=>r[0]==='script_004.htmlpart'&&r[4]==='cross-fragment definition').length} resolve to a unique definition in another fragment, ${callRows.filter(r=>r[0]==='script_004.htmlpart'&&r[4].startsWith('ambiguous')).length} match names defined in multiple fragments, and ${callRows.filter(r=>r[0]==='script_004.htmlpart'&&r[4]==='unresolved/external/global').length} remain external/global/unresolved. The ambiguous names require lexical and runtime review; they are not proof of duplicated behavior.`,
'- script_030 is a JSON data block (AniList ID map), and script_037 is a compressed EMQ payload block. They should be tracked as data assets, not parsed as JavaScript modules.',
'',
'## script_004 cross-fragment and ambiguous direct-call leads','',
'| Caller | Callee | Parser classification |', '|---|---|---|',
...focusEdges.map(r=>`| \`${r[1]}\` | \`${r[2]}\` | ${r[4]} |`),
'',
'## Safe next extraction candidate','',
'Before moving a responsibility, add a production-source contract test and confirm all direct calls plus DOM/global/storage effects. The parser output suggests investigating the quiz-answer normalization/suggestion helper cluster first because it is smaller and more bounded than `getQuizPool`, playback, or `submitQuiz`; do not extract it until the test captures Unicode normalization, source offsets, highlight ranges, suggestion ordering, and UI interaction behavior.',
'',
'## Limitations','',
'- Direct identifier calls only; property-based calls (`window.api.method`), callbacks passed by reference, dynamic property names, reflection, event dispatch, DOM selector relationships and indirect calls are not a complete call graph.',
'- Name resolution is fragment-level, not a full lexical/module symbol resolver. Same-name candidates are reported as ambiguous rather than guessed.',
'- Identifier-reference inventory is a search aid, not a sound proof of global reads/writes or variable liveness.',
'- Listener/timer/storage APIs are syntactic touchpoints; ownership and cleanup guarantees require manual tracing and runtime tests.',
'- Source code may now include extracted helper modules; this inventory does not move source code itself.'];
fs.writeFileSync(path.join(OUT,'AST_DEPENDENCY_MAP.md'),lines.join('\n')+'\n');
console.log(csv([['fragment','raw_bytes','parse_diagnostics','top_level_statements','function_definitions_all_scopes','large_data_initializer_bytes','status'],...summaryRows]));
if(diagCount) process.exitCode=1;
