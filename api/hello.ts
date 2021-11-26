import { updateIntegration } from '../src/lib/db'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, response: VercelResponse) => {
	const { name = 'World' } = request.query

	// try {
	// 	await updateIntegration('spotify', { userId: 'tester' })
	// } catch (err) {
	// 	if (process.env.NODE_ENV === 'development') {
	// 		throw err
	// 	}

	// 	// TODO: sentry?
	// 	return response.status(500).json({ message: 'failed to update' })
	// }

	response.status(200).json({
		message: `Hello ${name}!`,
		dev: process.env.NODE_ENV,
		url: process.env.VERCEL_URL
		// import: import.meta.env
	})
}
