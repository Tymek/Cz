import type { DashboardItem } from '$lib/dashboardItem'

const instagramDashboard: DashboardItem = {
	title: 'Instagram',
	color: '#00b9ff',
	fields: [
		{ key: 'INSTAGRAM_CLIENT_ID', label: 'Client ID' },
		{ key: 'INSTAGRAM_CLIENT_SECRET', label: 'Client Secret', type: 'password' }
	],
	actions: [
		{ label: 'Authorize', url: '/api/instagram/login' },
		{ label: 'Test API', url: '/api/instagram' }
	]
}

export default instagramDashboard
