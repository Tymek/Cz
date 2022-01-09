import { getConfig, updateIntegration } from '../../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const authUrl = 'https://api.instagram.com/oauth'
const scope = ['user_profile', 'user_media']

const redirect_uri = `${
	process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
}/api/instagram/login`

export default async (request: VercelRequest, response: VercelResponse) => {
	const { INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET } = await getConfig()
	const authorizationUrl = `${authUrl}/authorize?${new URLSearchParams({
		client_id: `${INSTAGRAM_CLIENT_ID}`,
		scope: scope.join(','),
		response_type: 'code',
		redirect_uri
	}).toString()}`

	if (
		!request.cookies.admin_token ||
		decodeURIComponent(request.cookies.admin_token) !== process.env.ADMIN_TOKEN
	) {
		return response.redirect(`/dashboard?message=${encodeURI('Invalid admin token.')}`)
	}

	const { code } = request.query

	if (!code || typeof code !== 'string') {
		return response.redirect(authorizationUrl)
	}

	try {
		const requestBodyParameters = {
			client_id: `${INSTAGRAM_CLIENT_ID}`,
			client_secret: `${INSTAGRAM_CLIENT_SECRET}`,
			grant_type: 'authorization_code',
			redirect_uri,
			code
		}
		const opt = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(requestBodyParameters)
		}

		const { access_token: short_access_token, user_id } = await fetch(
			`${authUrl}/access_token`,
			opt
		).then((res) => res.json())

		const { access_token, expires_in } = await fetch(
			`https://graph.instagram.com/access_token?${new URLSearchParams({
				grant_type: 'ig_exchange_token',
				client_secret: `${INSTAGRAM_CLIENT_SECRET}`,
				access_token: short_access_token
			})}`
		).then((res) => res.json())

		await updateIntegration('instagram', { access_token, user_id, expires_in }).catch(() => {
			throw new Error('Error while updating Spotify integration.')
		})

		return response.redirect(
			`/dashboard?message=${encodeURI('Successfully authorized Instagram account.')}`
		)
	} catch (error) {
		return response.status(500).send({ message: error.message })
	}
}
