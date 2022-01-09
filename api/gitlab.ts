import fetch from 'isomorphic-fetch'
import { getConfig } from '../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const query = async (endpoint: string) =>
	fetch(`https://gitlab.com${endpoint}`).then((response) => response.json())

export default async (request: VercelRequest, response: VercelResponse) => {
	const { GITLAB_USER } = await getConfig()

	try {
		const data: Record<string, string> = await query(`/users/${GITLAB_USER}/calendar.json`)

		response.setHeader('Cache-Control', 'max-age=300, stale-while-revalidate=300')
		return response.json(data)
	} catch (error) {
		return response.status(500).json({ message: error.message })
	}
}
