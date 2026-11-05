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
  ['/cheats', '/products/r6/'],
  ['/cheats/', '/products/r6/'],
  ['/cheats/lite', '/products/r6/lite/'],
  ['/cheats/lite/', '/products/r6/lite/'],
  ['/cheats/pro', '/products/r6/pro/'],
  ['/cheats/pro/', '/products/r6/pro/'],
  ['/cheats/elite', '/products/r6/elite/'],
  ['/cheats/elite/', '/products/r6/elite/'],
  ['/cheats/compare', '/blog/r6-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/r6-lite-vs-pro/'],
  ['/hacks', '/products/r6/'],
  ['/hacks/', '/products/r6/'],
  ['/hacks/lite', '/products/r6/lite/'],
  ['/hacks/lite/', '/products/r6/lite/'],
  ['/hacks/pro', '/products/r6/pro/'],
  ['/hacks/pro/', '/products/r6/pro/'],
  ['/hacks/elite', '/products/r6/elite/'],
  ['/hacks/elite/', '/products/r6/elite/'],
  ['/hacks/compare', '/blog/r6-lite-vs-pro/'],
  ['/hacks/compare/', '/blog/r6-lite-vs-pro/'],
  ['/products/r6/utilities', '/products/r6/utilities/'],
  ['/products/r6-cheats', '/products/r6/'],
  ['/products/r6-cheats/', '/products/r6/'],
  ['/products/r6/account-recovery', '/products/r6/ugc/'],
  ['/products/r6/account-recovery/', '/products/r6/ugc/'],
  ['/products/dota-2-hacks', '/products/r6/'],
  ['/products/dota-2-hacks/', '/products/r6/'],
  ['/products/dota-2-hacks/elite', '/products/r6/elite/'],
  ['/products/dota-2-hacks/elite/', '/products/r6/elite/'],
  ['/products/dota-2-hacks/utilities', '/products/r6/utilities/'],
  ['/products/dota-2-hacks/utilities/', '/products/r6/utilities/'],
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
