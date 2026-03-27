import { json } from '@sveltejs/kit'
import fetch from 'isomorphic-fetch'
import { getConfig } from '$lib/db'
import { pick } from '$lib/utils'
import { getErrorMessage } from '$lib/server/dashboard'
import type { RequestHandler } from './$types'

type ActivityEvent = {
	type: string
	repo: string
	created_at: string
	action?: string
}

type GithubApiEvent = {
	type: string
	repo?: { name?: string }
	created_at: string
	payload?: { action?: string }
}

const queryApi = async (token: string, endpoint: string) =>
	fetch(`https://api.github.com${endpoint}`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((response) => response.json())

export const GET: RequestHandler = async () => {
	const config = await getConfig()
	const user = String(config.GITHUB_USER ?? '')
	const token = String(config.GITHUB_TOKEN ?? '')
	const query = queryApi.bind(null, token)

	try {
		const profileResponse: Record<string, unknown> = await query(`/users/${user}`)
		const profile = pick(profileResponse, [
			'login',
			'name',
			'avatar_url',
			'html_url',
			'bio',
			'created_at',
			'public_repos',
			'public_gists'
		])

		const events: GithubApiEvent[] = await query(`/users/${user}/events/public`)

		let activity = events
			.map(
				({ type, repo, created_at, payload }): ActivityEvent => ({
					type,
					repo: repo?.name || '',
					created_at,
					action: payload?.action
				})
			)
			.filter((event) => event.repo)

		activity = activity.filter(
			(event, index, list) =>
				list.findIndex((item) => item.repo === event.repo && item.action === event.action) === index
		)

		activity = activity.reduce<[ActivityEvent[], number]>(
			(acc, event) => {
				const [items, count] = acc

				if (event.type === 'WatchEvent') {
					return count < 4 ? [[...items, event], count + 1] : acc
				}

				return [[...items, event], count]
			},
			[[], 0]
		)[0]

		activity = activity.reduce<[ActivityEvent[], number]>(
			(acc, event) => {
				const [items, count] = acc

				if (event.type === 'PushEvent') {
					return count < 4 ? [[...items, event], count + 1] : acc
				}

				return [[...items, event], count]
			},
			[[], 0]
		)[0]

		return json(
			{ profile, activity: activity.slice(0, 10) },
			{ headers: { 'cache-control': 'max-age=900, stale-while-revalidate=300' } }
		)
	} catch (error) {
		return json({ message: getErrorMessage(error) }, { status: 500 })
	}
}
