import fs from 'node:fs';

function fixFile(relPath) {
  const content = fs.readFileSync(relPath, 'utf8');
  const fixed = content.replace(
    /(slug: ([`'"])([^`'"]+)\2,\n\s*image: )cheatImageForSlug\([^)]+\),/g,
    (_m, prefix, _q, slug) => `${prefix}cheatImageForSlug('${slug}'),`,
  );
  if (fixed !== content) {
    fs.writeFileSync(relPath, fixed);
    console.log('fixed', relPath);
  }
}

fixFile('src/data/blog/posts.ts');
fixFile('src/i18n/en.ts');
