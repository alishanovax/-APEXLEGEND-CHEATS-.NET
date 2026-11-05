import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SLUG_REDIRECTS } from './src/config/slug-redirects.mjs';

export default defineConfig({
  site: 'https://r6hacks.org',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 4322,
  },
  redirects: {
    '/products/borderlands-cheats/': '/products/r6/',
    '/products/borderlands-cheats/elite/': '/products/r6/elite/',
    '/products/borderlands-cheats/utilities/': '/products/r6/utilities/',
    '/products/borderlands-hacks/': '/products/r6/',
    '/products/borderlands-hacks/elite/': '/products/r6/elite/',
    '/products/borderlands-hacks/utilities/': '/products/r6/utilities/',
    '/borderlands-cheats/': '/r6-hacks/',
    '/borderlands-hacks/': '/r6-hacks/',
    '/products/mw4-cheats/': '/products/r6/',
    '/products/mw4-cheats/elite/': '/products/r6/elite/',
    '/products/mw4-cheats/utilities/': '/products/r6/utilities/',
    '/products/mw4-hacks/': '/products/r6/',
    '/products/mw4-hacks/elite/': '/products/r6/elite/',
    '/products/mw4-hacks/utilities/': '/products/r6/utilities/',
    '/mw4-cheats/': '/r6-hacks/',
    '/mw4-hacks/': '/r6-hacks/',
    '/go/mw4/': '/go/r6/',
    '/go/borderlands/': '/go/r6/',
    '/go/bodycam/': '/go/r6/',
    '/go/fortnite/': '/go/r6/',
    '/cheats/': '/products/r6/',
    '/cheats/lite/': '/products/r6/lite/',
    '/cheats/pro/': '/products/r6/pro/',
    '/cheats/elite/': '/products/r6/elite/',
    '/cheats/compare/': '/blog/r6-lite-vs-pro/',
    '/hacks/': '/products/r6/',
    '/hacks/lite/': '/products/r6/lite/',
    '/hacks/pro/': '/products/r6/pro/',
    '/hacks/elite/': '/products/r6/elite/',
    '/hacks/compare/': '/blog/r6-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/r6/',
    '/products/dota-2-cheats/elite/': '/products/r6/elite/',
    '/products/dota-2-cheats/utilities/': '/products/r6/utilities/',
    '/products/dota-2-hacks/': '/products/r6/',
    '/products/dota-2-hacks/elite/': '/products/r6/elite/',
    '/products/dota-2-hacks/utilities/': '/products/r6/utilities/',
    '/products/fortnite-cheats/': '/products/r6/',
    '/products/fortnite-cheats/elite/': '/products/r6/elite/',
    '/products/fortnite-cheats/utilities/': '/products/r6/utilities/',
    '/products/fortnite-hacks/': '/products/r6/',
    '/products/fortnite-hacks/elite/': '/products/r6/elite/',
    '/products/fortnite-hacks/utilities/': '/products/r6/utilities/',
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
