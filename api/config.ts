import { getConfig, updateConfigKey } from '../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, response: VercelResponse) => {
	if (
		!request.cookies.admin_token ||
		decodeURIComponent(request.cookies.admin_token) !== process.env.ADMIN_TOKEN
	) {
		return response.redirect(`/dashboard?message=${encodeURI('Invalid admin token.')}`)
	}

	if (request.method === 'GET') {
		const data = await getConfig()
		return response.json(data)
	}

	if (request.method === 'POST' && request.body) {
		await Promise.all(
			Object.keys(request.body).map((key) => updateConfigKey(key, request.body[key]))
		)
		return response.redirect(`/dashboard?message=${encodeURI('Config updated.')}`)
	}

	return response.redirect(`/dashboard?message=${encodeURI('Invalid request.')}`)
}
