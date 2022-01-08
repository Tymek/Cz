import { getConfig } from '../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'isomorphic-fetch'

type Event = { type: string; repo: string; created_at: string; action?: string }

const queryApi = async (token: string, endpoint: string) =>
	fetch(`https://api.github.com${endpoint}`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((response) => response.json())

const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]) =>
	keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})

export default async (request: VercelRequest, response: VercelResponse) => {
	const { GITHUB_USER, GITHUB_TOKEN } = await getConfig()
	const query = queryApi.bind(null, GITHUB_TOKEN)

	try {
		const user: Record<string, string> = await query(`/users/${GITHUB_USER}`)
		const profile = pick(user, [
			'login',
			'name',
			'avatar_url',
			'html_url',
			'bio',
			'created_at',
			'public_repos',
			'public_gists'
		])

		const events = await query(`/users/${GITHUB_USER}/events/public`)

		let activity: Event[] = events.map(
			({ type, repo: { name }, created_at, payload: { action } }) => ({
				type,
				repo: name,
				created_at,
				action
			})
		)
		activity = activity.filter(
			(event, i, self) =>
				self.findIndex((x) => x.repo === event.repo && x.action === event.action) === i
		)
		activity = activity.reduce(
			([acc, count], event) => {
				if (event.type === 'WatchEvent') {
					return count < 3 ? [[...acc, event], count + 1] : [acc, count]
				}
				return [[...acc, event], count]
			},
			[[], 0] as [Event[], number]
		)[0] as Event[]
		activity = activity.reduce(
			([acc, count], event) => {
				if (event.type === 'PushEvent') {
					return count < 3 ? [[...acc, event], count + 1] : [acc, count]
				}
				return [[...acc, event], count]
			},
			[[], 0] as [Event[], number]
		)[0] as Event[]
		activity = activity.slice(0, 9)

		const data = { profile, activity }

		response.setHeader('Cache-Control', 'max-age=300, stale-while-revalidate=300')
		return response.json(data)
	} catch (error) {
		return response.status(500).json({ message: error.message })
	}
}
