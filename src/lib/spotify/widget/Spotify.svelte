<script lang="ts">
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import Block from '$components/Block.svelte'
	import Song from './components/song.svelte'
	import type { Song as SongType } from './types'

	const texts = {
		recentlyPlayed: 'Recently played:',
		nowPlaying: 'Now playing:',
		activeDevice: 'Active device:',
		followers: 'Followers:',
		volume: 'Volume:'
	}

	translations.update({
		pl: {
			[texts.recentlyPlayed]: 'Ostatnio odtwarzane:',
			[texts.nowPlaying]: 'Aktualnie gra:',
			[texts.activeDevice]: 'Aktywne urządzenie:',
			[texts.followers]: 'Obserwujących:',
			[texts.volume]: 'Głośność:'
		}
	})

	let songs: SongType[] = []
	let activeDevice: Record<string, string | number> = {}
	let nowPlaying: Partial<SongType> = {}
	let link = ''
	let image = ''
	let followers: number = null

	onMount(async () => {
		try {
			const response = await fetch('/api/spotify')
			const {
				now_playing,
				recently_played,
				device,
				is_playing,
				url,
				image: profile_image,
				followers: followers_count
			} = (await response.json()) || {}

			songs = recently_played

			if (is_playing && now_playing) {
				nowPlaying = {
					...now_playing,
					url: now_playing['spotify']
				}
			}

			activeDevice = device

			link = url
			image = profile_image
			followers = followers_count
		} catch (error) {
			console.error(error)
		}
	})
</script>

{#if songs && songs.length != 0}
	<Block background="#2ebd59" color="white" title="Spotify" height={2} {link}>
		{#if nowPlaying && Object.keys(nowPlaying).length != 0}
			<div class="now_playing">
				<h4>{$_(texts.nowPlaying)}</h4>

				<Song
					name={nowPlaying.name}
					album={nowPlaying.album}
					artists={nowPlaying.artists}
					images={nowPlaying.images}
					url={nowPlaying.external_urls.spotify}
				/>
			</div>
		{/if}

		<div class="recently_played">
			<h4>{$_(texts.recentlyPlayed)}</h4>

			{#each songs as { name, artists, images, external_urls, album }}
				<Song {...{ name, album, artists, images, url: external_urls?.spotify }} />
			{/each}
		</div>

		<div class="info">
			<img src={image} alt="spotify" />
			<div>
				<small>
					{$_(texts.followers)}
					{followers}
					{#if activeDevice && Object.keys(activeDevice).length != 0}<br />
						{$_(texts.activeDevice)}
						{activeDevice?.type}<br />
						{#if activeDevice?.volume && activeDevice?.volume < 100}
							{$_(texts.volume)} {activeDevice?.volume}%
						{/if}
					{/if}
				</small>
			</div>
		</div>
	</Block>
{/if}

<style type="text/scss" lang="scss">
	h4 {
		margin: 1rem 0 0.5rem;
	}

	.recently_played {
		padding-bottom: 1.5rem;
	}

	.info {
		display: flex;
		align-items: center;
		line-height: 1.2;

		img {
			display: inline-block;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			margin-right: 1rem;
			object-fit: cover;
		}
		small {
			font-size: 0.8967474303rem;
		}
	}
</style>
