/**
 * Copy into Zadeyo /products/rainbow-six-siege-cheats (Next.js product route).
 * apexlegendcheats.net mirrors this on /go/apex/ after deploy; zadeyo.com must be updated separately.
 */
import { ZADEYO_APEX_PRODUCT_SEO, ZADEYO_APEX_CHECKOUT_URL } from '../src/config/zadeyoApexProductSeo.ts';

export const ZADEYO_RAINBOW_SIX_SIEGE_CHEATS_PRODUCT_SEO = {
  ...ZADEYO_APEX_PRODUCT_SEO,
  checkoutUrl: ZADEYO_APEX_CHECKOUT_URL,
  /** Zadeyo CMS: use one <h1>; demote duplicate product hero headings to <h2>. */
  headingOutline: [
    { level: 'h1', text: ZADEYO_APEX_PRODUCT_SEO.h1 },
    { level: 'h2', text: 'Product details' },
    { level: 'h2', text: 'Gameplay screenshots' },
    { level: 'h2', text: 'Features' },
    { level: 'h2', text: 'System requirements' },
    { level: 'h2', text: 'Frequently asked questions' },
  ],
  keywordCap: {
    phrase: 'rainbow six siege cheats',
    maxUses: 8,
    note: 'Keep phrase in title + meta only; use R6 Siege / the listing elsewhere.',
  },
};

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  console.log(JSON.stringify(ZADEYO_RAINBOW_SIX_SIEGE_CHEATS_PRODUCT_SEO, null, 2));
}
