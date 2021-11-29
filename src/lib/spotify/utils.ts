import fetch from 'isomorphic-fetch'
import config from './config'

const { authUrl, apiUrl, client_id, client_secret } = config
const base64 = (input: string) => Buffer.from(input).toString('base64')

export const getToken = async (requestBodyParameters: Record<string, string>) => {
	const opt = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${base64(client_id + ':' + client_secret)}`
		},
		body: new URLSearchParams(requestBodyParameters)
	}

	return fetch(`${authUrl}/api/token`, opt)
}

export const queryApi = async (accessToken: string, endpoint: string) =>
	fetch(`${apiUrl}${endpoint}`, {
		headers: { Authorization: `Bearer ${accessToken}` }
	}).then((response) => response.json())
