<script>
	import { translations, _ } from 'svelte-intl'
	import { parseISO } from 'date-fns'
	import TimeSince from '$components/TimeSince.svelte'
	import Block from '$components/Block.svelte'
	import Time from '$components/Time.svelte'

	const texts = {
		lastBuild: 'Last build:',
		moreToCome: 'More to come',
		planned: 'TODO',
		location: 'My location'
	}

	translations.update({
		pl: {
			[texts.lastBuild]: 'Ostatnia aktualizacja:',
			[texts.moreToCome]: 'Będzie więcej',
			[texts.planned]: 'Planowane',
			[texts.location]: 'Moja lokalizacja'
		}
	})

	const buildTimestamp = JSON.parse('__BUILD_TIMESTAMP__')
	const timestamp = parseISO(buildTimestamp)
</script>

<Block background={'var(--color-light)'} color="#4B3445" height={1} title={$_(texts.moreToCome)}>
	{$_(texts.lastBuild)}
	<Time date={timestamp} /> (<TimeSince date={buildTimestamp} addSuffix />)
	<h3>Stack</h3>
	<p>SvelteKit, SCSS, Vercel, Three.js</p>
</Block>
