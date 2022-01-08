<script lang="ts">
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import Block from '$components/Block.svelte'
	import Song from './components/song.svelte'
	import type { Song as SongType } from './types'

	const texts = {
		recentlyPlayed: 'Recently played:',
		nowPlaying: 'Now playing:',
		activeDevice: 'Active device:'
	}

	translations.update({
		pl: {
			[texts.recentlyPlayed]: 'Ostatnio odtwarzane:',
			[texts.nowPlaying]: 'Aktualnie gra:',
			[texts.activeDevice]: 'Aktywne urządzenie:'
		}
	})

	let songs: SongType[] = []
	let activeDevice: Record<string, string | number> = {}
	let nowPlaying: Partial<SongType> = {}

	onMount(async () => {
		try {
			const response = await fetch('/api/spotify')
			const { now_playing, recently_played, devices, is_playing } = (await response.json()) || {}

			songs = recently_played

			if (is_playing && now_playing) {
				nowPlaying = {
					...now_playing,
					url: now_playing['spotify']
				}
			}

			activeDevice = devices && devices.length && devices.find(({ is_active }) => is_active)
		} catch (error) {
			console.error(error)
		}
	})
</script>

{#if songs && songs.length != 0}
	<Block
		background="#2ebd59"
		color="white"
		title="Spotify"
		height={2}
		link="https://open.spotify.com/user/jpp2v0ccdb23k3yvjjvb"
	>
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
				{#if activeDevice && Object.keys(activeDevice).length != 0}
					<small>
						{$_(texts.activeDevice)}
						{activeDevice?.type}<br />
						{activeDevice?.volume_percent &&
							activeDevice?.volume_percent < 100 &&
							`Volume: ${activeDevice?.volume_percent}%`}
					</small>
				{/if}
			</div>
		{/if}

		<div class="recently_played">
			<h4>{$_(texts.recentlyPlayed)}</h4>

			{#each songs as { name, artists, images, external_urls, album }}
				<Song {...{ name, album, artists, images, url: external_urls?.spotify }} />
			{/each}
		</div>

		<iframe
			src="https://open.spotify.com/follow/1/?uri=spotify:user:jpp2v0ccdb23k3yvjjvb&amp;size=detail&amp;theme=dark"
			width="300"
			height="56"
			scrolling="no"
			frameborder="0"
			style="border:none; overflow:hidden;"
			allowtransparency
			title=""
		/>
	</Block>
{/if}

<style type="text/scss" lang="scss">
	h4 {
		margin: 1rem 0 0.5rem;
	}

	.recently_played {
		padding-bottom: 1.5rem;
	}

	small {
		font-size: 0.8967474303rem;
	}
</style>
