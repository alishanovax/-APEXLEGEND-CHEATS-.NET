import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
const dirs = ['public/images'];

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const allowed = new Set([
    'r6-hack-aimbot-esp.png',
    'r6-hack-esp-wallhack.png',
    'r6-hack-gameplay.jpg',
    'r6-hack-esp-indoor.png',
  ]);
  const files = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        allowed.has(file) && /\.(png|jpe?g)$/i.test(file) && !/-\d+\.webp$/i.test(file),
    );

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
        .webp({ quality: 90, effort: 5, smartSubsample: true })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');
