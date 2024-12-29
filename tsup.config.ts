import {defineConfig} from "tsup";

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['iife', 'cjs', 'esm'],
    dts: true,
    minify: true,
    sourcemap: true,
    target: ['deno']
})