import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { chromeExtension } from "rollup-plugin-chrome-extension";

import manifest from "./src/manifest.json";
import { name, version } from "./package.json";

Object.assign(manifest, { name, version });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    chromeExtension({ 
      manifest, 
      contentScripts: { 
        preambleCode:  false
      }
    })
  ]
});
