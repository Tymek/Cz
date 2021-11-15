<script>
  import { onMount } from 'svelte'
  import { translations, _ } from 'svelte-intl'
  import axios from 'axios'
  import {
    isEmpty,
  } from 'ramda'
  import Event from './components/event.svelte'
  import Block from '../block.svelte'
  import Flair from '../flair.svelte'

  const link = 'https://github.com/Tymek'
  // https://github.com/primer/octicons-v2

  let data = {}
  let bio = ''

  const texts = {
    followLabel: 'Follow @Tymek on GitHub',
    followText: 'Follow @Tymek',
    activity: 'Activity'
  }

  translations.update({
    pl: {
      [texts.followLabel]: 'Obserwuj @Tymek na GitHub\'ie',
      [texts.followText]: 'Obserwuj @Tymek',
      [texts.activity]: 'Aktywność',
    },
  })

  const loadData = async () => {
    const response = await axios.get('/api/github')

    data = response.data

    const emojis = await axios.get('/api/github/emojis')

    bio = response.data.bio.replace('😎', `
      <img class="emoji" src="${emojis.data['sunglasses']} alt="smug emoji" />
    `)
  }

  onMount(loadData)
</script>

<style type="text/scss" lang="scss">
  :global(.emoji) {
    height: 1em;
    min-height: 16.8px;
  }

  ul {
    margin: 0.5rem (2rem / 16) 1rem;
    padding: 0;
    list-style: none;
  }

  h4 {
    margin-bottom: 0.5rem;
  }
</style>

<Block
  background={'#24292E'}
  color="white"
  height={2}
  title="GitHub"
  link={link}
>
  {#if !isEmpty(data)}
    <Flair
      image={data.avatar_url}
      name={data.login}
    >
      {@html bio}
    </Flair>

    <h4>{$_(texts.activity)}</h4>
    <ul>
      {#each data.events as event}
        <Event {event} />
      {/each}
    </ul>

  {/if}
  <a
    class="github-button"
    href={link}
    data-color-scheme="no-preference: dark; light: dark; dark: dark;"
    data-size="large"
    data-show-count="true"
    aria-label={$_(texts.followLabel)}
  >
    {$_(texts.followText)}
  </a>
</Block>

<svelte:head>
	<script async defer src="https://buttons.github.io/buttons.js"></script>
</svelte:head>
