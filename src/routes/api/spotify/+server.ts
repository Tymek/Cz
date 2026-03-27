import { json } from '@sveltejs/kit'
import { recentlyPlayedLimit } from '$lib/spotify/config'
import { getToken, queryApi } from '$lib/spotify/utils'
import { getIntegration, updateIntegration } from '$lib/db'
import { getErrorMessage } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

const refreshToken = async (token: string) =>
	getToken({
		grant_type: 'refresh_token',
		refresh_token: token
	})

const reAuthorize = async (token: string) => {
	if (!token) {
		throw new Error('Authorization failed.')
	}

	const refreshTokenResponse = await refreshToken(token)
	const auth = await refreshTokenResponse.json()

	await updateIntegration('spotify', auth).catch(() => {
		throw new Error('Error while updating Spotify integration.')
	})

	return auth
}

const getTrackInfo = (track: any) => ({
	id: track?.id,
	name: track?.name,
	popularity: track?.popularity,
	artists: track?.artists?.map((artist: any) => artist?.name),
	album: track?.album?.name,
	images: track?.album?.images,
	external_urls: track?.external_urls
})

export const GET: RequestHandler = async () => {
	let auth = await getIntegration('spotify')

	try {
		let query = queryApi.bind(null, String(auth?.access_token ?? ''))
		let me = await query('/me')

		if (me?.error) {
			auth = await reAuthorize(String(auth?.refresh_token ?? ''))
			query = queryApi.bind(null, String(auth?.access_token ?? ''))
			me = await query('/me')

			if (me?.error) {
				throw new Error('Connection error.')
			}
		}

		const player = await query('/me/player')
		const recentlyPlayed = await query('/me/player/recently-played')

		return json(
			{
				name: me?.display_name,
				url: me?.external_urls?.spotify,
				image: me?.images?.[0]?.url,
				is_playing: player?.is_playing,
				now_playing: player?.is_playing && player?.item ? getTrackInfo(player.item) : undefined,
				is_private: player?.device?.is_private_session,
				followers: me?.followers?.total,
				device: {
					volume: player?.device?.volume_percent,
					type: player?.device?.type
				},
				recently_played: recentlyPlayed?.items
					?.filter((_item: any, index: number) => index < recentlyPlayedLimit)
					.map((item: any) => ({
						playedAt: item?.played_at,
						...getTrackInfo(item?.track)
					}))
			},
			{ headers: { 'cache-control': 'max-age=300, stale-while-revalidate=60' } }
		)
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
