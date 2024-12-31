import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['iife', 'cjs', 'esm'],
    dts: true,
    // minify: true,
    // sourcemap: true,
    clean: true,
    target: ['esnext', 'node16'],
    // globalName: 'TraceSdk',
    platform: 'browser',
    // footer: {
    //     js: 'globalThis.TraceSDK = require("./index").TraceSDK;',
    // },
});
