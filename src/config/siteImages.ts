/** Approved Rainbow Six Siege media — only these assets are used site-wide. */
export interface SiteCheatImage {
  src: string;
  alt: string;
}

const R6_MEDIA_BASE =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/r6';

export const SITE_CHEAT_IMAGES: SiteCheatImage[] = [
  {
    src: `${R6_MEDIA_BASE}/f8fb1df6-697d-4d9b-b239-91326d061bf8/1793467017920-wcqjc4-7.webp`,
    alt: 'Rainbow Six Siege PC ranked match firefight with operators breaching a site',
  },
  {
    src: `${R6_MEDIA_BASE}/f8fb1df6-697d-4d9b-b239-91326d061bf8/1793466989730-wh94c1-1.webp`,
    alt: 'Rainbow Six Siege gameplay scene showing tactical operator movement on PC',
  },
  {
    src: `${R6_MEDIA_BASE}/f8fb1df6-697d-4d9b-b239-91326d061bf8/1793466995758-0n86gr-2.webp`,
    alt: 'Rainbow Six Siege close-quarters gunfight with destructible environment on PC',
  },
  {
    src: `${R6_MEDIA_BASE}/05c202fe-8171-4881-bc3a-b25833919850/1793293183726-gopke1-r6s-multihack-s1.webp`,
    alt: 'Rainbow Six Siege hack menu preview with ESP and aimbot modules on PC',
  },
  {
    src: `${R6_MEDIA_BASE}/f8fb1df6-697d-4d9b-b239-91326d061bf8/1793467164902-dhd3cn-9.webp`,
    alt: 'Rainbow Six Siege operator ESP overlay and gadget awareness on PC',
  },
];

/** Product detail screenshot carousel (three slides). */
export const PRODUCT_GALLERY_IMAGES: SiteCheatImage[] = [
  SITE_CHEAT_IMAGES[3]!,
  SITE_CHEAT_IMAGES[4]!,
  SITE_CHEAT_IMAGES[1]!,
];

export const PRIMARY_CHEAT_IMAGE = SITE_CHEAT_IMAGES[0].src;

export function cheatImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % SITE_CHEAT_IMAGES.length;
  }
  return SITE_CHEAT_IMAGES[hash]!.src;
}

export function cheatImageAltForSrc(src: string): string {
  return SITE_CHEAT_IMAGES.find((img) => img.src === src)?.alt ?? SITE_CHEAT_IMAGES[0]!.alt;
}
