<script lang="ts">
	import { onMount } from 'svelte'
	import features from '$lib/features'
	import Block from '$components/Block.svelte'

	type Data = Partial<{
		id: string
		media_url: string
		timestamp: string
		caption: string
		media_type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM'
	}>

	let data: Data = {}

	onMount(async () => {
		const response = await fetch('/api/instagram')

		data = await response.json()
	})

	$: loading = !data || Object.keys(data).length == 0 || features.loader
</script>

<Block
	background={'#00b9ff'}
	color="white"
	height={1}
	link="https://www.instagram.com/tymek.cz/"
	title="Instagram"
	{loading}
	darkLoader
>
	{#if !loading}
		{#if data.media_type === 'VIDEO'}
			<video
				width="100%"
				height="auto"
				src={data.media_url}
				type="video/mp4"
				controls
				playsinline
				muted
			/>
		{:else}
			<img src={data.media_url} alt={data.caption} />
		{/if}
	{/if}
</Block>

<style type="text/scss" lang="scss">
	img,
	video {
		max-width: 100%;
		display: block;
		margin-top: -0.5rem;
		aspect-ratio: 1;
		object-fit: cover;
	}
</style>
