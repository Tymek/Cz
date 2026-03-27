<script lang="ts">
	import { registerTranslations, _ } from '$lib/i18n'

	export let login: string
	const link = `https://github.com/${login}`

	const texts = {
		followLabel: 'Follow @Tymek on GitHub',
		followText: 'Follow @Tymek'
	}

	registerTranslations(texts, {
		pl: {
			[texts.followLabel]: "Obserwuj @Tymek na GitHub'ie",
			[texts.followText]: 'Obserwuj @Tymek'
		}
	})
</script>

<a
	class="github-button"
	href={link}
	data-color-scheme="no-preference: dark; light: dark; dark: dark;"
	data-size="large"
	data-show-count="true"
	aria-label={$_(texts.followLabel)}
>
	{$_(texts.followText)}
</a>

<svelte:head>
	<script async defer src="https://buttons.github.io/buttons.js"></script>
</svelte:head>
