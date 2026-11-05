import { normalizeSeoPath } from './pageSeo';

/** Footer logo alt text matched to each route’s audit keyword (exact phrases). */
const LOGO_ALT_BY_PATH: Record<string, string> = {
  '/products/r6/': 'Rainbow Six Siege – R6 Hacks shop logo',
  '/about/': 'Aimbot Esp – logo',
  '/blog/': 'Blogs – logo',
  '/faq/': 'Faq – logo',
  '/forum/': 'R6 Hacks – Forum – logo',
  '/privacy/': 'R6 Hacks Shop – logo',
  '/support/': 'Support – logo',
  '/terms/': 'Terms – logo',
  '/products/r6/utilities/': 'Utilities – R6 Hacks logo',
  '/r6-hacks/': 'R6 Hacks logo',
};

export function footerLogoAltForPath(pathname: string): string {
  const path = normalizeSeoPath(pathname);
  return LOGO_ALT_BY_PATH[path] ?? 'R6 Hacks logo';
}
