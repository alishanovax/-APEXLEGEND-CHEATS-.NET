import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'src');
const REPLACEMENTS = [
  ['Rainbow Six Siege and EAC receive', 'Rainbow Six Siege and BattlEye receive'],
  ['Easy Anti-Hack or Rainbow Six Siege', 'BattlEye or Rainbow Six Siege'],
  ['Easy Anti-Hack', 'BattlEye'],
  ['Easy Anti-Hack', 'BattlEye'],
  ['EAC patch-day', 'BattlEye patch-day'],
  ['After EAC Ban', 'After BattlEye ban'],
  ['EAC and report', 'BattlEye and report'],
  ['EAC does not', 'BattlEye does not'],
  ['EAC risk', 'BattlEye risk'],
  ['account-only EAC', 'account-only BattlEye'],
  ['EAC cases', 'BattlEye cases'],
  ['EAC bans', 'BattlEye bans'],
  ['EAC ban', 'BattlEye ban'],
  ['EAC Unable to verify', 'BattlEye connection issues on'],
  ['EAC cannot verify', 'BattlEye cannot verify'],
  ['if EAC cannot', 'if BattlEye cannot'],
  ['from the loader or Steam', 'from the loader or Ubisoft Connect'],
  ['launch Rainbow Six Siege on Steam', 'launch Rainbow Six Siege through Ubisoft Connect'],
  ['Rainbow Six Siege on Steam', 'Rainbow Six Siege on PC'],
  ['for Steam players', 'for PC players'],
  ['on Steam PC', 'on PC'],
  ['Steam PC', 'PC'],
  ['Steam platform', 'PC platform'],
  ['Gearbox, 2K and Steam', 'Ubisoft'],
  ['Steam locker', 'in-game inventory'],
  ['Steam inventory', 'in-game inventory'],
  ['Steam review', 'Ubisoft review'],
  ['Steam restrictions', 'Ubisoft account restrictions'],
  ['Steam ban appeals', 'Ubisoft ban appeals'],
  ['Steam game file verification', 'Ubisoft Connect file verification'],
  ['through Steam', 'through Ubisoft Connect'],
  ['normal Steam launch', 'normal Ubisoft Connect launch'],
  ['into the Steam folder', 'into the game folder'],
  ['Loot-shooter action on Steam', 'Tactical shooter action on PC'],
  ['Mw4 Hacks', 'R6 Hacks'],
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (/\.(ts|astro)$/.test(e.name)) out.push(f);
  }
  return out;
}

let n = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [a, b] of REPLACEMENTS) after = after.split(a).join(b);
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
  }
}
console.log(`Platform cleanup: ${n} files.`);
