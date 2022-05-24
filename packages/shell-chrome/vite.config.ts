import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': 'packages/shell-chrome/src',
    },
  },
  plugins: [vue(), VueJsx({
    transformOn: true,
    mergeProps: true,
  })],
})
