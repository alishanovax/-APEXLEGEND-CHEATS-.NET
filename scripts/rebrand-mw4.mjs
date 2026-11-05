/**
 * Borderlands Hacks → MW4 Hack rebrand for mw4hack.org
 * Run from project root: node scripts/rebrand-mw4.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline', '_template']);

const PURCHASE_URL = 'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fmw4';

/** Ordered longest-first replacements. */
const REPLACEMENTS = [
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fborderlands-3', PURCHASE_URL],
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fbodycam', PURCHASE_URL],
  ['%2Fproducts%2Fborderlands-3', '%2Fproducts%2Fmw4'],
  ['%2Fproducts%2Fbodycam', '%2Fproducts%2Fmw4'],
  ['/products/borderlands-hacks', '/products/mw4-hacks'],
  ['products/borderlands-hacks', 'products/mw4-hacks'],
  ['/borderlands-hacks/', '/mw4-hacks/'],
  ['/borderlands-hacks', '/mw4-hacks'],
  ['borderlands-hacks/', 'mw4-hacks/'],
  ['borderlandscheats.com', 'mw4hack.org'],
  ['borderlandscheats-com', 'mw4hack-org'],
  ['BorderlandsCheats', 'Mw4Hack'],
  ['Borderlandscheats', 'Mw4hack'],
  ['borderlandscheats', 'mw4hack'],

  ['/go/borderlands/', '/go/mw4/'],
  ['/go/borderlands', '/go/mw4'],
  ['/go/bodycam/', '/go/mw4/'],
  ['/go/bodycam', '/go/mw4'],
  ["checkoutPath('borderlands')", "checkoutPath('mw4')"],
  ['checkoutPath("borderlands")', 'checkoutPath("mw4")'],
  ["product: 'borderlands'", "product: 'mw4'"],
  ['  borderlands:', '  mw4:'],
  ["'borderlands'", "'mw4'"],
  ['"borderlands"', '"mw4"'],
  ['BORDERLANDS_CHECKOUT_URL', 'MW4_CHECKOUT_URL'],
  ['borderlandsCheatsLanding', 'mw4CheatsLanding'],
  ['borderlands-hacks', 'mw4-hacks'],
  ['Borderlands Hacks', 'MW4 Hack'],
  ['Borderlands hacks', 'MW4 hacks'],
  ['borderlands hacks', 'mw4 hacks'],
  ['Borderlands Hack', 'MW4 hack'],
  ['borderlands hack', 'mw4 hack'],
  ['Borderlands Elite', 'MW4 Elite'],
  ['Borderlands Pro', 'MW4 Pro'],
  ['Borderlands Lite', 'MW4 Lite'],
  ['Borderlands 3', 'Modern Warfare 4'],
  ['borderlands 3', 'modern warfare 4'],
  ['Borderlands', 'Modern Warfare 4'],
  ['borderlands', 'mw4'],
  ['borderlandscheats-forum-vote:', 'mw4hack-forum-vote:'],
  ['TITLE_PREFIX = \'Borderlands Hacks\'', "TITLE_PREFIX = 'MW4 Hack'"],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameLandingFile() {
  const from = path.join(root, 'src', 'data', 'borderlandsCheatsLanding.ts');
  const to = path.join(root, 'src', 'data', 'mw4CheatsLanding.ts');
  if (fs.existsSync(from)) {
    const content = applyText(fs.readFileSync(from, 'utf8'));
    fs.writeFileSync(to, content);
    fs.unlinkSync(from);
    console.log('renamed borderlandsCheatsLanding.ts → mw4CheatsLanding.ts');
  }
}

renameLandingFile();

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.includes(`${path.sep}rebrand-mw4.mjs`)) continue;
  if (file.includes(`${path.sep}rebrand-borderlands.mjs`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
