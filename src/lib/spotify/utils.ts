import { getConfig } from '../db'
import fetch from 'isomorphic-fetch'
import config from './config'

const { authUrl, apiUrl } = config
const base64 = (input: string) => Buffer.from(input).toString('base64')

export const getToken = async (requestBodyParameters: Record<string, string>) => {
	const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = await getConfig()
	const opt = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${base64(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)}`
		},
		body: new URLSearchParams(requestBodyParameters)
	}

	return fetch(`${authUrl}/api/token`, opt)
}

export const queryApi = async (accessToken: string, endpoint: string) =>
	fetch(`${apiUrl}${endpoint}`, {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((response) => response.json())
