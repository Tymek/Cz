<script>
  import GitHub from './components/github.svelte'
  import GitLab from './components/gitlab.svelte'
  import Spotify from './components/spotify/spotify.svelte'
  import StackOverflow from './components/stackoverflow.svelte'

</script>

<style type="text/scss" lang="scss">
  .wrapper {
    padding: 2rem 2rem;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
		}

    min-height: 90vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    // grid-template-rows: repeat(auto-fit, 1fr);
    align-content: start;
    gap: 1rem;
  }
  
</style>

<div id="links" class="wrapper">
  <Spotify />
  <GitLab />
  <StackOverflow />
  <GitHub />
  gitlab?
  other?
  instagram?
</div>
