import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SLUG_REDIRECTS } from './src/config/slug-redirects.mjs';

export default defineConfig({
  site: 'https://apexlegendcheats.net',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 4322,
  },
  redirects: {
    '/products/borderlands-cheats/': '/products/apex/',
    '/products/borderlands-cheats/elite/': '/products/apex/elite/',
    '/products/borderlands-cheats/utilities/': '/products/apex/utilities/',
    '/products/borderlands-hacks/': '/products/apex/',
    '/products/borderlands-hacks/elite/': '/products/apex/elite/',
    '/products/borderlands-hacks/utilities/': '/products/apex/utilities/',
    '/borderlands-cheats/': '/apex-legends-cheats/',
    '/borderlands-hacks/': '/apex-legends-cheats/',
    '/products/mw4-cheats/': '/products/apex/',
    '/products/mw4-cheats/elite/': '/products/apex/elite/',
    '/products/mw4-cheats/utilities/': '/products/apex/utilities/',
    '/products/mw4-hacks/': '/products/apex/',
    '/products/mw4-hacks/elite/': '/products/apex/elite/',
    '/products/mw4-hacks/utilities/': '/products/apex/utilities/',
    '/mw4-cheats/': '/apex-legends-cheats/',
    '/mw4-hacks/': '/apex-legends-cheats/',
    '/go/mw4/': '/go/apex/',
    '/go/borderlands/': '/go/apex/',
    '/go/bodycam/': '/go/apex/',
    '/go/fortnite/': '/go/apex/',
    '/cheats/': '/products/apex/',
    '/cheats/lite/': '/products/apex/lite/',
    '/cheats/pro/': '/products/apex/pro/',
    '/cheats/elite/': '/products/apex/elite/',
    '/cheats/compare/': '/blog/apex-lite-vs-pro/',
    '/hacks/': '/products/apex/',
    '/hacks/lite/': '/products/apex/lite/',
    '/hacks/pro/': '/products/apex/pro/',
    '/hacks/elite/': '/products/apex/elite/',
    '/hacks/compare/': '/blog/apex-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/apex/',
    '/products/dota-2-cheats/elite/': '/products/apex/elite/',
    '/products/dota-2-cheats/utilities/': '/products/apex/utilities/',
    '/products/dota-2-hacks/': '/products/apex/',
    '/products/dota-2-hacks/elite/': '/products/apex/elite/',
    '/products/dota-2-hacks/utilities/': '/products/apex/utilities/',
    '/products/fortnite-cheats/': '/products/apex/',
    '/products/fortnite-cheats/elite/': '/products/apex/elite/',
    '/products/fortnite-cheats/utilities/': '/products/apex/utilities/',
    '/products/fortnite-hacks/': '/products/apex/',
    '/products/fortnite-hacks/elite/': '/products/apex/elite/',
    '/products/fortnite-hacks/utilities/': '/products/apex/utilities/',
    '/contact/': '/support/',
    ...SLUG_REDIRECTS,
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
