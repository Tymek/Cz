<script>
	import { onDestroy } from 'svelte'
	import { locale, translations, _ } from 'svelte-intl'
	import { format, formatDistance, parseISO } from 'date-fns'
	import Block from '../../block.svelte'
	import { pl } from 'date-fns/locale'

	const texts = {
		lastBuild: 'Last build: {time}',
		moreToCome: 'More to come',
		planned: 'TODO',
		location: 'My location'
	}

	translations.update({
		pl: {
			[texts.lastBuild]: 'Ostatnia aktualizacja: {time}',
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
	$: time = format(timestamp, 'PPPP, pppp', { locale: currentLocale })
	$: distance = formatDistance(timestamp, new Date(), { locale: currentLocale, addSuffix: true })
</script>

<Block background={'#e8e8e8'} color="#4B3445" height={1} title={$_(texts.moreToCome)}>
	{$_(texts.lastBuild, {
		time: `${time} (${distance})`
	})}
</Block>
