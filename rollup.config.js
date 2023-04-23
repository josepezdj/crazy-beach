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
import html from '@open-wc/rollup-plugin-html';
import { HTMLTemplate} from './html-build-template';

export default {
	input: 'main.js',
	output: [
		{
			dir: 'build',
			format: 'es',
			sourcemap: 'true',
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
		html({
			name: 'index.html',
			inject: false,
			template: HTMLTemplate
		}),
		babel({
			presets: ['@babel/preset-env'],
			exclude: 'node_modules/**',
			babelHelpers: 'bundled',
			// extensions: ['.js', '.html']
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs(),
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
