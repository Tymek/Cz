<script lang="ts">
	import { onDestroy } from 'svelte'
	import { locale } from 'svelte-intl'
	import { formatDistance, parseISO } from 'date-fns'
	import pl from 'date-fns/locale/pl/index.js'

	export let date: string
	export let addSuffix: boolean = false

	let currentLocale = undefined
	const unsubscribe = locale.subscribe((newLocale) => {
		if (newLocale === 'pl') {
			currentLocale = pl
		} else {
			currentLocale = undefined
		}
	})

	onDestroy(unsubscribe)

	const timestamp = parseISO(date)
	$: distance = formatDistance(timestamp, new Date(), { locale: currentLocale, addSuffix })
</script>

<span>
	{distance}
</span>
