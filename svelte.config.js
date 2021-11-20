import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import svg from '@poppanator/sveltekit-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		vite: {
			plugins: [svg({ type: 'component' })]
		}
	}
};

export default config;
