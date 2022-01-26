<script>
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'

	const texts = {
		stackHeadline: 'Welcome to my universe'
	}

	translations.update({
		pl: {
			[texts.stackHeadline]: 'Witaj w moim świecie'
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
	<h2 id="stack" class="heading">{$_(texts.stackHeadline)}</h2>

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
