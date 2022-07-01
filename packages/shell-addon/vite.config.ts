import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    Unocss({
      presets: [
        presetUno(),
        presetIcons()
      ]
    })
  ]
})
