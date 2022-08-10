import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from "path";

const staticFiles = ['manifest.json', 'icons'].map(file => {
    return {
        src: file,
        dest: '.',
    }
});

export default defineConfig({
    build: {
        minify: "terser",
        rollupOptions: {
            input: {
                content: resolve(__dirname, "src/content.js"),
                // background: resolve(__dirname, "src/background.js"),
                document: resolve(__dirname, "src/document.js"),
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
        outDir: resolve(__dirname, "build"),
        terserOptions: {
            compress: {
                // 生产移除console
                // drop_console: true,
                drop_debugger: true
            }
        }
    },
    plugins: [
        viteStaticCopy({
            targets: staticFiles,
        }),
    ]
})