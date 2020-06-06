<script>
  import {
    head,
  } from 'ramda'

  export let name = ''
  export let artists = []
  export let album = ''
  export let images = []
  export let url = ''

  const title = `${name}${name && artists.length && ' – '}${artists.length && artists.join(', ')}`
  const srcSet = images.map(({ width, height, url }) => `${url}${
    width ? ` ${width}w` : (height ? ` ${height}h` : '') // eslint-disable-line no-nested-ternary
  }`).join(', ')
</script>

<style lang="scss">
  a {
    display: block;
    text-decoration: none;
    font-size: 0.8967474303rem;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: visible;
    text-overflow: ellipsis;
    margin-bottom: (0.8967474303rem / 4);
  }

  img {
    max-height: 1.75rem;
    vertical-align: middle;
  }
</style>

<a
  target="_blank"
  rel="noopener noreferrer"
  href={url}
>
  <img
    class="cover"
    src={head(images).url}
    srcSet={srcSet}
    alt={album}
    title={album}
  />
  {title}
</a>
