<script>
  import GitHub from './components/github.svelte'
  import Spotify from './components/spotify.svelte'
  import StackOverflow from './components/stackoverflow.svelte'

</script>

<style type="text/scss">
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
  <GitHub />
  <StackOverflow />
  gitlab?
  other?
  instagram?
</div>
