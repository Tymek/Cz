<script lang="ts">
	import type { Song as SongType } from '../types'

	export let name: SongType['name']
	export let artists: SongType['artists']
	export let album: SongType['album']
	export let images: SongType['images']
	export let url: SongType['external_urls']['spotify']

	const title = `${name}${name && artists.length && ' – '}${artists.length && artists.join(', ')}`
	const srcSet = images
		.map(
			({ width, height, url }) =>
				`${url}${
					width ? ` ${width}w` : height ? ` ${height}h` : '' // eslint-disable-line no-nested-ternary
				}`
		)
		.join(', ')
</script>

<a target="_blank" rel="noopener noreferrer" href={url}>
	<img class="cover" src={images?.[0]?.url} {srcSet} alt={album} title={album} />
	{title}
</a>

<style lang="scss">
	@use 'sass:math';

	a {
		display: block;
		text-decoration: none;
		font-size: 0.8967474303rem;
		white-space: nowrap;
		overflow-x: hidden;
		overflow-y: visible;
		text-overflow: ellipsis;
		margin-bottom: math.div(0.8967474303rem, 4);
	}

	img {
		max-height: 1.75rem;
		vertical-align: middle;
		aspect-ratio: 1;
		object-fit: cover; // Appropriate for album "cover" art xD
	}
</style>
