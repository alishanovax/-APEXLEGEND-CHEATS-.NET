import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['R6Hacks Editorial', 'R6 Hacks'],
  ['R6Hacks Community Forum', 'R6 Hacks Forum'],
  ['R6Hacks Blog', 'R6 Hacks Blog'],
  ['R6Hacks Support', 'R6 Hacks Support'],
  ['Join R6Hacks on Discord', 'Join R6 Hacks on Discord'],
  ['R6Hacks home', 'R6 Hacks home'],
  ['R6Hacks', 'R6 Hacks'],
  ["TITLE_PREFIX = 'R6 Hacks & Tools'", "TITLE_PREFIX = 'R6 Hacks'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing ranked play with r6 aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'Ranked Rainbow Six Siege aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private r6 hacks for Windows PC Multiplayer and Deathmatch—not console lobby codes. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells R6 hacks for Windows PC Multiplayer and Deathmatch. Check status before you queue after a patch.',
  ],
  [
    'maintains private r6 hacks for Windows PC Multiplayer and Deathmatch. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells R6 hacks for Windows PC Multiplayer and Deathmatch. Check status before you queue after a patch.',
  ],
  [
    'maintains private r6 hacks for Windows PC Multiplayer and Deathmatch. Check live status before every patch-day queue.',
    'sells R6 hacks for Windows PC Multiplayer and Deathmatch. Check status before you queue after a patch.',
  ],
  [
    'maintains private r6 hacks for Windows PC Multiplayer and Deathmatch.',
    'sells R6 hacks for Windows PC Multiplayer and Deathmatch.',
  ],
  [
    'ships a modular external suite for Windows PC ranked—not lobby hack codes. Aimbot tracks targets, loot assist clears POIs, ESP wallhack exposes third-parties, and utility tools like Radar Hack and Loadout Changer round out the toolkit. This is the complete feature map across',
    'sells external R6 hacks for PC Ranked. Aimbot, loot assist, ESP wallhack, radar and Loadout Changer. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}
