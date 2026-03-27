<script>
	import Intro from '$components/Intro/Intro.svelte'
	import Graph from '$components/Graph/Graph.svelte'
	import Footer from '$components/Footer.svelte'
	import Braid from '$components/Braid.svelte'
</script>

<svelte:head>
	<title>Tymoteusz Czech &ndash; www.tymek.cz</title>
</svelte:head>

<div class="gradient-bg"></div>
<Intro />
<!-- <Integrations /> -->
<Braid defs />
<Braid />
<Graph />

<!-- {#if features.contact}
	<Contact />
{/if} -->
<Footer />

<style lang="scss">
	.gradient-bg {
		z-index: 0;
		width: 100%;
		// background-image: linear-gradient(
		// 	180deg,
		// 	var(--color-whisper) 0%,
		// 	var(--color-light) 100%
		// ) !important;
		height: 100vh;
		pointer-events: none;
		position: fixed;
		top: 0;
	}
</style>
