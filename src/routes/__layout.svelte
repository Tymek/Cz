<script>
	import Analytics from '../components/Analytics.svelte'

	import { onMount } from 'svelte'
	import { locale, translations, getBrowserLocale } from 'svelte-intl'
	// import moment from 'moment'
	// import 'moment/locale/pl'

	translations.update({
		en: {},
		pl: {}
	})

	locale.set('en')
	// moment.locale('en')

	onMount(() => {
		const browserLocale = getBrowserLocale('en')

		locale.set(browserLocale)
		// moment.locale(browserLocale)
	})

	// export let segment
</script>

<main>
	<slot />
	<Analytics />
</main>

<style type="text/scss" lang="scss">
	:global(:root, html, body) {
		font-size: 14px;
		font-family: Spartan, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue',
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

		@media (min-width: 1681px) {
			font-size: 0.833333333vw;
		}
	}

	@font-face {
		font-family: 'Spartan';
		font-weight: 100 900;
		font-display: swap;
		src: local('Spartan'), url('/fonts/spartan.woff2') format('woff2-variations');
	}

	@font-face {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400 900;
		src: url('/fonts/playfair-display.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Playfair Display';
		font-style: italic;
		font-weight: 400 900;
		src: url('/fonts/playfair-display-italic.woff2') format('woff2');
	}

	main {
		position: relative;
		box-sizing: border-box;
		/* background-color: #f4f4f4; */
		line-height: 1.65em;
	}
</style>
