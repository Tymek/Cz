<script>
  import { onMount } from 'svelte'
  import { translations, _ } from 'svelte-intl'
  import axios from 'axios'
  import {
    isEmpty,
    map,
    prop,
    find,
  }from 'ramda'
  import Block from '../block.svelte'
  import Song from './components/song.svelte'

  const texts = {
    recentlyPlayed: 'Recently played:',
    nowPlaying: 'Now playing:',
    activeDevice: 'Active device:',
  }

  translations.update({
    pl: {
      [texts.recentlyPlayed]: 'Ostatnio odtwarzane:',
      [texts.nowPlaying]: 'Aktualnie gra:',
      [texts.activeDevice]: 'Aktywne urządzenie:',
    },
  })

  let songs = []
  let activeDevice = {}
  let nowPlaying = {}

  const loadData = async () => {
    const response = await axios.get('/api/spotify')

    const {
      now_playing,
      recently_played,
      devices,
      is_playing,
    } = response.data

    songs = map(({
      external_urls,
      ...song
    }) => ({
      ...song,
      url: external_urls['spotify'],
    }))(recently_played)

    if (is_playing && now_playing) {
      nowPlaying = {
        ...now_playing,
        url: now_playing['spotify'],
      }

      console.log(nowPlaying)
    }
    activeDevice = devices && devices.length && find(prop('is_active'), devices)
  }

  onMount(loadData)
</script>

<style type="text/scss" lang="scss">
  h4 {
    margin: 1rem 0 0.5rem;
  }

  .recently_played {
    padding-bottom: 1.5rem;
  }

  small {
    font-size: 0.8967474303rem;
  }
</style>

<Block
  background="#2ebd59"
  color="white"
  title="Spotify"
  link="https://open.spotify.com/user/jpp2v0ccdb23k3yvjjvb"
>
  {#if !isEmpty(nowPlaying)}
  <div class="now_playing">
    <h4>{$_(texts.nowPlaying)}</h4>

    <Song {...nowPlaying} />
    {#if !isEmpty(activeDevice)}
      <small>
        {$_(texts.activeDevice)} {activeDevice.type}<br />
        {
          activeDevice.volume_percent && activeDevice.volume_percent < 100 && `Volume: ${activeDevice.volume_percent}%`
        }
      </small>
    {/if}
  </div>
  {/if}

  <div class="recently_played">
    <h4>{$_(texts.recentlyPlayed)}</h4>

    {#each songs as song}
      <Song {...song} />
    {/each}
  </div>

  <iframe
    src="https://open.spotify.com/follow/1/?uri=spotify:user:jpp2v0ccdb23k3yvjjvb&amp;size=detail&amp;theme=dark"
    width="300"
    height="56"
    scrolling="no"
    frameborder="0"
    style="border:none; overflow:hidden;"
    allowtransparency="true"
    title=""
  ></iframe>
</Block>
