import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['iife', 'cjs', 'esm'],
    dts: true,
    // minify: false,
    sourcemap: true,
    clean: true,
    target: ['esnext', 'node16'],
    platform: 'browser'
});
