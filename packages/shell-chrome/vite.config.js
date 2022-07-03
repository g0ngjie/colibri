import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from "path";

const staticFiles = ['manifest.json', 'icons'].map(file => {
    return {
        src: file,
        dest: '.',
    }
});

console.log("[debug]staticFiles:", staticFiles)

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                content: resolve(__dirname, "src/content.js"),
                background: resolve(__dirname, "src/background.js"),
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
        outDir: resolve(__dirname, "build"),
    },
    plugins: [
        viteStaticCopy({
            targets: staticFiles,
        }),
    ]
})