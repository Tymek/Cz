import { redirect } from '@sveltejs/kit'
import type { Cookies } from '@sveltejs/kit'

export const dashboardUrl = (message: string) => `/dashboard?message=${encodeURIComponent(message)}`

export const redirectToDashboard = (message: string): never => redirect(303, dashboardUrl(message))

export const ensureAdmin = (cookies: Cookies) => {
	if (cookies.get('admin_token') !== process.env.ADMIN_TOKEN) {
		redirectToDashboard('Invalid admin token.')
	}
}

export const getErrorMessage = (error: unknown) =>
	error instanceof Error ? error.message : 'Unknown error'
