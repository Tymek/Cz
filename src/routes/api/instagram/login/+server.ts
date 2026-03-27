import { json, redirect } from '@sveltejs/kit'
import fetch from 'isomorphic-fetch'
import { getConfig, updateIntegration } from '$lib/db'
import { ensureAdmin, getErrorMessage, redirectToDashboard } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

const authUrl = 'https://api.instagram.com/oauth'
const scope = ['user_profile', 'user_media']

const redirectUri = `${
	process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173'
}/api/instagram/login`

export const GET: RequestHandler = async ({ cookies, url }) => {
	ensureAdmin(cookies)

	const config = await getConfig()
	const clientId = String(config.INSTAGRAM_CLIENT_ID ?? '')
	const clientSecret = String(config.INSTAGRAM_CLIENT_SECRET ?? '')
	const authorizationUrl = `${authUrl}/authorize?${new URLSearchParams({
		client_id: clientId,
		scope: scope.join(','),
		response_type: 'code',
		redirect_uri: redirectUri
	}).toString()}`

	const code = url.searchParams.get('code')

	if (!code) {
		redirect(303, authorizationUrl)
	}

	try {
		const requestBodyParameters = {
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'authorization_code',
			redirect_uri: redirectUri,
			code
		}

		const tokenOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(requestBodyParameters)
		}

		const { access_token: shortAccessToken, user_id } = await fetch(
			`${authUrl}/access_token`,
			tokenOptions
		).then((response) => response.json())

		const { access_token, expires_in } = await fetch(
			`https://graph.instagram.com/access_token?${new URLSearchParams({
				grant_type: 'ig_exchange_token',
				client_secret: clientSecret,
				access_token: shortAccessToken
			}).toString()}`
		).then((response) => response.json())

		await updateIntegration('instagram', { access_token, user_id, expires_in }).catch(() => {
			throw new Error('Error while updating Instagram integration.')
		})

		redirectToDashboard('Successfully authorized Instagram account.')
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
