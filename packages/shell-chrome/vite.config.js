import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/content.js"),
            name: 'content'
        },
        rollupOptions: {
            output: {
                format: "iife",
                name: "[name].js",
            },
        },
        outDir: resolve(__dirname, "build"),
    }
})