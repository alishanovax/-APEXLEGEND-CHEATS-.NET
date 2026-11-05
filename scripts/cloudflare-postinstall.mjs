import fs from 'node:fs';
import { execSync } from 'node:child_process';

/** Cloudflare Workers Builds: deploy runs `npx wrangler deploy` without `npm run build`. */
const isCloudflareWorkersBuild = process.cwd().includes('buildhome');

if (!isCloudflareWorkersBuild || process.env.CF_SKIP_POSTINSTALL === '1') {
  process.exit(0);
}

const distIndex = new URL('../dist/index.html', import.meta.url);
if (fs.existsSync(distIndex)) {
  process.exit(0);
}

console.log('[cloudflare-postinstall] Building static site (dist/ missing before wrangler deploy)…');
execSync('npm run build', {
  stdio: 'inherit',
  env: { ...process.env, CF_SKIP_POSTINSTALL: '1' },
});
