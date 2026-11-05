/**
 * One-time content migration: R6 template → Apex Legends (apexlegendcheats.net).
 * Run: node scripts/migrate-apex-content.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const TEXT_REPLACEMENTS = [
  ['https://r6hacks.org', 'https://apexlegendcheats.net'],
  ['r6hacks.org', 'apexlegendcheats.net'],
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frainbow-six-siege', 'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Fapex-legends'],
  ['/products/r6/', '/products/apex/'],
  ['/products/r6', '/products/apex'],
  ['/r6-hacks/', '/apex-legends-cheats/'],
  ['/r6-hacks', '/apex-legends-cheats'],
  ['/go/r6/', '/go/apex/'],
  ['/go/r6', '/go/apex'],
  ['Rainbow Six Siege', 'Apex Legends'],
  ['Rainbow Six', 'Apex Legends'],
  ['R6 Hacks', 'Apex Legends Cheats'],
  ['R6 hacks', 'Apex Legends cheats'],
  ['R6 hack', 'Apex Legends cheat'],
  ['r6 hacks', 'Apex Legends cheats'],
  ['r6 hack', 'Apex Legends cheat'],
  ['R6 Lite', 'Apex Lite'],
  ['R6 Pro', 'Apex Pro'],
  ['R6 Elite', 'Apex Elite'],
  ['BattlEye', 'Easy Anti-Cheat'],
  ['battleye', 'easy-anti-cheat'],
  ['Ubisoft', 'EA'],
  ['operator portal', 'customer portal'],
  ['Operator loadout', 'Legend loadout'],
  ['operator ESP', 'Legend ESP'],
  ['per-operator', 'per-Legend'],
  ['gadget ESP', 'item ESP'],
  ['Gadget ESP', 'Item ESP'],
  ['Training Grounds', 'Firing Range'],
  ['training grounds', 'Firing Range'],
  ['Shooting Range', 'Firing Range'],
  ['Team Deathmatch and Deathmatch', 'Battle Royale and Ranked'],
  ['Team Deathmatch', 'Battle Royale'],
  ['Deathmatch', 'Ranked'],
  ['reboot vans', 'respawn beacons'],
  ['reboot van', 'respawn beacon'],
  ['Vault Hunter', 'Legend'],
  ['Settlement fight', 'Apex combat'],
  ['Courtyard battle', 'Apex firefight'],
];

const SLUG_REPLACEMENTS = [
  ['buy-r6-hacks', 'buy-apex-legends-cheats'],
  ['buy-r6-cheats', 'buy-apex-legends-cheats'],
  ['r6-lite-vs-pro', 'apex-lite-vs-pro'],
  ['r6-practice-lobby', 'apex-firing-range-practice'],
  ['r6-training-tips', 'apex-training-tips'],
  ['r6-esp-setup', 'apex-esp-setup'],
  ['r6-radar', 'apex-radar'],
  ['r6-aimbot-ranked', 'apex-aimbot-ranked'],
  ['r6-aimbot-combat', 'apex-aimbot-combat'],
  ['r6-stream-proof', 'apex-stream-proof'],
  ['r6-elite', 'apex-elite-tier'],
  ['r6-features', 'apex-cheat-features'],
  ['r6-hwid-ban', 'apex-hwid-ban'],
  ['r6-external-hack-guide', 'apex-external-loader'],
  ['r6-external-loader', 'apex-external-loader'],
  ['r6-loadouts', 'apex-loadouts'],
  ['r6-hack-setup', 'apex-cheat-setup'],
  ['r6-console-commands', 'apex-practice-settings'],
  ['r6-hack-codes', 'apex-practice-settings'],
  ['enable-r6-console', 'apex-practice-settings-forum'],
  ['after-r6-patch', 'after-apex-patch'],
  ['r6-high-ground', 'apex-high-ground'],
  ['r6-aim-practice', 'apex-aim-practice'],
  ['r6-map-awareness', 'apex-map-awareness'],
  ['choose-tier', 'choose-apex-tier'],
  ['r6-cheats', 'apex-legends-cheats'],
  ['r6-hacks-features-guide', 'apex-cheat-features'],
  ['how-to-buy-r6-hacks-2026', 'buy-apex-legends-cheats'],
  ['battleye-patch', 'eac-patch-day'],
  ['battleye-fix', 'eac-troubleshooting'],
  ['battleye-verify', 'eac-verify'],
];

const EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.txt',
  '.xml',
  '.svg',
  '.toml',
  '.md',
]);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(path.extname(name))) files.push(full);
  }
  return files;
}

function applyReplacements(content) {
  let out = content;
  for (const [from, to] of SLUG_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  for (const [from, to] of TEXT_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  // Remaining path segments
  out = out.replace(/\/blog\/r6-/g, '/blog/apex-');
  out = out.replace(/slug: "r6-/g, 'slug: "apex-');
  out = out.replace(/slug: 'r6-/g, "slug: 'apex-");
  out = out.replace(/cheatImageForSlug\('r6-/g, "cheatImageForSlug('apex-");
  out = out.replace(/cheatImageForSlug\("r6-/g, 'cheatImageForSlug("apex-');
  out = out.replace(/productRelatedBlogSlugs[\s\S]*?};/m, (block) =>
    block.replace(/'r6-/g, "'apex-").replace(/"r6-/g, '"apex-'),
  );
  return out;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  if (file.includes('migrate-apex-content.mjs')) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyReplacements(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed++;
  }
}

console.log(`Updated ${changed} files.`);
