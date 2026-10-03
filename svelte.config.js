import { resolve } from 'node:path'
import vercel from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: vercel({ runtime: 'nodejs24.x' }),
		alias: {
			$components: resolve('./src/components'),

			$lib: resolve('./src/lib')
		}
	}
}

export default config
