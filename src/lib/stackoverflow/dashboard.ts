import type { DashboardItem } from '$lib/dashboardItem'

const stackoverflowDashboard: DashboardItem = {
	title: 'StackOverflow',
	color: '#ffcf10',
	fields: [{ key: 'STACKEXCHANGE_USER_ID', label: 'StackExchange user ID' }],
	actions: [{ label: 'Test API', url: '/api/stackoverflow' }]
}

export default stackoverflowDashboard
