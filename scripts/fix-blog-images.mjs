import fs from 'node:fs';

const path = 'src/data/blog/posts.ts';
let content = fs.readFileSync(path, 'utf8');
const slugRe = /slug: "([^"]+)"/g;
const slugs = [...content.matchAll(slugRe)].map((m) => m[1]);
let i = 0;
content = content.replace(/image: "\/images\/blog\/[^"]+",/g, () => {
  const slug = slugs[i++] ?? 'blog';
  return `image: cheatImageForSlug('${slug}'),`;
});
fs.writeFileSync(path, content);
console.log(`Updated ${i} blog images.`);
