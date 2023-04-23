import babel from '@rollup/plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import litcss from 'rollup-plugin-postcss-lit';
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'main.js',
	output: [
		{
			dir: 'build',
			format: 'iife',
			sourcemap: 'inline',
		},
	],
	plugins: [
		postcss(),
		litcss(),
		image(),
		json(),
		eslint({
			exclude: ['src/**/*.scss', 'assets/**/*.*', 'package*.*', 'build/**/*.*']
		}),
		commonjs(),
		babel({
			presets: ['@babel/preset-env'],
			exclude: 'node_modules/**',
			babelHelpers: 'bundled',
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		terser(),
		copy({
			targets: [
				{src: 'assets/*', dest: 'build/assets'},
				{src: 'manifest.webmanifest', dest: 'build'},
				{src: 'index.html', dest: 'build'},
				{src: 'service-worker.js', dest: 'build'},
			],
		}),
	],
	preserveEntrySignatures: false,
};
