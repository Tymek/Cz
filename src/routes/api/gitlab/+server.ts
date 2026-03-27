import { json } from '@sveltejs/kit'
import fetch from 'isomorphic-fetch'
import { getConfig } from '$lib/db'
import { getErrorMessage } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

const query = async (endpoint: string) =>
	fetch(`https://gitlab.com${endpoint}`).then((response) => response.json())

export const GET: RequestHandler = async () => {
	const config = await getConfig()
	const user = String(config.GITLAB_USER ?? '')

	try {
		const data = await query(`/users/${user}/calendar.json`)

		return json(data, {
			headers: { 'cache-control': 'max-age=3600, stale-while-revalidate=300' }
		})
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
