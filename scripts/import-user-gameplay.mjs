/**
 * Copy user hack screenshots (long Windows paths) into public/images,
 * then write SEO-named PNGs for gameplay + blog.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir =
  'C:\\Users\\3Tee System\\.cursor\\projects\\c-Users-3Tee-System-Downloads-r6hacks-org-main\\assets';
const importDir = path.resolve('_import');
const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');

/** Skip Valorant screenshot only. */
const SKIP_SUBSTRINGS = ['065800-cb09d0b5'];

const GAMEPLAY = [
  { file: 'r6-esp-wallhack.png', alt: 'Rainbow Six Siege ESP wallhack hack gameplay with player boxes distance tags and aimbot FOV' },
  { file: 'r6-aimbot-combat.png', alt: 'Rainbow Six Siege aimbot hack gameplay with FOV circle and green skeleton ESP on enemy' },
  { file: 'r6-player-esp.png', alt: 'Rainbow Six Siege player ESP wallhack showing skeletons boxes and distance meters' },
  { file: 'r6-radar-hack.png', alt: 'Rainbow Six Siege radar and ESP overlay with enemy name tags health and range markers' },
  { file: 'r6-auto-aim.png', alt: 'Rainbow Six Siege sniper aimbot hack with green ESP box weapon label and FOV circle' },
  { file: 'r6-loot-radar.png', alt: 'Rainbow Six Siege loot and weapon ESP gameplay with enemy boxes and distance trackers' },
  { file: 'r6-skin-changer.png', alt: 'Rainbow Six Siege hack gameplay with chams skeleton ESP and aim lock on pier' },
  { file: 'r6-thermal-esp.png', alt: 'Rainbow Six Siege thermal vision ESP showing skeleton wallhack HP and distance' },
  { file: 'r6-build-fight-esp.png', alt: 'Rainbow Six Siege build fight ESP wallhack with names HP bars and FOV circle' },
  { file: 'r6-arena-wallhack.png', alt: 'Rainbow Six Siege arena wallhack ESP with wireframe players and weapon tags' },
  { file: 'r6-spawn-island-esp.png', alt: 'Rainbow Six Siege spawn island ESP with skeleton boxes and aimbot reticle' },
  { file: 'r6-long-range-esp.png', alt: 'Rainbow Six Siege long range ESP wallhack with enemy names health and weapons' },
  { file: 'r6-aimbot-lock.png', alt: 'Rainbow Six Siege aimbot lock with green skeleton ESP FOV circle and head priority' },
  { file: 'r6-chams-esp.png', alt: 'Rainbow Six Siege chams and skeleton ESP hack on wooden pier' },
  { file: 'r6-squad-esp.png', alt: 'Rainbow Six Siege multi-player ESP wallhack with boxes skeletons and distances' },
  { file: 'r6-combat-esp.png', alt: 'Rainbow Six Siege combat ESP and aimbot overlay in open field fight' },
];

const BLOG = [
  'r6-practice-lobby.png',
  'r6-training-tips.png',
  'r6-hack-setup.png',
  'r6-features.png',
  'r6-console-commands.png',
  'r6-lite-vs-pro.png',
  'r6-elite.png',
  'r6-aimbot-ranked.png',
  'r6-esp-setup.png',
  'r6-radar-hack-guide.png',
  'r6-loadouts.png',
  'eac-patch-day-checklist.png',
  'r6-hwid-ban.png',
  'buy-r6-hacks.png',
  'r6-aimbot-combat.png',
  'eac-bypass-r6-guide.png',
  'r6-external-loader.png',
  'r6-stream-proof.png',
];

function longPath(p) {
  const resolved = path.resolve(p);
  if (resolved.startsWith('\\\\?\\')) return resolved;
  return `\\\\?\\${resolved}`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listAssetPngs() {
  const entries = fs.readdirSync(longPath(assetsDir));
  return entries
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .filter((f) => !SKIP_SUBSTRINGS.some((s) => f.includes(s)))
    .sort();
}

async function writeResizedPng(src, dest) {
  const buf = await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  console.log('wrote', path.relative(process.cwd(), dest), buf.length);
}

ensureDir(importDir);
ensureDir(gameplayDir);
ensureDir(blogDir);

const sources = listAssetPngs();
console.log(`Found ${sources.length} source screenshots`);

const shortFiles = [];
for (let i = 0; i < sources.length; i++) {
  const name = sources[i];
  const short = `shot-${String(i + 1).padStart(2, '0')}.png`;
  const from = longPath(path.join(assetsDir, name));
  const to = path.join(importDir, short);
  fs.copyFileSync(from, to);
  shortFiles.push(to);
  console.log('copied', short, '←', name.slice(-40));
}

if (!shortFiles.length) {
  console.error('No screenshots copied.');
  process.exit(1);
}

const alts = [];
for (let i = 0; i < GAMEPLAY.length; i++) {
  const src = shortFiles[i % shortFiles.length];
  const dest = path.join(gameplayDir, GAMEPLAY[i].file);
  await writeResizedPng(src, dest);
  alts.push({ file: GAMEPLAY[i].file, alt: GAMEPLAY[i].alt, srcIndex: i % shortFiles.length });
}

for (let i = 0; i < BLOG.length; i++) {
  // Offset so blog covers prefer different frames than gameplay slots when possible
  const src = shortFiles[(i + 3) % shortFiles.length];
  await writeResizedPng(src, path.join(blogDir, BLOG[i]));
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'gameplay-image-alts.json'),
  JSON.stringify({ gameplay: alts, sourceCount: shortFiles.length }, null, 2),
);

console.log('Done. Next: npm run optimize:images');
