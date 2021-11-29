import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

const getCollection = async (collectionName: string) => {
	const client = await MongoClient.connect(uri)
	return client.db('tymek-cz').collection(collectionName)
}

export const updateIntegration = async (
	platform: string,
	data: Record<string, string | number>
): Promise<void> => {
	const collection = await getCollection('integrations')
	await collection.updateOne(
		{ platform },
		{
			$set: { ...data, platform }
		},
		{ upsert: true }
	)
}

export const getIntegration = async (platform: string): Promise<Record<string, any>> => {
	const collection = await getCollection('integrations')
	return collection.findOne({ platform })
}

export const updateConfigKey = async (key: string, value: string | number): Promise<void> => {
	const collection = await getCollection('config')
	await collection.updateOne(
		{ key },
		{
			$set: { key, value }
		},
		{ upsert: true }
	)
}

export const getConfig = async (): Promise<Record<string, string | number>> => {
	const collection = await getCollection('config')
	const data = await collection.find().toArray()
	return data.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {})
}
