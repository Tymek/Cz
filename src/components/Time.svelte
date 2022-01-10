<script lang="ts">
	import { onDestroy } from 'svelte'
	import { locale } from 'svelte-intl'
	import { format as formatDate } from 'date-fns'
	import pl from 'date-fns/locale/pl/index.js'

	export let date: Date
	export let format = 'PPPP, pppp'

	let currentLocale = undefined
	const unsubscribe = locale.subscribe((newLocale) => {
		if (newLocale === 'pl') {
			currentLocale = pl
		} else {
			currentLocale = undefined
		}
	})

	onDestroy(unsubscribe)
</script>

<span>
	{formatDate(date, format, { locale: currentLocale })}
</span>
