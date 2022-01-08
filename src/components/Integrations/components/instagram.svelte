<script>
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import axios from 'axios'
	import { isEmpty } from 'ramda'
	import Block from '../../Block.svelte'

	const texts = {
		thisYear: 'this year'
	}

	translations.update({
		pl: {
			[texts.thisYear]: 'w tym roku'
		}
	})

	let data = {}

	const loadData = async () => {
		const response = await axios.get('/api/upload')

		data = response.data
	}

	onMount(loadData)
</script>

{#if !isEmpty(data)}
	<Block
		background={'#00b9ff'}
		color="white"
		height={1}
		link="https://www.instagram.com/tymek.cz/"
		title="Instagram"
	>
		<img src={data.instagram} alt="latest photo" />
	</Block>
{/if}

<style type="text/scss" lang="scss">
	img {
		max-width: 100%;
		display: block;
		margin-top: -0.5rem;
	}
</style>
