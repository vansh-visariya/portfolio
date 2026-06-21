import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [mdx(), sitemap()],
  site: 'https://vanshvisariya.is-a.dev',
  adapter: cloudflare()
});