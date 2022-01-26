<script>
	import features from '$lib/features'
	import Intro from '$components/Intro/Intro.svelte'
	import Integrations from '$components/Integrations/Integrations.svelte'
	import Graph from '$components/Graph/Graph.svelte'
	import Contact from '$components/Contact/Contact.svelte'
	import Footer from '$components/Footer.svelte'
</script>

<svelte:head>
	<title>Tymoteusz Czech &ndash; www.tymek.cz</title>
</svelte:head>

<div class="gradient-bg" />
<Intro />
<Integrations />
<Graph />
{#if features.contact}
	<Contact />
{/if}
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
