import { json, redirect } from '@sveltejs/kit'
import config from '$lib/spotify/config'
import { getToken } from '$lib/spotify/utils'
import { getConfig, updateIntegration } from '$lib/db'
import { ensureAdmin, getErrorMessage, redirectToDashboard } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

const { authUrl, scope, redirect_uri, showDialog } = config

export const GET: RequestHandler = async ({ cookies, url }) => {
	ensureAdmin(cookies)

	const configValues = await getConfig()
	const clientId = String(configValues.SPOTIFY_CLIENT_ID ?? '')
	const authorizationUrl = `${authUrl}/authorize?${new URLSearchParams({
		response_type: 'code',
		scope,
		client_id: clientId,
		redirect_uri,
		showDialog
	}).toString()}`

	const code = url.searchParams.get('code')

	if (!code) {
		redirect(303, authorizationUrl)
	}

	try {
		const tokenResponse = await getToken({
			grant_type: 'authorization_code',
			code,
			redirect_uri
		})

		const data = await tokenResponse.json()

		if (!tokenResponse.ok) {
			return json(data, { status: tokenResponse.status })
		}

		await updateIntegration('spotify', data).catch(() => {
			throw new Error('Error while updating Spotify integration.')
		})

		redirectToDashboard('Successfully authorized Spotify account.')
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
