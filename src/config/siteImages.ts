/** Approved Apex Legends media — only these assets are used site-wide. */
export interface SiteCheatImage {
  src: string;
  alt: string;
}

const APEX_MEDIA = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/apex/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793193958271-ygwhlj-phoenix-apex-xray-s1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/apex/d668cf71-915f-4d4e-84bc-5ec0cbed3619/1793194360594-vahy1o-phoenix-apex-xray-s2.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/apex/7a5973f7-2cf8-4de3-90ea-2060bf036d16/1793916474479-fq0411-ap4.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/apex/7a5973f7-2cf8-4de3-90ea-2060bf036d16/1793916321918-tnpvv4-ap2.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/apex/7a5973f7-2cf8-4de3-90ea-2060bf036d16/1793916275158-vj28eh-ap1.webp',
] as const;

export const SITE_CHEAT_IMAGES: SiteCheatImage[] = [
  {
    src: APEX_MEDIA[0],
    alt: 'Apex Legends PC gameplay with Phoenix tactical overlay and enemy visibility preview',
  },
  {
    src: APEX_MEDIA[1],
    alt: 'Apex Legends x-ray style combat scene showing Legend positions on PC',
  },
  {
    src: APEX_MEDIA[2],
    alt: 'Apex Legends ranked firefight with squad combat on PC',
  },
  {
    src: APEX_MEDIA[3],
    alt: 'Apex Legends cheat software menu preview with ESP modules on PC',
  },
  {
    src: APEX_MEDIA[4],
    alt: 'Apex Legends cheat interface showing aimbot and ESP settings on PC',
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
