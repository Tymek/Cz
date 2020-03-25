<script>
import Typewritter from './typewritter.svelte';
import { translations, _ } from 'svelte-intl';

translations.update({
	en: {
		description: [
			'Self-taught coder',
			'Self-taught programmer',
			'Web front-end expert',
			'Problem solver',
			'ReactJS developer',
			'ReactJS expert',
			'DevOps advocate',
			'Computer user',
			'Human being',
		].join('; '),
	},
	pl: {
		description: [
			'Programista',
			'Rozwiązywacz problemów',
			'Specjalista od internetu',
			'Programista ReactJS',
			'Programista ReactJS \u2013 Ekspert',
			'Użytkownik komputera',
			'Człowiek',
			'Fan open-source',
		].join('; '),
	},
})
</script>
<style>
  .container {
    padding: 2rem;
  }

	h1 {
		font-size: 2.441em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0;
	}

	/* @media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
  } */

  figure {
    max-width: 30vw;
    position: relative;
    padding: 1px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  img {
    width: 100%;
    display: block;
	}
	
	.bio {
		display: flex;
	}
</style>

<div class="container">
  <h1>
    <span>Tymoteusz Czech</span>
  </h1>
  <Typewritter lines={$_('description').split('; ')} />
	<div class="bio">
		<div class="description">
			<p>Hi! I'm Tymek. You can call me Tim. I use new technology to make life better. This pursuit lead me to specialize in creating websites.</p>
		</div>
		<figure>
			<img src="/photo.jpg" alt="Tymek" />
		</figure>
	</div>
</div>
