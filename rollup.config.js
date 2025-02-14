import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const globalName = 'TraceSDK';

// nodejs -> esm
// browser -> umd
// commonJs -> cjs
// RequireJS -> amd

export default {
    input: 'lib/browser/index.ts',
    output: [
        // {
        //     file: './dist/bundle.js',
        //     format: 'cjs',
        //     sourcemap: true
        // },
        // {
        //     file: './dist/bundle.min.js',
        //     format: 'iife',
        //     name: globalName,
        //     plugins: [terser()],
        //     sourcemap: true,
        // },
        // {
        //     file: './dist/bundle.esm.js',
        //     format: 'esm',
        //     name: globalName,
        //     sourcemap: true,
        // },
        {
            file: './dist/web.browser.js',
            format: 'umd',
            name: globalName,
            plugins: [terser()],
            sourcemap: true
        }
    ],
    plugins: [
        // 解析 node_modules 中的模块
        resolve(),
        // 压缩代码
        // terser(),
        // 处理 TypeScript 文件
        typescript()
    ]
}