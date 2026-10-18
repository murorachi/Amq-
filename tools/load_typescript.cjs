'use strict';
// Resolve the pinned TypeScript parser from the local install or npm's global package root.
// Do not bind the audit/test suite to one machine's absolute Node installation path.
const path = require('node:path');
const { execFileSync } = require('node:child_process');

function loadTypeScript() {
  try {
    return require('typescript');
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
  }

  const roots = [];
  if (process.env.TYPESCRIPT_PATH) roots.push(process.env.TYPESCRIPT_PATH);
  if (process.env.NODE_PATH) roots.push(...process.env.NODE_PATH.split(path.delimiter).filter(Boolean));
  try {
    roots.push(execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim());
  } catch (error) {
    // The final error below includes the setup command needed in CI/development.
  }

  for (const root of [...new Set(roots)]) {
    for (const candidate of [
      path.join(root, 'typescript'),
      path.join(root, 'typescript', 'lib', 'typescript.js'),
      root
    ]) {
      try {
        return require(candidate);
      } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND' && error.code !== 'ERR_REQUIRE_ESM') throw error;
      }
    }
  }
  throw new Error('TypeScript parser not found. Install the pinned dependency with: npm install --global typescript@5.8.3');
}

module.exports = loadTypeScript();
