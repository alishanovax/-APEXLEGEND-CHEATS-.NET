import { SLUG_REDIRECTS } from '../src/config/slug-redirects.mjs';

/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/apex/'],
  ['/cheats/', '/products/apex/'],
  ['/cheats/lite', '/products/apex/lite/'],
  ['/cheats/lite/', '/products/apex/lite/'],
  ['/cheats/pro', '/products/apex/pro/'],
  ['/cheats/pro/', '/products/apex/pro/'],
  ['/cheats/elite', '/products/apex/elite/'],
  ['/cheats/elite/', '/products/apex/elite/'],
  ['/cheats/compare', '/blog/apex-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/apex-lite-vs-pro/'],
  ['/hacks', '/products/apex/'],
  ['/hacks/', '/products/apex/'],
  ['/hacks/lite', '/products/apex/lite/'],
  ['/hacks/lite/', '/products/apex/lite/'],
  ['/hacks/pro', '/products/apex/pro/'],
  ['/hacks/pro/', '/products/apex/pro/'],
  ['/hacks/elite', '/products/apex/elite/'],
  ['/hacks/elite/', '/products/apex/elite/'],
  ['/hacks/compare', '/blog/apex-lite-vs-pro/'],
  ['/hacks/compare/', '/blog/apex-lite-vs-pro/'],
  ['/products/apex/utilities', '/products/apex/utilities/'],
  ['/products/apex-legends-cheats', '/products/apex/'],
  ['/products/apex-legends-cheats/', '/products/apex/'],
  ['/products/apex-legends-cheats/lite', '/products/apex/lite/'],
  ['/products/apex-legends-cheats/lite/', '/products/apex/lite/'],
  ['/products/apex-legends-cheats/pro', '/products/apex/pro/'],
  ['/products/apex-legends-cheats/pro/', '/products/apex/pro/'],
  ['/products/apex-legends-cheats/elite', '/products/apex/elite/'],
  ['/products/apex-legends-cheats/elite/', '/products/apex/elite/'],
  ['/products/apex-legends-cheats/hwid-spoofer', '/products/apex/hwid-spoofer/'],
  ['/products/apex-legends-cheats/hwid-spoofer/', '/products/apex/hwid-spoofer/'],
  ['/products/apex-legends-cheats/ugc', '/products/apex/ugc/'],
  ['/products/apex-legends-cheats/ugc/', '/products/apex/ugc/'],
  ['/products/apex-legends-cheats/unlock-all', '/products/apex/unlock-all/'],
  ['/products/apex-legends-cheats/unlock-all/', '/products/apex/unlock-all/'],
  ['/products/apex-legends-cheats/utilities', '/products/apex/utilities/'],
  ['/products/apex-legends-cheats/utilities/', '/products/apex/utilities/'],
  ['/products/apex-hacks', '/products/apex/'],
  ['/products/apex-hacks/', '/products/apex/'],
  ['/products/apex-hacks/pro', '/products/apex/pro/'],
  ['/products/apex-hacks/pro/', '/products/apex/pro/'],
  ['/products/apex-hacks/lite', '/products/apex/lite/'],
  ['/products/apex-hacks/lite/', '/products/apex/lite/'],
  ['/products/apex-hacks/elite', '/products/apex/elite/'],
  ['/products/apex-hacks/elite/', '/products/apex/elite/'],
  ['/products/apex/account-recovery', '/products/apex/ugc/'],
  ['/products/apex/account-recovery/', '/products/apex/ugc/'],
  ['/products/dota-2-hacks', '/products/apex/'],
  ['/products/dota-2-hacks/', '/products/apex/'],
  ['/products/dota-2-hacks/elite', '/products/apex/elite/'],
  ['/products/dota-2-hacks/elite/', '/products/apex/elite/'],
  ['/products/dota-2-hacks/utilities', '/products/apex/utilities/'],
  ['/products/dota-2-hacks/utilities/', '/products/apex/utilities/'],
  ...Object.entries(SLUG_REDIRECTS),
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
