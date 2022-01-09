import type { DashboardItem } from '$lib/dashboardItem'

const spotifyDashboard: DashboardItem = {
	title: 'GitHub',
	color: '#24292E',
	fields: [
		{ key: 'GITHUB_USER', label: 'github.com/username' },
		{ key: 'GITHUB_TOKEN', label: 'Personal access token', type: 'password' }
	],
	actions: [{ label: 'Test API', url: '/api/github' }]
}

export default spotifyDashboard
