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
    title: 'Apex Legends – Check status before you queue after Easy',
    description:
      'Apex Legends cheats for Apex Legends on PC — aimbot, player ESP, item ESP, config profiles, and installation guides at apexlegendcheats.net.',
    h1: 'Apex Legends Cheats',
    h1Accent:
      'Check status before you queue after Easy Anti-Cheat — Apex Legends PC, Aimbot, ESP, Item ESP & Configs',
  },
  '/products/apex/': {
    title: 'Apex – UGC recovery and Legend loadout tools checkout at',
    description:
      'Apex shop: Apex Legends PC cheats — Elite aimbot, wall ESP, HWID spoofer, UGC recovery checkout at apexlegendcheats.net.',
    h1: 'Buy PC hacks — Apex Legends Elite, HWID spoofer, Legend loadout tools cheats shop tiers',
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
      'Elite tier ships item ESP, triggerbot, full wall ESP, operator loadout tools and priority patch updates for Apex Legends on PC.',
  },
  '/products/apex/hwid-spoofer/': {
    title: 'HWID Spoofer for Apex Legends | Hardware Ban Bypass',
    description:
      'Buy a Apex Legends HWID spoofer for PC hardware bans — disk/MAC tools, compatibility scan and post-spoof checks before you launch cheats again.',
  },
  '/products/apex/ugc/': {
    title: 'UGC Tools | Apex Legends Easy Anti-Cheat & EA Ban Appeals',
    description:
      'UGC (Unban & Governance Control) organizes EA and Easy Anti-Cheat ban appeals, dispute workflows and case tracking for Apex Legends players.',
  },
  '/products/apex/unlock-all/': {
    title: 'Legend loadout tools – wrap and weapon previews with your Modern',
    description:
      'Legend loadout tools / Loadout Pack — local outfit, wrap and weapon previews with your Apex Legends client; no in-game inventory purchase required.',
  },
  '/products/apex/utilities/': {
    title: 'Utilities – and local Legend loadout tools / Pack',
    description:
      'Compare Apex Legends cheat utilities: HWID spoofer after hardware bans, UGC for EA/Easy Anti-Cheat appeals, and local operator loadout tools.',
  },
  '/blog/': {
    title: 'Wall Esp – Read Apex Legends cheat guides on aimbot setup',
    description:
      'Read Apex Legends cheat guides on aimbot setup, wall ESP, Lite vs Pro, Firing Range practice and Easy Anti-Cheat patch-day checks.',
    h1: 'Latest Apex Legends cheat guide blogs — aimbot, wall ESP & Easy Anti-Cheat',
  },
  '/forum/': {
    title: 'Forum – Most discussed 20 discussions All topics General',
    description:
      'Forum for loader setup, aimbot configs, Easy Anti-Cheat status and product questions. Answers from apexlegendcheats.net guides and community discussions.',
    h1: 'Forum — most discussed topics, general discussions and loader setup help',
  },
  '/faq/': {
    title: 'Faq – Apex tiers, bans, setup and Easy Anti-Cheat loader',
    description:
      'FAQ on Lite, Pro and Elite tiers, aimbot, wall ESP, radar, HWID spoofer, Legend loadout tools, bans and loader setup at apexlegendcheats.net.',
    h1: 'FAQ — Apex Legends Cheats tiers, bans, Easy Anti-Cheat setup, loader help and checkout',
  },
  '/terms/': {
    title: 'Terms – org — license use, delivery, refunds and account',
    description:
      'Terms for buying Apex Legends cheats on apexlegendcheats.net — license use, delivery, refunds and account risk when you checkout Apex Legends cheat products.',
  },
  '/privacy/': {
    title: 'Analytics Cookies – and contact data for checkout',
    description:
      'Privacy: How the apexlegendcheats.net shop uses analytics, cookies and contact data for checkout referrals, support tickets, and shop data use.',
    h1: 'Privacy Policy — apexlegendcheats.net analytics, cookies, checkout and contact data',
  },
  '/about/': {
    title: 'Aimbot Esp – We publish tier comparisons, setup guides and',
    description:
      'About aimbot ESP and PC Apex Legends tools — tier comparisons, loader setup and support at apexlegendcheats.net for EA Connect players.',
  },
  '/support/': {
    title: 'Support – loader, HWID and checkout help on apexlegendcheats.net',
    description:
      'Apex Legends cheats support for loader setup, aimbot/ESP configs, HWID spoofing and checkout help — 24/7 Discord and FAQ on apexlegendcheats.net.',
  },
  '/apex-legends-cheats/': {
    title: 'Apex Legends Cheats — patch utilities for PC trainer & loader',
    description:
      'Apex Legends Cheats patch utilities for aimbot, wall ESP, item ESP and loader updates on PC. Compare tiers and checkout at apexlegendcheats.net.',
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
    title: 'Guide – FOV awareness and safe distance caps for Team',
    description:
      'Radar Cheat: Apex Legends cheats guide: Mini-radar, FOV awareness and safe distance caps for Battle Royale and Ranked on apexlegendcheats.net.',
  },
  'apex-stream-proof': {
    title: 'Stream Proof – Hide wall ESP and script overlays from OBS',
    description:
      'Stream Proof: Apex Legends cheats guide: Hide wall ESP and script overlays from OBS, Game Bar and capture cards—test workflow for content creators.',
  },
  'apex-aimbot-ranked': {
    title: 'Ranked – net ships Bone Priority, Prediction, Smoothness',
  },
  'eac-troubleshooting': {
    title: 'Eac – What the error means “Easy Anti-Cheat was unable to',
    description:
      'Apex Legends cheats guide: Fix verification errors, file integrity checks and when to use Account Recovery after eac issues on apexlegendcheats.net.',
  },
};

/** Optional on-page H1 overrides (blog posts). */
export const BLOG_POST_PAGE_H1: Record<string, string> = {
  'eac-troubleshooting':
    'What the Easy Anti-Cheat error means — EAC unable to verify Apex Legends (Apex Legends cheats)',
  'apex-stream-proof':
    'Stream-Proof Overlay Setup — hide wall ESP and script overlays from OBS (Apex Legends cheats)',
  'apex-firing-range-practice': 'Firing Range Practice: Aim Drills Before Ranked (Apex Legends cheats)',
  'apex-radar':
    'Apex Legends Radar cheat Guide — FOV awareness, safe distance caps for Team',
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
