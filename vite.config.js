import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import path from 'path'

export default defineConfig({
  plugins: [svelte({ preprocess: [sveltePreprocess({ postcss: true })] })],
  resolve: {
    alias: {
      src: path.resolve('src/'),
      $: path.resolve('src/lib/'),
      '@assets': path.resolve('src/assets'),
    },
  },
})
