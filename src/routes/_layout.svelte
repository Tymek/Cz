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
		box-sizing: border-box;
		background-color: #f4f4f4;
		line-height: 1.65em;
	}
</style>

<main>
	<slot></slot>
</main>
