<script>
	import Analytics from '../components/Analytics.svelte'
	import Theme from '../components/Theme.svelte'

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
	<Theme />
	<slot />
	<Analytics />
</main>

<style lang="scss" type="text/scss">
	main {
		position: relative;
		box-sizing: border-box;
		line-height: 1.65em;
		z-index: 1;
	}
</style>
