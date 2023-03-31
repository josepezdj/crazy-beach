import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
import image from '@rollup/plugin-image';
import copy from "rollup-plugin-copy";

export default {
    input: 'src/main.js',
    output: [
        {
            dir: 'lib',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve({
            browser: true,
        }),
        postcss({
            minimize: false,
        }),
        litcss(),
        image(),
        copy({
            targets: [
              { src: "src/assets/*", dest: "lib/assets" }
            ]
          }),
    ],
    preserveEntrySignatures: false,
};
