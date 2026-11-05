import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'i18n', 'en.ts');
let s = fs.readFileSync(file, 'utf8');

if (!s.includes('cheatImageForSlug')) {
  s = s.replace(
    "import { DISCORD_URL, PRODUCT_BASE } from '../config/site';",
    "import { DISCORD_URL, PRODUCT_BASE } from '../config/site';\nimport { cheatImageForSlug } from '../config/siteImages';",
  );
}

s = s.replace(
  /slug: '([^']+)',\r?\n        image: '\/images\/blog\/[^']+',/g,
  "slug: '$1',\n        image: cheatImageForSlug('$1'),",
);

fs.writeFileSync(file, s);
console.log('Patched', file);
