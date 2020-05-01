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

<style type="text/scss">
	:global(:root, html, body) {
		font-size: 0.833333333vw;

		@media screen and (min-width: 600px) {
			font-size: 16px;
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
