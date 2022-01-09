import type { DashboardItem } from '$lib/dashboardItem'

const gitlabDashboard: DashboardItem = {
	title: 'GitLab',
	color: '#3f3177',
	fields: [{ key: 'GITLAB_USER', label: 'GitLab username' }],
	actions: [{ label: 'Test API', url: '/api/gitlab' }]
}

export default gitlabDashboard
