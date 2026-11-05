/**
 * Apply canonical short slugs in content (run once after editing slug-redirects.mjs).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const REPLACEMENTS = [
  ['/products/apex-hacks/', '/products/apex/'],
  ['products/apex-legends-cheats/', 'products/r6/'],

  ['apex-cheat-features', 'apex-cheat-features'],
  ['apex-practice-settings-guide', 'apex-firing-range-practice'],
  ['r6-console-hacks-tips', 'apex-training-tips'],
  ['how-to-use-apex-practice-settings', 'apex-cheat-setup'],
  ['apex-practice-settings-hacks', 'apex-practice-settings'],
  ['how-to-buy-apex-legends-cheats-2026', 'buy-apex-legends-cheats'],
  ['r6-hwid-spoofer-after-ban', 'apex-hwid-ban'],
  ['apex-radar-hack-guide', 'apex-radar'],
  ['apex-external-loader', 'apex-external-loader'],
  ['r6-esp-wallhack-setup', 'apex-esp-setup'],
  ['apex-stream-proof-setup', 'apex-stream-proof'],
  ['apex-aimbot-ranked-guide', 'apex-aimbot-ranked'],
  ['apex-aimbot-combat-guide', 'apex-aimbot-combat'],
  ['apex-elite-tier-tier-guide', 'apex-elite-tier'],
  ['r6-skin-changer-guide', 'apex-loadouts'],
  ['eac-patch-day-day-checklist', 'eac-patch-day'],
  ['easy-anti-cheat-r6-guide', 'eac-troubleshooting'],

  ['can-custom-lobby-hack-codes-be-used-in-ranked', 'lobby-codes-ranked'],
  ['how-to-enable-the-r6-console', 'apex-practice-settings-forum'],
  ['practice-apex-high-ground-safely', 'apex-high-ground'],
  ['what-to-check-after-a-r6-patch', 'after-apex-patch'],
  ['r6-lite-or-pro-tier-comparison', 'lite-vs-pro'],
  ['how-to-learn-weapon-aim-in-creative', 'apex-aim-practice'],
  ['what-does-apex-map-awareness-include', 'apex-map-awareness'],
  ['how-to-set-up-map-overlay', 'map-overlay-setup'],
  ['what-zoom-settings-are-comfortable', 'camera-zoom'],
  ['how-to-tune-script-delay-settings', 'aimbot-delay'],
  ['how-to-practice-auto-combos', 'aimbot-practice'],
  ['what-is-in-the-elite-tier', 'elite-tier-tools'],
  ['how-do-lite-and-pro-differ', 'lite-pro-diff'],
  ['what-to-know-about-skin-changer', 'loadout-tools'],
  ['what-to-do-if-eac-cannot-verify', 'eac-verify'],
  ['how-does-an-external-loader-work', 'external-loader'],
  ['how-to-check-stream-proof-capture', 'stream-proof-obs'],
  ['what-to-do-after-hwid-change', 'after-hwid-change'],
  ['what-to-check-before-installing-tools', 'before-install'],
  ['how-to-choose-r6-product-tier', 'choose-apex-tier'],
];

const SKIP = new Set(['node_modules', '.git', 'dist']);
const EXTS = new Set(['.ts', '.astro', '.mjs', '.json', '.md', '.txt', '.webmanifest']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (EXTS.has(path.extname(e.name))) out.push(f);
  }
  return out;
}

let n = 0;
for (const file of walk(root)) {
  if (file.includes('apply-short-slugs.mjs')) continue;
  if (file.includes('slug-redirects.mjs')) continue;
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [a, b] of REPLACEMENTS) {
    if (after.includes(a)) after = after.split(a).join(b);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
    console.log(path.relative(root, file));
  }
}

const fromDir = path.join(root, 'src', 'pages', 'products', 'r6-hacks');
const toDir = path.join(root, 'src', 'pages', 'products', 'r6');
if (fs.existsSync(fromDir) && !fs.existsSync(toDir)) {
  fs.renameSync(fromDir, toDir);
  console.log('renamed pages/products/apex-hacks → r6');
}

console.log(`Updated ${n} files.`);
