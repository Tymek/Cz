import type { DashboardItem } from '$lib/dashboardItem'

const spotifyDashboard: DashboardItem = {
	title: 'Spotify',
	color: '#1DB954',
	fields: [
		{ key: 'SPOTIFY_CLIENT_ID', label: 'Client ID' },
		{ key: 'SPOTIFY_CLIENT_SECRET', label: 'Client Secret', type: 'password' }
	],
	actions: [
		{ label: 'Authorize', url: '/api/spotify/login' },
		{ label: 'Test API', url: '/api/spotify' }
	]
}

export default spotifyDashboard
