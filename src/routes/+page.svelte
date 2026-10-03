<script>
	import Intro from '$components/Intro/Intro.svelte'
	import Graph from '$components/Graph/Graph.svelte'
	import Footer from '$components/Footer.svelte'
	import Braid from '$components/Braid.svelte'
</script>

<svelte:head>
	<title>Tymoteusz Czech &ndash; www.tymek.cz</title>
</svelte:head>

<Intro />

<Braid defs />
<Braid />
<Graph />

<Footer />
