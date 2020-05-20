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
