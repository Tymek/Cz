import { getToken, queryApi } from '../../src/lib/spotify/utils'
import { recentlyPlayedLimit } from '../../src/lib/spotify/config'
import { getIntegration, updateIntegration } from '../../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const refreshToken = async (token: string) =>
	getToken({
		grant_type: 'refresh_token',
		refresh_token: token
	})

const reAuthorize = async (token) => {
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

const getTrackInfo = (track) => ({
	id: track?.id,
	name: track?.name,
	popularity: track?.popularity,
	artists: track?.artists?.map((artist) => artist?.name),
	album: track?.album?.name,
	images: track?.album?.images,
	external_urls: track?.external_urls
})

export default async (request: VercelRequest, response: VercelResponse) => {
	let auth = await getIntegration('spotify')

	try {
		const query = queryApi.bind(null, auth.access_token as string)

		let me = await query('/me')

		if (me?.error) {
			auth = await reAuthorize(auth?.refresh_token)
			me = await query('/me')

			if (me?.error) {
				throw new Error('Connection error.')
			}
		}

		const player = await query('/me/player')
		const recentlyPlayed = await query('/me/player/recently-played')

		const isPrivate = player?.device?.is_private_session

		let data = {
			name: me?.display_name,
			url: me?.external_urls.spotify,
			image: me?.images[0]?.url,
			is_playing: player?.is_playing,
			now_playing: getTrackInfo(player?.item),
			isPrivate,
			device: {
				volume: player?.device?.volume_percent,
				type: player?.device?.type,
				id: player?.device?.id
			},
			recentlyPlayed: recentlyPlayed?.items
				?.filter((item, index) => index < recentlyPlayedLimit)
				.map((item) => ({
					playedAt: item?.played_at,
					...getTrackInfo(item?.track)
				}))
		}

		response.setHeader('Cache-Control', 'max-age=300, stale-while-revalidate=60')
		return response.json(data)
	} catch (error) {
		return response.status(500).json({ message: error.message })
	}
}
