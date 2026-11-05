/**
 * SSR copy for /go/r6/ — mirror for Zadeyo /products/rainbow-six-siege-cheats SEO.
 * Apply the same fields in Zadeyo admin (this repo does not deploy zadeyo.com).
 */
export const ZADEYO_R6_CHECKOUT_URL =
  'https://zadeyo.com/products/rainbow-six-siege-cheats?aff=ALISHA';

export const ZADEYO_R6_PRODUCT_SEO = {
  title: 'Rainbow Six Siege Cheats – Monthly and lifetime access',
  description:
    'Undetected rainbow six siege cheats with player ESP, aimbot, and recoil control. Monthly and lifetime access. Updated for current patches.',
  h1: 'Rainbow Six Siege Cheats — ESP, aimbot, wallhack & ranked presets',
  h2ProductDetails: 'Product details',
  h2Features: 'Features',
  h2SystemRequirements: 'System requirements',
  h2Checkout: 'Checkout and delivery',
  h2Plans: 'Monthly vs long-term plans',
  h2Loader: 'Loader, configs, and updates',
  h2Safety: 'Status checks before you queue',
  logoAlt: 'Rainbow Six Siege cheats — ZADEYO checkout logo',
  intro:
    'Undetected PC tools with player ESP, precision aimbot, and recoil control. Compare tiers on r6hacks.org, then continue to ZADEYO when the status banner shows online.',
  sections: [
    {
      heading: 'Aim and combat modules',
      level: 'h3' as const,
      paragraphs: [
        'Smooth aim inside a configurable FOV circle with wall checks, triggerbot options, and recoil settle for rifle profiles.',
      ],
    },
    {
      heading: 'ESP and gadget awareness',
      level: 'h3' as const,
      paragraphs: [
        'Player ESP, skeleton and box overlays, snaplines, and attacker or defender gadget ESP with save and load config profiles.',
      ],
    },
  ],
  bodySections: [
    {
      id: 'checkout',
      headingKey: 'h2Checkout' as const,
      paragraphs: [
        'Payment and license delivery run on ZADEYO after you choose a plan. You receive digital loader access and setup guidance—no physical shipment.',
        'Use r6hacks.org for tier tables, BattlEye patch notes, and pre-purchase FAQ before you launch Rainbow Six Siege on PC.',
      ],
    },
    {
      id: 'plans',
      headingKey: 'h2Plans' as const,
      paragraphs: [
        'Monthly billing follows a 31-day cycle with the same module list as the long-term option. It fits shorter trials while you tune aimbot smoothness and ESP range in unranked playlists.',
        'The long-term option keeps one portal license without monthly renewals. Confirm live pricing and module lists on the ZADEYO checkout screen before you pay.',
      ],
    },
    {
      id: 'loader',
      headingKey: 'h2Loader' as const,
      paragraphs: [
        'The operator portal hosts the current Windows loader, default configs, and save/load profiles for ranked and unranked modes.',
        'After a Rainbow Six Siege or BattlEye update, reload the loader from the portal and read the homepage status banner before ranked queue.',
      ],
    },
    {
      id: 'safety',
      headingKey: 'h2Safety' as const,
      paragraphs: [
        'Third-party tools carry ban risk. Start with conservative FOV, smooth aim, and limited ESP distance until sessions feel stable.',
        'Check Discord #status and the r6hacks.org banner on patch days. Do not queue ranked while modules show offline or misaligned.',
      ],
    },
  ],
  screenshotAlts: [
    'Rainbow Six Siege ESP overlay screenshot 1',
    'Rainbow Six Siege aimbot FOV screenshot 2',
    'Rainbow Six Siege gadget ESP screenshot 3',
  ],
} as const;
