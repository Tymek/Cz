<script>
	import { onMount } from 'svelte'
	import { registerTranslations, _ } from '$lib/i18n'

	const texts = {
		stackHeadline: "Code is cheap now, let's build something interesting"
	}

	registerTranslations(texts, {
		pl: {
			[texts.stackHeadline]: 'Programowanie potaniało, więc zbudujmy coś ciekawego'
		}
	})

	let graph

	function load() {
		graph = import('./LazyComponent.svelte')
	}

	onMount(() => {
		load()
	})
</script>

<section class="graph-container">
	<!-- <h2 id="stack" class="heading">{$_(texts.stackHeadline)}</h2> -->

	{#if graph}
		{#await graph then { default: Graph }}
			<Graph />
		{/await}
	{/if}
</section>

<style lang="scss">
	.graph-container {
		min-height: 95vh;
	}
	.heading {
		box-sizing: border-box;
		padding: 0 2rem;
		color: var(--color-catalina-blue);

		@media (orientation: landscape) {
			padding: 0 10vw;
		}

		@media (prefers-color-scheme: dark) {
			color: var(--color-bright);
		}
	}
</style>
