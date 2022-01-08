<script>
	import { translations, _ } from 'svelte-intl'
	import GitHub from '$lib/github/widget/github.svelte'
	// import GitHub from './components/github/github.svelte'
	// import GitLab from './components/gitlab.svelte'
	import Spotify from '$lib/spotify/widget/spotify.svelte'
	// import StackOverflow from './components/stackoverflow.svelte'
	// import Instagram from './components/instagram.svelte'
	import Info from './components/info.svelte'
</script>

<section id="links" class="wrapper">
	<Spotify />
	<GitHub />
	<!--
	<StackOverflow />
	<GitLab />
	<Instagram />
	-->
	<Info />
</section>

<style type="text/scss" lang="scss">
	.wrapper {
		padding: 2rem 2rem 5rem;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
		}

		min-height: 90vh;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		align-content: start;
		gap: 1rem;
	}
</style>
