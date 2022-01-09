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

const addLinkCount = (data) => (item) => ({
	...item,
	inboundLinksCount: data.filter(({ links }) => links?.includes(item.tech)).length
})

const getData = async (input) => {
	const Papa = (await import('papaparse')).default

	return new Promise((resolve) =>
		Papa.parse(input, {
			worker: true,
			header: true,
			complete: function (results) {
				const output = results.data
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
