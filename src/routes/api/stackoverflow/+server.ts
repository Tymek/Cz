import { json } from '@sveltejs/kit'
import fetch from 'isomorphic-fetch'
import { getConfig } from '$lib/db'
import { pick } from '$lib/utils'
import { getErrorMessage } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const config = await getConfig()
	const userId = String(config.STACKEXCHANGE_USER_ID ?? '')

	try {
		const data = await fetch(
			`https://api.stackexchange.com/2.2/users/${userId}?site=stackoverflow`
		).then((response) => response.json())

		const profile = data?.items?.[0]

		return json(
			pick(profile, [
				'badge_counts',
				'display_name',
				'reputation_change_year',
				'reputation',
				'creation_date',
				'link',
				'profile_image'
			]),
			{ headers: { 'cache-control': 'max-age=10800, stale-while-revalidate=3600' } }
		)
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
