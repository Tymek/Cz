<script>
  import Block from './block.svelte'
  import { translations, _ } from 'svelte-intl'
  
  const texts = {
    followLabel: 'Follow @Tymek on GitHub',
    followText: 'Follow @Tymek',
  }

  const link = 'https://github.com/Tymek'
  // https://github.com/primer/octicons-v2

  translations.update({
    pl: {
      [texts.description]: [
        'Hej! Jestem Tymek.',
        'Używam nowych technologii, by żyło się łatwiej i ciekawiej.',
        'Moje zainteresowania sprawiły, że specjalizuję się w tworzeniu stron internetowych.',
      ].join('\n'),
      [texts.links]: 'Linki',
      [texts.stack]: 'Stack',
      [texts.contact]: 'Kontakt'
    },
  })
</script>

<Block
  background={'#24292E'}
  color="white"
  title="GitHub"
  link={link}
>
  Suscipit itaque repellat provident iste magni illum id laboriosam adipisci modi praesentium.
  <br />
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
