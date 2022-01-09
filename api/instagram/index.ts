import fetch from 'isomorphic-fetch'
import { getIntegration, updateIntegration } from '../../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const fields = ['id', 'media_url', 'thumbnail_url', 'timestamp', 'caption', 'media_type'].join(',')

const apiUrl = 'https://graph.instagram.com'

export default async (request: VercelRequest, response: VercelResponse) => {
	try {
		const auth = await getIntegration('instagram')

		const me = await fetch(
			`${apiUrl}/me/media?${new URLSearchParams({
				fields,
				access_token: auth.access_token
			}).toString()}`
		).then((res) => res.json())

		const data = await fetch(
			`${apiUrl}/refresh_access_token?${new URLSearchParams({
				grant_type: 'ig_refresh_token',
				access_token: auth.access_token
			}).toString()}`
		).then((res) => res.json())

		await updateIntegration('instagram', data)

		response.setHeader('Cache-Control', 'max-age=10800, stale-while-revalidate=3600')
		return response.json(me?.data?.[0])
	} catch (error) {
		return response.status(500).json({ message: error.message })
	}
}
