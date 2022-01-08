import config from '../../src/lib/spotify/config'
import { getToken } from '../../src/lib/spotify/utils'
import { updateIntegration } from '../../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const { authUrl, scope, client_id, redirect_uri, showDialog } = config

export const authorizationUrl = `${authUrl}/authorize?${new URLSearchParams({
	response_type: 'code',
	scope,
	client_id,
	redirect_uri,
	showDialog
}).toString()}`

export default async (request: VercelRequest, response: VercelResponse) => {
	if (
		!request.cookies.admin_token ||
		decodeURIComponent(request.cookies.admin_token) !== process.env.ADMIN_TOKEN
	) {
		return response.redirect(`/dashboard?message=${encodeURI('Invalid admin token.')}`)
	}

	const { code } = request.query

	if (!code || typeof code !== 'string') {
		return response.redirect(authorizationUrl) // NOTE: can be improved with `state`
	}

	try {
		const tokenResponse = await getToken({
			grant_type: 'authorization_code',
			code,
			redirect_uri
		})

		const data = await tokenResponse.json()

		if (tokenResponse.status !== 200) {
			return response.status(tokenResponse.status).json(data) // { error, error_description }
		}

		await updateIntegration('spotify', data).catch(() => {
			throw new Error('Error while updating Spotify integration.')
		})

		return response.redirect(
			`/dashboard?message=${encodeURI('Successfully authorized Spotify account.')}`
		)
	} catch (error) {
		return response.status(500).send({ message: error.message })
	}
}
