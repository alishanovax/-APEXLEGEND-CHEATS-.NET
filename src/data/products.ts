import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { PRODUCT_GALLERY_IMAGES, SITE_CHEAT_IMAGES } from '../config/siteImages';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['apex-esp-setup', 'apex-lite-vs-pro', 'apex-radar', 'eac-patch-day'],
  pro: [
    'apex-aimbot-ranked',
    'apex-aimbot-combat',
    'apex-lite-vs-pro',
    'apex-stream-proof',
  ],
  elite: [
    'apex-elite-tier',
    'apex-cheat-features',
    'apex-esp-setup',
    'eac-patch-day',
    'buy-apex-legends-cheats',
  ],
  'hwid-spoofer': [
    'apex-hwid-ban',
    'eac-troubleshooting',
    'eac-patch-day',
    'apex-external-loader',
  ],
  ugc: [
    'eac-troubleshooting',
    'apex-hwid-ban',
    'buy-apex-legends-cheats',
  ],
  'unlock-all': [
    'apex-loadouts',
    'apex-cheat-features',
    'apex-stream-proof',
  ],
};

const productBase = '/products/apex/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on apexlegendcheats.net and Discord #status before purchase—especially after a Apex Legends or Easy Anti-Cheat update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite Apex Legends cheats or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, PC platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the customer portal, patch loader, and setup guide. Test in a lobby, load presets, then queue ranked or Ranked.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Apex Legends and Easy Anti-Cheat receive frequent updates. Confirm module availability on the live status panel at apexlegendcheats.net before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Apex Legends can violate the game terms of service and lead to anti-hack action. You use this software at your own risk. Compatibility and availability can change after game, anti-hack, or Windows updates without notice.';

const apexSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 or Windows 11 (64-bit) with HVCI, Core Isolation, TPM and Secure Boot enabled.' },
  { icon: 'reqEpic', text: 'Current PC build of Apex Legends with the latest patches applied.' },
  { icon: 'reqSettings', text: 'Cloud DMA access for full functionality on supported builds.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and loader updates.' },
  { icon: 'reqCpu', text: 'Intel or AMD system that meets Apex Legends hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const galleryRaw = {
  gpAimbotEsp: {
    src: SITE_CHEAT_IMAGES[0].src,
    alt: SITE_CHEAT_IMAGES[0].alt,
    caption: 'Soft aim & ESP',
    captionDesc: 'Apex Legends trainer overlays tuned for PC gunfights.',
  },
  gpEspWallhack: {
    src: SITE_CHEAT_IMAGES[1].src,
    alt: SITE_CHEAT_IMAGES[1].alt,
    caption: 'Enemy ESP',
    captionDesc: 'Player ESP with health, health and distance in Apex Legends multiplayer.',
  },
  gpGameplay: {
    src: SITE_CHEAT_IMAGES[2].src,
    alt: SITE_CHEAT_IMAGES[2].alt,
    caption: 'Apex Legends co-op',
    captionDesc: 'Tactical shooter action on PC with trainer-friendly overlays.',
  },
  gpEspIndoor: {
    src: SITE_CHEAT_IMAGES[3].src,
    alt: SITE_CHEAT_IMAGES[3].alt,
    caption: 'Apex combat',
    captionDesc: 'Cel-shaded Apex Legends combat in a twilight outpost.',
  },
  gpCourtyard: {
    src: SITE_CHEAT_IMAGES[4]!.src,
    alt: SITE_CHEAT_IMAGES[4]!.alt,
    caption: 'Apex firefight',
    captionDesc: 'Sci-fi courtyard firefight with Legend action.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const productDetailGalleryCaptions = [
  { caption: 'Updates & anti-hack', captionDesc: 'Stay aligned with Apex Legends patch and security news.' },
  { caption: 'Multiplayer gameplay', captionDesc: 'In-match view on a compact map with full HUD.' },
  { caption: 'Quick Match perspective', captionDesc: 'First-person combat with kill feed and minimap.' },
] as const;

function productDetailGallery(): ProductSlide[] {
  return PRODUCT_GALLERY_IMAGES.map((img, i) => {
    const meta = productDetailGalleryCaptions[i] ?? productDetailGalleryCaptions[0]!;
    return {
      src: img.src,
      alt: img.alt,
      caption: meta.caption,
      captionDesc: meta.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'apex';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Apex Lite is built for players who want map awareness first. In ranked, knowing enemy positions, chest locations and loot timings wins more fights than raw mechanics—Lite gives you that edge without aimbot automation.',
    },
    { type: 'h2', text: 'Ranked-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar hack and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Apex Pro is the sweet spot for ranked grinders. Aimbot, Smooth Aim and Sticky Aim help you win squad fights without obvious bot patterns—when you tune Smoothness sliders using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Aimbot, Bone Priority, Hotkey macros and FOV and smoothness drawing. You see the fight before it starts and win it with aimbot that stay human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Apex Elite is the private build for players who want everything—Loot Assist, Triggerbot, Recoil control, Legend loadout tools, full wall ESP and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first ranked queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, chest and reboot-van locator, loot spawn timers, radar hack, and stream-safe overlay hiding. Config presets for Battle Royale and Ranked ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Aimbot, Smooth Aim, Sticky Aim with Prediction, Bone Priority and hotkey macros for heals and mobility. Smoothness sliders tunes cast timing so aimbot stay natural in ranked. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at apexlegendcheats.net—enough firepower for high-rank lobbies without Elite slot limits. Pair with our aimbot guide in the blog before your first ranked session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Loot Assist, Rotation Assist AI, Triggerbot, Recoil control, Legend loadout tools and full wall ESP with smoke alerts. Use lobby testing before ranked—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh EA accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only Easy Anti-Cheat cases; see [UGC](/products/apex/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative hack profile before ranked. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for EA account restrictions, Easy Anti-Cheat bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some Easy Anti-Cheat bans cannot be reversed. UGC organizes evidence and follow-ups for EA review. Pair with [HWID Spoofer](/products/apex/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Legend loadout tools ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: productDetailGallery(),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: apexSystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Chest & loot locator',
      'POI awareness',
      'Health & shield tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Loot spawn timers',
      'Radar hack',
      'Ranked preset config',
      'Ranked preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Apex Lite: ESP and radar',
      paragraphs: [
        'Lite is for player ESP, chest markers, loot timers and radar. No aimbot. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in Battle Royale and Ranked without combat automation. Overlays are updated after Apex Legends patches.',
      ],
    },
  },
  pro: {
    images: productDetailGallery(),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: apexSystemRequirements,
    fullFeatures: [
      'All Lite ESP & wall ESP modules',
      'Aimbot',
      'Smooth Aim',
      'Sticky Aim & Prediction',
      'Bone Priority',
      'Hotkey macros (heals/shields)',
      'Auto Heal',
      'FOV & smoothness tuning',
      'Per-weapon aimbot profiles',
      'Third-party alert integration',
      'Ranked-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'Apex Pro: aimbot plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Sticky Aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for Battle Royale and Ranked. Bone priority and macros help in fights while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: productDetailGallery(),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: apexSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Loot Assist',
      'Rotation Assist AI',
      'Chest respawn timer',
      'Auto loadout manager',
      'Triggerbot',
      'Recoil control',
      'Full wall ESP suite',
      'Third-party alert system',
      'Visibility detector',
      'Legend loadout tools (Loadout Pack)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Elite: full hack + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus loot assist, Triggerbot, Recoil control, Legend loadout tools, full wall ESP and faster patch priority.',
        'Elite slots are limited. Discord support helps you set safer profiles before ranked matchmaking. Check the status banner on apexlegendcheats.net before you buy Elite access.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpEspIndoor', 'gpEspWallhack', 'gpGameplay'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Apex Legends.',
    limitations:
      'Spoofing does not help account-only Easy Anti-Cheat cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Apex Legends after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'HWID Spoofer for Apex Legends PC bans',
      paragraphs: [
        'Use the HWID Spoofer when Easy Anti-Cheat flags your PC hardware but the EA account is still fine. Includes disk and MAC tools, a restore-point checklist, a compatibility scan and post-spoof checks.',
        'Use it when new accounts die on one PC but work on another. It does not fix account-only Easy Anti-Cheat bans. After spoofing, use a safer hack profile before ranked matchmaking.',
      ],
    },
  },
  ugc: {
    images: slide('gpEspWallhack', 'gpAimbotEsp', 'gpEspIndoor').map((img, index) =>
      index === 0 ? { ...img, alt: `Ugc – ${img.alt}` } : img,
    ),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent Easy Anti-Cheat bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on apexlegendcheats.net or at checkout on apexlegendcheats.net.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC account appeal tools',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you organize appeals for EA account restrictions and Easy Anti-Cheat bans. UGC does not guarantee an unban.',
        'Use UGC when you have documentation, order email and platform notices ready. Pair with HWID tools only when hardware flags—not account-only bans—are involved.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpGameplay', 'gpEspWallhack', 'gpAimbotEsp'),
    goodToKnow:
      'Loadout Pack previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify in-game inventory or store state. Other players cannot see previewed skins or sets.',
    systemRequirements: apexSystemRequirements,
    fullFeatures: [
      'Outfit skin swap',
      'Skin & wrap preview',
      'Pickaxe & wrap customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Chest & loot replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Legend loadout tools / Loadout Pack',
      paragraphs: [
        'Legend loadout tools / Loadout Pack lets you preview outfits, camos and attachments on your Apex Legends client. Legend loadout tools does not change your in-game inventory or store purchases.',
        'Only you see the preview skins. Other players see your real inventory. Included with Elite, or buy Legend loadout tools alone without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.hacks.items.map((hack) => {
    const slug = slugFromHref(hack.href);
    const content = productContent[slug];
    const displayName = hack.name === 'Lite' ? 'Apex Lite' : hack.name === 'Pro' ? 'Apex Pro' : 'Apex Elite';
    return {
      slug,
      kind: 'tier',
      badge: hack.badge,
      tier: hack.tier,
      name: hack.name,
      title: hack.title,
      subtitle: hack.desc,
      desc: hack.desc,
      features: hack.features,
      more: hack.more,
      variant: hack.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimbotEsp', 'gpEspWallhack', 'gpGameplay');

export const heroSlides = slide('gpAimbotEsp', 'gpEspWallhack', 'gpGameplay', 'gpEspIndoor', 'gpCourtyard');

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Apex Elite hacks with aimbot and ESP, plus HWID spoofer, UGC recovery and Legend loadout tools for PC.',
  buyUrl: checkoutPath('apex'),
};
