<script>
	import { onMount } from 'svelte'
	import { locale, getBrowserLocale } from 'svelte-intl'

	onMount(() => {
		locale.set(getBrowserLocale('en'))
	});

	// import Nav from '../components/Nav.svelte';

	// export let segment;
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

<!-- <Nav {segment}/> -->

<main>
	<slot></slot>
</main>
