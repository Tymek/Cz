import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

export const updateIntegration = async (
	platform: string,
	data: Record<string, string | number>
): Promise<void> => {
	const client = await MongoClient.connect(uri)
	const collection = client.db('tymek-cz').collection('integrations')
	await collection.updateOne(
		{ platform },
		{
			$set: { ...data, platform }
		},
		{ upsert: true }
	)
}
