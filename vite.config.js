import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve('src/'),
      $: path.resolve('src/lib/'),
      '@assets': path.resolve('src/assets'),
    },
  },
  plugins: [
    svelte({ preprocess: [sveltePreprocess({ postcss: true })] }),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{svelte,js,css,html,ico,png,svg}'] },
      includeAssets: [],
      manifest: {
        name: 'Records',
        short_name: 'Records',
        description: 'A Place to record transactions',
        start_url: '/',
        display: 'standalone',
        background_color: '#e2e8f0',
        theme_color: '#e2e8f0',
        lang: 'en',
        scope: '/',
        prefer_related_applications: false,
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
