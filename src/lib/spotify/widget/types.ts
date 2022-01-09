export type Image = {
	url: string
	width: number
	height: number
}

export type Song = {
	name: string
	artists: string[]
	album: string
	images: Image[]
	external_urls: {
		spotify: string
	}
}
