<script>
  import GitHub from './components/github.svelte'
  import Spotify from './components/spotify.svelte'

</script>

<style>
  .wrapper {
    min-height: 90vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;
  }
</style>

<div id="links" class="wrapper">
  <Spotify />
  <GitHub />
  stackoverflow
  gitlab?
  other?
  instagram?
</div>
