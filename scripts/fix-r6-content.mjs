/**
 * Post-rebrand cleanup: R6-specific terminology in src/
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'src');

const REPLACEMENTS = [
  ['Rainbow Six Siege or EAC update', 'Rainbow Six Siege or BattlEye update'],
  ['Rainbow Six Siege or EAC updates', 'Rainbow Six Siege or BattlEye updates'],
  ['Rainbow Six Siege or EAC', 'Rainbow Six Siege or BattlEye'],
  ['after EAC patches', 'after BattlEye patches'],
  ['EAC patches', 'BattlEye patches'],
  ['EAC update', 'BattlEye update'],
  ['EAC updates', 'BattlEye updates'],
  ['EAC ban', 'BattlEye ban'],
  ['EAC bans', 'BattlEye bans'],
  ['EAC penalties', 'BattlEye penalties'],
  ['EAC issues', 'BattlEye issues'],
  ['EAC Unable to Verify Rainbow Six Siege', 'BattlEye connection issues on Rainbow Six Siege'],
  ['eac verification', 'BattlEye verification'],
  ['eac fix', 'BattlEye fix'],
  ['EAC patch day', 'BattlEye patch day'],
  ['EAC bypass', 'BattlEye compatibility'],
  ['eac-bypass-r6-guide', 'battleye-fix'],
  ['eac-patch-day-checklist', 'battleye-patch'],
  ['Hajin DMZ', 'Training Grounds'],
  ['6v6', 'Ranked'],
  ['Ground War', 'Unranked'],
  ['Gunfight', 'Quick Match'],
  ['DMZ loot', 'Gadget ESP'],
  ['Hajin DMZ loot', 'Gadget ESP'],
  ['armor plates', 'operator health'],
  ['armor', 'health'],
  ['Steam client', 'Ubisoft Connect'],
  ['launch Modern Warfare 4 on Steam', 'launch Rainbow Six Siege through Ubisoft Connect'],
  ['Modern Warfare 4 on Steam', 'Rainbow Six Siege on PC'],
  ['Steam accounts', 'Ubisoft accounts'],
  ['Steam account', 'Ubisoft account'],
  ['Loadout Changer', 'Operator loadout tools'],
  ['Ricochet', 'BattlEye'],
  ['ZADEYO_MW4_PRODUCT_SEO', 'ZADEYO_R6_PRODUCT_SEO'],
  ['mw4SystemRequirements', 'r6SystemRequirements'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|astro|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== text) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(path.relative(process.cwd(), file));
  }
}
console.log(`Updated ${changed} files.`);
