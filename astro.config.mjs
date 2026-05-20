import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// Note: le plugin remark-conceptlink hérité de goorg-site sera réactivé
// quand le glossaire des dispositifs juridiques sera en place.
// import remarkConceptLink from './src/lib/remark-conceptlink.mjs';

export default defineConfig({
  site: 'https://projetplanb.org',
  integrations: [react(), mdx(), sitemap()],
  // Phase 1 : FR uniquement. EN sera ajouté plus tard pour les cas d'étude
  // à portée internationale (Diggers, MST, Mondragón, Burlington CLT, Zapatistes, kibbutz).
  // i18n: {
  //   defaultLocale: 'fr',
  //   locales: ['fr', 'en'],
  //   routing: { prefixDefaultLocale: true }
  // },
  markdown: {
    shikiConfig: { theme: 'css-variables' },
    // remarkPlugins: [remarkConceptLink],
  }
});
