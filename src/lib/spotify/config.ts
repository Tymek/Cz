import config from '../config'

const scopes = [
	// 'app-remote-control',
	// 'playlist-modify-private',
	// 'playlist-modify-public',
	// 'playlist-read-collaborative',
	// 'playlist-read-private',
	// 'streaming',
	// 'user-follow-modify',
	'user-follow-read',
	// 'user-library-modify',
	'user-library-read',
	// 'user-modify-playback-state',
	'user-read-birthdate',
	'user-read-currently-playing',
	'user-read-email',
	'user-read-playback-state',
	'user-read-private',
	'user-read-recently-played',
	'user-top-read'
]

export const apiUrl = 'https://api.spotify.com/v1'
export const authUrl = 'https://accounts.spotify.com'
export const scope = scopes.join(' ')
export const client_id = process.env.SPOTIFY_CLIENT_ID
export const client_secret = process.env.SPOTIFY_CLIENT_SECRET
export const redirect_uri =
	process.env.SPOTIFY_REDIRECT_URI || `${config.rootUrl}/api/spotify/login`
export const showDialog =
	process.env.SPOTIFY_SHOW_DIALOG !== undefined
		? process.env.SPOTIFY_SHOW_DIALOG
		: `${process.env.NODE_ENV === 'development'}`
export const recentlyPlayedLimit = 10

export default {
	apiUrl,
	authUrl,
	scope,
	client_id,
	client_secret,
	redirect_uri,
	showDialog,
	recentlyPlayedLimit
}
