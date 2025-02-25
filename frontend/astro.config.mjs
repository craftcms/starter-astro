// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const site = env.BASE_URL;
const siteUrl = new URL(site);

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    vue(),
  ],
  site: site,
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'wss',
        host: siteUrl.hostname,
        clientPort: 443,
      },
      host: '0.0.0.0'
    },
  },
});
