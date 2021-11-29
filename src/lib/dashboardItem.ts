export type DashboardItem = {
	title: string
	color?: string
	fields: Array<{ key: string; label: string; type?: string }>
	actions: Array<{ label: string; url: string }>
}
