<script>
	import { browser } from '$app/environment'
	import { onMount, onDestroy } from 'svelte'
	import { filter, map, once, pipe, prop, uniq } from 'ramda'
	import getData from './getData'

	const showAxies = false
	const autoRotateDelay = 5000
	const autoRotateSpeed = (2 * Math.PI) / 24000
	// import { CustomTrackballControls } from './customControls'

	let container
	let graph
	let width, height
	let observer = null
	let isVisible = false
	let autoRotateReady = false
	let autoRotateEnabled = true
	let autoRotateFrame = null
	let autoRotateTimeout = null
	let lastAutoRotateTimestamp = 0
	let controlsStartHandler = null

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
			SRGBColorSpace,
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
			imgTexture.colorSpace = SRGBColorSpace
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

	const stopAutoRotate = () => {
		autoRotateEnabled = false
		lastAutoRotateTimestamp = 0

		if (autoRotateTimeout) {
			clearTimeout(autoRotateTimeout)
			autoRotateTimeout = null
		}

		if (autoRotateFrame) {
			cancelAnimationFrame(autoRotateFrame)
			autoRotateFrame = null
		}
	}

	const stopAutoRotateLoop = () => {
		lastAutoRotateTimestamp = 0

		if (autoRotateFrame) {
			cancelAnimationFrame(autoRotateFrame)
			autoRotateFrame = null
		}
	}

	const rotateCamera = (timestamp) => {
		if (!autoRotateEnabled || !autoRotateReady || !isVisible || !graph) {
			stopAutoRotateLoop()
			return
		}

		const camera = graph.camera?.()
		const controls = graph.controls?.()

		if (!camera || !controls?.target) {
			stopAutoRotateLoop()
			return
		}

		if (!lastAutoRotateTimestamp) {
			lastAutoRotateTimestamp = timestamp
		}

		const delta = timestamp - lastAutoRotateTimestamp
		lastAutoRotateTimestamp = timestamp

		const target = controls.target
		const offsetX = camera.position.x - target.x
		const offsetZ = camera.position.z - target.z
		const angle = delta * autoRotateSpeed
		const cos = Math.cos(angle)
		const sin = Math.sin(angle)

		camera.position.x = target.x + offsetX * cos - offsetZ * sin
		camera.position.z = target.z + offsetX * sin + offsetZ * cos
		camera.lookAt(target)

		autoRotateFrame = requestAnimationFrame(rotateCamera)
	}

	const startAutoRotate = () => {
		if (!autoRotateEnabled || !autoRotateReady || !isVisible || !graph || autoRotateFrame) {
			return
		}

		lastAutoRotateTimestamp = 0
		autoRotateFrame = requestAnimationFrame(rotateCamera)
	}

	const scheduleAutoRotate = () => {
		if (!autoRotateEnabled || autoRotateReady || autoRotateTimeout) {
			return
		}

		autoRotateTimeout = setTimeout(() => {
			autoRotateReady = true
			autoRotateTimeout = null
			startAutoRotate()
		}, autoRotateDelay)
	}

	const attachControlsListeners = () => {
		const controls = graph?.controls?.()

		if (!controls || controlsStartHandler) {
			return
		}

		controlsStartHandler = () => {
			stopAutoRotate()
		}

		controls.addEventListener('start', controlsStartHandler)
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
		scheduleAutoRotate()
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
						isVisible = entry.isIntersecting

						if (entry.isIntersecting) {
							initialize(groups)
							graph.linkColor(({ source }) => (groups.has(source) ? '#ffffff00' : '#000000'))
							graph.resumeAnimation()
							graph.d3ReheatSimulation()
							startAutoRotate()
						} else {
							graph.pauseAnimation()
							stopAutoRotateLoop()
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
		attachControlsListeners()

		if (observer) {
			observer.observe(container)
		} else {
			isVisible = true
			initialize(groups)
			startAutoRotate()
		}
	})

	onDestroy(() => {
		if (browser) {
			stopAutoRotate()

			if (window !== undefined) {
				window.removeEventListener('orientationchange', onOrientationChange)
			}

			if (controlsStartHandler) {
				graph?.controls?.()?.removeEventListener('start', controlsStartHandler)
			}

			if (observer) {
				observer.unobserve(container)
			}
		}
	})
</script>

<!-- TODO: aria-label="list of my skills" -->
<figure bind:this={container} bind:clientWidth={width} bind:clientHeight={height}></figure>

<style type="text/scss" lang="scss">
	figure {
		position: relative;
		width: 100%;
		height: 95vh;
		min-height: 30rem;
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
		pointer-events: none;
	}
</style>
