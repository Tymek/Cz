import { json } from '@sveltejs/kit'
import fetch from 'isomorphic-fetch'
import { getIntegration, updateIntegration } from '$lib/db'
import { getErrorMessage } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

const fields = ['id', 'media_url', 'thumbnail_url', 'timestamp', 'caption', 'media_type'].join(',')
const apiUrl = 'https://graph.instagram.com'

export const GET: RequestHandler = async () => {
	try {
		const auth = await getIntegration('instagram')

		const me = await fetch(
			`${apiUrl}/me/media?${new URLSearchParams({
				fields,
				access_token: String(auth?.access_token ?? '')
			}).toString()}`
		).then((response) => response.json())

		const data = await fetch(
			`${apiUrl}/refresh_access_token?${new URLSearchParams({
				grant_type: 'ig_refresh_token',
				access_token: String(auth?.access_token ?? '')
			}).toString()}`
		).then((response) => response.json())

		await updateIntegration('instagram', data)

		return json(me?.data?.[0], {
			headers: { 'cache-control': 'max-age=10800, stale-while-revalidate=3600' }
		})
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
