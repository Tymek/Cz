<script>
	import { onMount } from 'svelte'

	let graph

	function load() {
		graph = import('./LazyComponent.svelte')
	}

	onMount(() => {
		load()
	})
</script>

<section class="graph-container">
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
</style>
