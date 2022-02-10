<script>
	import { browser, dev } from '$app/env'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	onMount(() => {
		if (browser && $page?.url?.searchParams?.get('ref') !== 'uptime' && !dev) {
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

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			fathom('set', 'siteId', import.meta.env.VITE_PUBLIC_FATHOM_ID || 'YNERF') // eslint-disable-line no-undef

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			fathom('trackPageview') // eslint-disable-line no-undef
		}
	})
</script>
