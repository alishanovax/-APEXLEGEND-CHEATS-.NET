/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  /** Optional on-page H1 override (SEO-only routes). */
  h1?: string;
  /** Optional second H1 line (homepage hero accent). */
  h1Accent?: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Apex Legends Cheats — PC aimbot, ESP & setup guides',
    description:
      'Compare Apex Legends PC cheat tiers, read setup guides, and check out secure options — aimbot, player ESP, configs and support at apexlegendcheats.net.',
    h1: 'Apex Legends Cheats',
  },
  '/products/apex/': {
    title: 'Apex Legends PC cheats — Lite, Pro, Elite & utilities',
    description:
      'Shop Apex Legends PC cheats: Lite ESP, Pro aimbot, Elite suite, HWID tools and UGC — compare features and checkout at apexlegendcheats.net.',
    h1: 'Apex Legends PC cheats — compare tiers and utilities',
  },
  '/products/apex/lite/': {
    title: 'Apex Lite Cheats | Player ESP, Radar & Loot Timers',
    description:
      'Apex Lite cheats for PC — player ESP, chest markers, loot timers and radar without aimbot. Stream-proof overlay and ranked presets on apexlegendcheats.net.',
  },
  '/products/apex/pro/': {
    title: 'Apex Pro Cheats | Aimbot, Smooth Aim & Wall ESP',
    description:
      'Apex Pro cheats include Lite ESP plus Aimbot, Smooth Aim, Sticky Aim and bone priority — ranked-safe defaults and portal presets for Apex Legends on PC.',
  },
  '/products/apex/elite/': {
    title: 'Elite Apex Legends Cheats | Aimbot, ESP & Loot Assist',
    description:
      'Elite tier includes advanced aim, full ESP, loot assist, Legend-focused tools and priority update notes for Apex Legends on PC.',
  },
  '/products/apex/hwid-spoofer/': {
    title: 'HWID Spoofer for Apex Legends | Hardware Identity Tools',
    description:
      'HWID tools for Apex Legends on PC — guided steps for hardware identity resets. Read compatibility and risk notes before you buy at apexlegendcheats.net.',
  },
  '/products/apex/ugc/': {
    title: 'UGC Tools | Apex Legends Easy Anti-Cheat & EA Ban Appeals',
    description:
      'UGC (Unban & Governance Control) organizes EA and Easy Anti-Cheat ban appeals, dispute workflows and case tracking for Apex Legends players.',
  },
  '/products/apex/unlock-all/': {
    title: 'Legend loadout tools — skins, wraps & weapon previews',
    description:
      'Loadout Pack for Apex Legends on PC — local cosmetic and weapon previews with your client. Compare scope and checkout at apexlegendcheats.net.',
  },
  '/products/apex/utilities/': {
    title: 'Apex cheat utilities — HWID, UGC & loadout tools',
    description:
      'Utilities hub: HWID tools, EA and EAC appeal workflows (UGC), and Legend loadout helpers for Apex Legends PC — compare before checkout.',
    h1: 'Compare Apex utilities — HWID, UGC & Legend loadout tools',
  },
  '/blog/': {
    title: 'Apex Legends guides — aimbot, ESP, tiers & patch days',
    description:
      'Guides for Apex Legends PC cheats: aimbot and ESP setup, Lite vs Pro, firing range drills, and what to check after patches and anti-cheat updates.',
    h1: 'Apex Legends cheat guides — setup, tiers and patch checks',
  },
  '/forum/': {
    title: 'Apex forum — loader, configs & product discussion',
    description:
      'Community threads on loader setup, aim configs, product questions and patch-day checks — backed by guides on apexlegendcheats.net.',
    h1: 'Forum — loader help, configs and Apex cheat discussion',
  },
  '/faq/': {
    title: 'FAQ — Apex tiers, bans, loader & checkout | apexlegendcheats',
    description:
      'FAQ on Lite, Pro and Elite tiers, aimbot, wall ESP, radar, HWID spoofer, Legend loadout tools, bans and loader setup at apexlegendcheats.net.',
    h1: 'FAQ — Apex Legends Cheats tiers, bans, Easy Anti-Cheat setup, loader help and checkout',
  },
  '/terms/': {
    title: 'Terms — licenses, delivery, refunds & account risk',
    description:
      'Terms for buying digital Apex Legends software on apexlegendcheats.net: license use, delivery, refunds, and risks when using third-party tools with EA titles.',
    h1: 'Terms — licenses, delivery, refunds & account risk',
  },
  '/privacy/': {
    title: 'Privacy — analytics, cookies & checkout data',
    description:
      'How apexlegendcheats.net uses analytics, cookies, and contact or checkout-related data for support and referrals. Read the full policy before you buy.',
    h1: 'Privacy — analytics, cookies, checkout and contact data',
  },
  '/about/': {
    title: 'About — Apex tier guides, loader help & updates',
    description:
      'Who we are: Apex Legends PC cheat tier comparisons, setup guides, and support channels at apexlegendcheats.net — independent of EA and publishers.',
    h1: 'About — Apex tier guides, loader help & updates',
  },
  '/support/': {
    title: 'Support — loader, HWID & checkout help | apexlegendcheats',
    description:
      'Get help with the loader, aim and ESP configs, HWID resets, and checkout — Discord and FAQ linked from apexlegendcheats.net.',
    h1: 'Support — loader, HWID, checkout & config help',
  },
  '/apex-legends-cheats/': {
    title: 'Apex Legends cheats hub — PC tiers, features & checkout',
    description:
      'Overview of Apex Legends PC cheat tiers, core features, and loader-focused notes. Compare options and checkout at apexlegendcheats.net.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

/** Blog post `<title>` / meta description overrides (exact audit phrases). */
export const BLOG_POST_SEO: Record<string, Partial<PageSeoEntry>> = {
  'apex-radar': {
    title: 'Apex radar guide — FOV, spacing & team callouts',
    description:
      'Use radar overlays safely in Apex Legends: FOV habits, spacing, and squad callouts for Battle Royale and ranked — guide at apexlegendcheats.net.',
  },
  'apex-stream-proof': {
    title: 'Stream-safe overlays — hiding ESP from OBS & capture',
    description:
      'Test OBS, Game Bar, and capture-card setups so stream viewers do not see overlays — practical checklist for Apex Legends creators on apexlegendcheats.net.',
  },
  'apex-aimbot-ranked': {
    title: 'Ranked aimbot — bone priority, prediction & smoothness',
  },
  'eac-troubleshooting': {
    title: 'EAC errors on Apex PC — verify, repair & recovery',
    description:
      'When Easy Anti-Cheat fails to verify Apex Legends on PC: file checks, repairs, reinstall paths, and when account recovery applies — guide at apexlegendcheats.net.',
  },
};

/** Optional on-page H1 overrides (blog posts). */
export const BLOG_POST_PAGE_H1: Record<string, string> = {
  'eac-troubleshooting':
    'What the Easy Anti-Cheat error means — EAC unable to verify Apex Legends (Apex Legends cheats)',
  'apex-stream-proof':
    'Stream-Proof Overlay Setup — hide wall ESP and script overlays from OBS (Apex Legends cheats)',
  'apex-firing-range-practice': 'Firing Range Practice: Aim Drills Before Ranked (Apex Legends cheats)',
  'apex-radar': 'Apex radar on PC — FOV habits, spacing and team callouts',
};

export function getBlogPostSeo(slug: string, fallback: PageSeoEntry): PageSeoEntry {
  const override = BLOG_POST_SEO[slug];
  if (!override) return fallback;
  return {
    title: override.title ?? fallback.title,
    description: override.description ?? fallback.description,
  };
}

export function blogPostPageH1(slug: string, postTitle: string): string {
  return BLOG_POST_PAGE_H1[slug] ?? postTitle;
}

/** Layout `<title>` for blog posts; ranked override is used verbatim when under 60 chars. */
export function blogPostLayoutTitle(slug: string, postTitle: string, brand = 'Apex Legends Cheats'): string {
  const override = BLOG_POST_SEO[slug]?.title;
  if (override && override.length <= 60) return override;
  if (override) return `${override.slice(0, 57).trim()}…`;
  const suffix = ` | ${brand}`;
  const max = 60;
  if (`${postTitle}${suffix}`.length <= max) return `${postTitle}${suffix}`;
  const trimmed = postTitle.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}
