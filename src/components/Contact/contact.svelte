<script>
import { translations, _ } from 'svelte-intl'

translations.update({
	en: {
		contact: 'Contact'
	},
	pl: {
		contact: 'Kontakt'
	},
})

</script>

<h2 id="contact">{$_('contact')}</h2>
