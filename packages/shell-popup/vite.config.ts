import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from "unocss";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
  plugins: [
    vue(),
    VueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
      ]
    })
  ]
})
