<script>
	import { onMount } from 'svelte'
	import { locale, translations, getBrowserLocale } from 'svelte-intl'
	translations.update({
		en: {},
		pl: {},
	})

	locale.set('en')

	onMount(() => {
		locale.set(getBrowserLocale('en'))
	});

	export let segment
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<main>
	<slot></slot>
</main>
