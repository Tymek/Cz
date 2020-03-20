<script>
import Typewritter from '../components/typewritter.svelte';
import Graph from '../components/graph.svelte';
import { translations, _ } from 'svelte-intl';

translations.update({
	en: {
		description: [
			'Problem solver',
			'Self-taught coder',
			'Self-taught programmer',
			'Web front-end expert',
			'ReactJS expert',
			'ReactJS developer',
			'Open-source fan',
			'Open-source contributor',
			'Human being',
		].join('; '),
	},
	pl: {
		description: [
			'Programista. Rozwiązywacz problemów. Specjalista od internetu. Koder ReactJS. Człowiek. Fan open-source',
		],
	},
})
</script>
<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Tymoteusz Czech &ndash; www.tymek.cz</title>
</svelte:head>

<h1>Tymoteusz Czech</h1>
<p>
	<Typewritter lines={$_('description').split('; ')} />
</p>

<Graph />
