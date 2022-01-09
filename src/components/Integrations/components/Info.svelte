<script>
	import { onDestroy } from 'svelte'
	import { locale, translations, _ } from 'svelte-intl'
	import { format, parseISO } from 'date-fns'
	import pl from 'date-fns/locale/pl/index.js'
	import TimeSince from '$components/TimeSince.svelte'
	import Block from '$components/Block.svelte'

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

	let currentLocale = undefined
	const unsubscribe = locale.subscribe((newLocale) => {
		if (newLocale === 'pl') {
			currentLocale = pl
		} else {
			currentLocale = undefined
		}
	})

	onDestroy(unsubscribe)

	const buildTimestamp = JSON.parse('__BUILD_TIMESTAMP__')
	const timestamp = parseISO(buildTimestamp)
</script>

<Block background={'#e8e8e8'} color="#4B3445" height={1} title={$_(texts.moreToCome)}>
	{$_(texts.lastBuild)}
	{format(timestamp, 'PPPP, pppp', { locale: currentLocale })} (<TimeSince
		date={buildTimestamp}
		addSuffix
	/>)
	<h3>Stack</h3>
	<p>SvelteKit, SCSS, Vercel</p>
</Block>
