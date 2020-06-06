import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import svg from 'rollup-plugin-svg'
import json from '@rollup/plugin-json'
import moment from 'moment'
import pkg from './package.json'

const commonSvelteConfig = require('./svelte.config.js')
const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)

const commonPlugins = [
	svg(),
	json(),
	commonjs(),
]

const __buildDate__ = () => moment().toISOString()

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		preserveEntrySignatures: 'strict',
		plugins: [
			replace({
				__buildDate__,
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			...commonPlugins,
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				...commonSvelteConfig,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead',
					}],
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true,
					}],
				],
			}),

			!dev && terser({
				module: true,
			}),
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				__buildDate__,
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			...commonPlugins,
			svelte({
				generate: 'ssr',
				dev,
				...commonSvelteConfig,
			}),
			resolve({
				dedupe: ['svelte'],
			}),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives')),
		),

		onwarn,
	},
}
