import fetch from 'isomorphic-fetch'
import { getConfig } from '../src/lib/db'
import { pick } from '../src/lib/utils'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, response: VercelResponse) => {
	const { STACKEXCHANGE_USER_ID } = await getConfig()

	try {
		const data = await fetch(
			`https://api.stackexchange.com/2.2/users/${STACKEXCHANGE_USER_ID}?site=stackoverflow`
		).then((response) => response.json())

		const profile = data?.items?.[0]

		response.setHeader('Cache-Control', 'max-age=10800, stale-while-revalidate=3600')
		return response.json(
			pick(profile, [
				'badge_counts',
				'display_name',
				'reputation_change_year',
				'reputation',
				'creation_date',
				'link',
				'profile_image'
			])
		)
	} catch (error) {
		return response.status(500).json({ message: error.message })
	}
}
