import { normalizeSeoPath } from './pageSeo';

/** Footer logo alt text matched to each route’s audit keyword (exact phrases). */
const LOGO_ALT_BY_PATH: Record<string, string> = {
  '/products/apex/': 'Apex Legends – Apex Legends Cheats shop logo',
  '/about/': 'Aimbot Esp – logo',
  '/blog/': 'Apex Legends guides – logo',
  '/faq/': 'Faq – logo',
  '/forum/': 'Forum – logo',
  '/privacy/': 'Privacy – logo',
  '/support/': 'Support – logo',
  '/terms/': 'Terms – logo',
  '/products/apex/utilities/': 'Utilities – Apex Legends Cheats logo',
  '/apex-legends-cheats/': 'Apex Legends Cheats logo',
};

export function footerLogoAltForPath(pathname: string): string {
  const path = normalizeSeoPath(pathname);
  return LOGO_ALT_BY_PATH[path] ?? 'Apex Legends Cheats logo';
}
