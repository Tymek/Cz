import { json } from '@sveltejs/kit'
import { getConfig, updateConfigKey } from '$lib/db'
import { ensureAdmin, redirectToDashboard } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies }) => {
	ensureAdmin(cookies)

	return json(await getConfig())
}

export const POST: RequestHandler = async ({ cookies, request }) => {
	ensureAdmin(cookies)

	const formData = await request.formData()

	await Promise.all(
		Array.from(formData.entries()).map(([key, value]) =>
			updateConfigKey(key, typeof value === 'string' ? value : value.name)
		)
	)

	return redirectToDashboard('Config updated.')
}
