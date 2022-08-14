import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        // FIXME: debug
        // drop_console: true,
        drop_debugger: true,
      }
    },
    chunkSizeWarningLimit: 1 << 10, // 1024Kb -> 1M
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // extensions: ['.ts', '.js', '.vue', '.json', 'tsx'],
  },
  plugins: [
    vue(),
    VueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    splitVendorChunkPlugin(),
  ]
})
