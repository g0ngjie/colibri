import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': 'packages/shell-chrome-origin/src',
    },
  },
  plugins: [vue(), VueJsx({
    transformOn: true,
    mergeProps: true,
  })],
})
