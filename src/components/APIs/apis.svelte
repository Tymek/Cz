<script>
  import { translations, _ } from 'svelte-intl'
  import GitHub from './components/github/github.svelte'
  import GitLab from './components/gitlab.svelte'
  import Spotify from './components/spotify/spotify.svelte'
  import StackOverflow from './components/stackoverflow.svelte'
  import Block from './components/block.svelte'
  import moment from 'moment'

  const texts = {
    lastBuild: 'Last build: {time}',
    moreToCome: 'More to come',
    planned: 'TODO',
    location: 'My location',
  }

  translations.update({
    pl: {
      [texts.lastBuild]: 'Ostatnia aktualizacja: {time}',
      [texts.moreToCome]: 'Będzie więcej',
      [texts.planned]: 'Planowane',
      [texts.location]: 'Moja lokalizacja',
    },
  })

  const buildTimestamp = "__buildDate__"
</script>

<style type="text/scss" lang="scss">
  .wrapper {
    padding: 2rem 2rem 5rem;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
		}

    min-height: 90vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    // grid-template-rows: repeat(auto-fit, 1fr);
    align-content: start;
    // grid-auto-flow: column;
    gap: 1rem;
  }

  h4 {
    margin-bottom: 0.5rem;
  }
  ul {
    list-style: square;
    margin-top: 0;
  }
</style>

<section id="links" class="wrapper">
  <Spotify />
  <StackOverflow />
  <GitHub />
  <GitLab />
  <Block
    background={'#e8e8e8'}
    color="white"
    height={1}
    title={$_(texts.moreToCome)}
  >
    {$_(texts.lastBuild, { time: `${moment(buildTimestamp).format('LLLL Z')} (${moment(buildTimestamp).fromNow()})` })}

    <h4>{$_(texts.planned)}</h4>
    <ul>
      <li>Instagram</li>
      <li>{$_(texts.location)}</li>
    </ul>
  </Block>

  <!-- other?
  instagram? -->
</section>
