import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import svelteConfig from './svelte.config.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const gitignorePath = path.resolve(dirname, '.gitignore')

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{
		ignores: ['legacy/**', '.vercel/**', '.vercel_build_output/**'],
		linterOptions: {
			reportUnusedDisableDirectives: 'off'
		}
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-undef': 'off',
			'no-useless-assignment': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			'svelte/no-at-html-tags': 'off',
			'svelte/no-immutable-reactive-statements': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-useless-mustaches': 'off',
			'svelte/prefer-svelte-reactivity': 'off',
			'svelte/require-each-key': 'off'
		}
	}
)
