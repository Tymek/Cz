<script>
	import { onMount } from 'svelte'
	import { locale, translations, getBrowserLocale } from 'svelte-intl'
	import moment from 'moment'
	import 'moment/locale/pl'

	translations.update({
		en: {},
		pl: {},
	})

	locale.set('en')
	moment.locale('en')

	onMount(() => {
		const browserLocale = getBrowserLocale('en')

		locale.set(browserLocale)
		moment.locale(browserLocale)
	});

	// export let segment
</script>

<style type="text/scss" lang="scss">
	:global(:root, html, body) {
		font-size: 14px;

		@media (min-width: 1681px) {
			font-size: 0.833333333vw;
		}
	}

	main {
		position: relative;
		box-sizing: border-box;
		/* background-color: #f4f4f4; */
		line-height: 1.65em;
	}
</style>

<main>
	<slot></slot>
</main>
