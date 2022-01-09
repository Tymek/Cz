<script>
	import { browser } from '$app/env'
	import { onMount, onDestroy } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import { filter, map, once, pipe, prop, uniq } from 'ramda'
	import getData from './getData'

	const showAxies = false

	const texts = {
		stackHeadline: 'Welcome to my universe'
	}

	translations.update({
		pl: {
			[texts.stackHeadline]: 'Witaj w moim świecie'
		}
	})
	// import { CustomTrackballControls } from './customControls'

	let container
	let isInitialized = false
	let graph
	let width, height
	let observer = null

	const getGroups = pipe(
		map(prop('group')),
		filter((item) => item !== ''),
		uniq,
		map((id) => ({ id }))
	)

	const getLinks = (data) => {
		const links = []

		data.forEach((item) => {
			if (item.links && item.links.length > 0) {
				item.links.forEach((source) => {
					links.push({
						source,
						target: item.id
					})
				})
			}
		})

		return links
	}

	const getGroupLinks = (data) => {
		const links = []

		data.forEach(({ id, group }) => {
			if (group && id) {
				links.push({
					source: group,
					target: id
				})
			}
		})

		return links
	}

	const create3dGraph = async (data, groups) => {
		// IMPORTANT NOTE: Implementation of 'github.com/vasturiano/3d-force-graph' was blocking scroll, hence I scaveged it into './customRenderer'
		// const ForceGraph3D = (await import('3d-force-graph')).default
		const ForceGraph3D = (await import('./customRenderer/forceGraph')).default
		const {
			SphereGeometry,
			Mesh,
			MeshBasicMaterial,
			SpriteMaterial,
			TextureLoader,
			Sprite,
			AxesHelper
		} = await import('./customRenderer/three.js')

		graph = ForceGraph3D()
		graph.backgroundColor('rgba(0,0,0,0)')
		graph.linkWidth(1)
		graph.linkOpacity(0.033)
		graph.linkVisibility(({ source }) => !groups.has(source.id))
		graph.linkColor(() => '#000000')
		graph.showNavInfo(false)
		graph.width(width)
		graph.height(height)
		graph.nodeLabel(({ tech, id }) => {
			return `<label style="
        display: inline-block;
        color: rgba(0, 0, 0, 0.9);
        background: rgba(255, 255, 255, 0.75);
        border-radius: 3px;
        padding: 3px 5px;
        font-weight: 300;
        font-family: Spartan, sans-serif;
      ">${tech || id}</label>`
		})
		graph.onNodeClick((node) => {
			const distance = 150
			const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

			graph.cameraPosition(
				{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
				node, // lookAt ({ x, y, z })
				3000 // ms transition duration
			)
		})
		graph.nodeThreeObject(({ img3d, inboundLinksCount }) => {
			const img = img3d || '/null.png'
			const size = img3d ? 16 + inboundLinksCount : 5

			// use a sphere as a drag handle
			const obj = new Mesh(
				new SphereGeometry(size / 2),
				new MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
			)

			// add img sprite as child
			const imgTexture = new TextureLoader().load(img)
			const material = new SpriteMaterial({ map: imgTexture })
			const sprite = new Sprite(material)
			sprite.scale.set(size, size)
			obj.add(sprite)

			return obj
		})

		graph(container).graphData(data)

		if (showAxies) {
			graph.scene().add(new AxesHelper(20))
		}

		graph.cameraPosition({
			x: 481.2647453222629,
			y: 77.20921029264626,
			z: -644.1876902516968
		})

		graph.pauseAnimation()

		return graph
	}

	const onOrientationChange = () => {
		setTimeout(() => {
			graph.width(width)
			graph.height(height)
		}, 300)
	}

	const initialize = once(async (groups) => {
		setTimeout(() => {
			graph.resumeAnimation()
			graph.d3ReheatSimulation()
			graph.cameraPosition(
				{
					x: 146.0595753216009,
					y: 15.421879817389119,
					z: 469.7235718673174
				},
				undefined,
				3000
			)
		}, 1500)
		// setInterval(() => { // Debug camera position when adding new items
		// 	console.log(graph.camera().position)
		// }, 1000)

		window.addEventListener('orientationchange', onOrientationChange, { passive: true })
	})

	onMount(async () => {
		const skills = await fetch('/skills.tsv')
		const text = await skills.text()
		const nodes = await getData(text)
		const links = getLinks(nodes).map((link) => {
			// link.distance = size * 2
			return link
		})
		const groups = new Set(getGroups(nodes).map(prop('id')))

		observer = IntersectionObserver
			? new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							initialize(groups)
							graph.linkColor(({ source }) => (groups.has(source) ? '#ffffff00' : '#000000'))
							graph.resumeAnimation()
							graph.d3ReheatSimulation()
						} else {
							graph.pauseAnimation()
						}
					})
			  })
			: null

		const groupLinks = getGroupLinks(nodes)

		const data = {
			nodes: [...nodes /*, ...groupNodes*/],
			links: [...links, ...groupLinks]
		}

		await create3dGraph(data, groups)

		if (observer) {
			observer.observe(container)
		} else {
			initialize(groups)
		}
	})

	onDestroy(() => {
		if (browser) {
			if (window !== undefined) {
				window.removeEventListener('orientationchange', onOrientationChange)
			}

			if (observer) {
				observer.unobserve(container)
			}
		}
	})
</script>

<section>
	<h2 id="stack" class="container">{$_(texts.stackHeadline)}</h2>
	<!-- TODO: aria-label="list of my skills" -->
	<figure bind:this={container} bind:clientWidth={width} bind:clientHeight={height} />
</section>

<style type="text/scss" lang="scss">
	.container {
		box-sizing: border-box;
		padding: 0 2rem;
		color: var(--color-catalina-blue);

		@media (orientation: landscape) {
			padding: 0 10vw;
		}

		@media (prefers-color-scheme: dark) {
			color: var(--color-bright);
		}
	}

	figure {
		position: relative;
		width: 100%;
		height: 95vh;
		/* background-color: #eee; */
		margin: 0;
		box-sizing: border-box;
		overflow: hidden;
		// background-image: url('/noisy-texture.png'),
		//   radial-gradient(circle farthest-corner,#f8f8f8 0, #bbbbbb 80%);
		// background-repeat: repeat;
		// background-attachment: fixed, scroll;
		cursor: grab;
	}

	figure:active {
		cursor: grabbing;
	}

	figure:before,
	figure:after {
		content: ' ';
		display: block;
		position: absolute;
		width: 100%;
		height: 10vh;
		z-index: 3;
		pointer-events: none;
	}

	figure:before {
		background: linear-gradient(to bottom, var(--background) 0%, transparent 100%);
		top: 0;
	}
	figure:after {
		bottom: 0;
		background: linear-gradient(to top, var(--background) 0%, transparent 100%);
	}

	:global(.scene-tooltip) {
		position: absolute;
	}
</style>
