<script>
	import { translations, _ } from 'svelte-intl'
	import GitHub from '$lib/github/widget/Github.svelte'
	import Spotify from '$lib/spotify/widget/Spotify.svelte'
	import GitLab from '$lib/gitlab/widget/Gitlab.svelte'
	import Info from './components/Info.svelte'
</script>

<section id="links" class="wrapper">
	<div class="contents">
		<Spotify />
		<GitHub />
		<GitLab />
		<!--
	<StackOverflow />
	<Instagram />
	-->
		<Info />
	</div>
</section>

<style type="text/scss" lang="scss">
	.wrapper {
		padding: 2rem 2rem 5rem;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
		}
	}

	.contents {
		margin: 0 -1rem; // Visual align

		min-height: 90vh;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		align-content: start;
		gap: 1rem;
	}
</style>
