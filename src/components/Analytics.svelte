<script>
	import { browser, dev } from '$app/env'
	import { onMount } from 'svelte'

	onMount(() => {
		if (browser && !dev) {
			;(function (f, a, t, h, o, m) {
				a[h] =
					a[h] ||
					function () {
						;(a[h].q = a[h].q || []).push(arguments)
					}
				;(o = f.createElement('script')), (m = f.getElementsByTagName('script')[0])
				o.async = 1
				o.src = t
				o.id = 'fathom-script'
				m.parentNode.insertBefore(o, m)
			})(
				document,
				window,
				import.meta.env.VITE_PUBLIC_FATHOM_URL || '//fathom.scrlk.pl/tracker.js',
				'fathom'
			)
			// @ts-ignore
			fathom('set', 'siteId', import.meta.env.VITE_PUBLIC_FATHOM_ID || 'YNERF')
			// @ts-ignore
			fathom('trackPageview')
		}
	})
</script>
