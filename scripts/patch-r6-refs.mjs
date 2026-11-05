import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const reps = [
  ["checkoutPath('r6')", "checkoutPath('apex')"],
  ['checkoutPath("r6")', 'checkoutPath("apex")'],
  [/\bR6 product catalog\b/g, 'Apex product catalog'],
  [/\bR6 products hub\b/g, 'Apex products hub'],
  [/\bR6 setup guides\b/g, 'Apex setup guides'],
  [/\bR6 community forum\b/g, 'Apex community forum'],
  [/\bR6 catalog\b/g, 'Apex catalog'],
  [/\bR6 blog guides\b/g, 'Apex blog guides'],
  [/\bR6 shop\b/g, 'Apex cheats shop'],
  [/\bR6 practice guides\b/g, 'Apex Firing Range guides'],
  [/\bR6 tier\b/g, 'Apex tier'],
  [/\bR6 trainer\b/g, 'Apex Legends cheat'],
  [/\bR6 modules\b/g, 'Apex cheat modules'],
  [/\bR6 features\b/g, 'Apex cheat features'],
  [/\bR6 product hub\b/g, 'Apex product hub'],
  [/\bR6 multiplayer\b/g, 'Apex Legends multiplayer'],
  [/\br6 aimbot\b/g, 'apex aimbot'],
  [/\br6 ESP\b/g, 'apex ESP'],
  [/\br6 item ESP\b/g, 'apex item ESP'],
  [/\br6 no recoil\b/g, 'apex recoil control'],
  [/\br6 compatibility\b/g, 'apex compatibility'],
  [/\br6 multiplayer\b/g, 'apex multiplayer'],
  ['Competitive Siege focus', 'Competitive Apex focus'],
  ['operator tools', 'Legend tools'],
  ['onProductsR6Hub', 'onProductsApexHub'],
  ["return segment || 'r6'", "return segment || 'apex'"],
  ['const r6SystemRequirements', 'const apexSystemRequirements'],
  ['systemRequirements: r6SystemRequirements', 'systemRequirements: apexSystemRequirements'],
  ['Buy R6 PC', 'Buy Apex Legends PC'],
  ['FAQ – R6 tiers', 'FAQ – Apex tiers'],
  ['help on r6hacks', 'help on apexlegendcheats.net'],
  ['ZADEYO_R6_', 'ZADEYO_APEX_'],
  ['zadeyoR6ProductSeo', 'zadeyoApexProductSeo'],
  ['r6HacksLanding', 'apexLegendsCheatsLanding'],
  ['apexlegendcheats.net R6 product catalog', 'apexlegendcheats.net Apex product catalog'],
  ['go-r6-', 'go-apex-'],
  ['id={`go-r6-', 'id={`go-apex-'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|astro|mjs|txt|toml)$/.test(name)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes('patch-r6-refs.mjs') || file.includes('migrate-apex')) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) {
    text = typeof from === 'string' ? text.split(from).join(to) : text.replace(from, to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    changed++;
  }
}
console.log(`Patched ${changed} files.`);
