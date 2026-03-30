const addImage = (item) => ({
	...item,
	// img: (() => {
	//   const img = new Image()
	//   img.src = `./svg/${item.id.toLowerCase().replace(' ', '-')}.svg`
	//   return img
	// })(),
	img3d: item.color ? `/logos/png/${item.id.toLowerCase().replace(/\s/g, '-')}.png` : null
})

const originsToArray = (item) => ({
	...item,
	links: item.origin ? item.origin.split(/, /) : []
})

const normalizeRow = (item) =>
	Object.fromEntries(
		Object.entries(item).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
	)

const addLinkCount = (data) => (item) => ({
	...item,
	inboundLinksCount: data.filter(({ links }) => links?.includes(item.tech)).length
})

const getData = async (input) => {
	const Papa = (await import('papaparse')).default

	return new Promise((resolve) =>
		Papa.parse(input, {
			delimiter: '\t',
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				const rows = Array.isArray(results.data) ? results.data : []
				const output = rows
					.filter((item) => item && typeof item === 'object')
					.map(normalizeRow)
					.map((item) => ({ ...item, id: item.tech }))
					.filter(({ id }) => !!id)
					.map(originsToArray)
					.map(addImage)
				resolve(output.map(addLinkCount(output)))
			}
		})
	)
}

export default getData
