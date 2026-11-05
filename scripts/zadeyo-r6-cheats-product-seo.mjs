/**
 * Copy these values into the Zadeyo Next.js product route for /products/r6-hacks
 * (this repo does not contain zadeyo.com source).
 */
export const ZADEYO_MW4_CHEATS_PRODUCT_SEO = {
  title: 'Aim – R6 Hacks — Hacks, ESP, Aimbot & Hacks by ZADEYO',
  description:
    'Rainbow Six Siege on PC: aim that eases inside a circle you set, a check so it ignores anyone behind a wall, and a light settle on rifle recoil.',
  h1: 'Aim: R6 Hacks — quiet 6v6 and Hajin DMZ, ESP, Aimbot & Hacks by ZADEYO',
  h2ProductDetails: 'Aim: R6 Hacks — Product Details',
  logoAlt: 'Aim – ZADEYO Logo',
  viewport: 'width=device-width, initial-scale=1',
};

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  console.log(JSON.stringify(ZADEYO_MW4_CHEATS_PRODUCT_SEO, null, 2));
}
