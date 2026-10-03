<script>
	import { browser } from '$app/environment'
	import { onMount, onDestroy } from 'svelte'
	import { filter, map, once, pipe, prop, uniq } from 'ramda'
	import getData from './getData'

	const autoRotateSpeed = (2 * Math.PI) / 24000

	let container
	let graph
	let width, height
	let observer = null
	let isVisible = false
	let autoRotateReady = false
	let autoRotateEnabled = true
	let autoRotateFrame = null
	let lastAutoRotateTimestamp = 0
	let controlsStartHandler = null
	let pulseTimer = null
	let pulseLinks = []
	let burstLink = null
	let motionPreference = null
	let destroyed = false

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
		// Custom renderer keeps graph controls from blocking page scroll.
		const ForceGraph3D = (await import('./customRenderer/forceGraph')).default
		const {
			SphereGeometry,
			Mesh,
			MeshBasicMaterial,
			SpriteMaterial,
			SRGBColorSpace,
			TextureLoader,
			Sprite
		} = await import('three')
		if (destroyed) return

		graph = ForceGraph3D()
		graph.backgroundColor('rgba(0,0,0,0)')
		graph.linkWidth(1)
		graph.linkOpacity(0.033)
		graph.linkVisibility(({ source }) => !groups.has(source.id))
		graph.linkColor(() => '#000000')
		// Single-hop packets: quiet edges punctuated by cool, asynchronous signals.
		graph.linkDirectionalParticles(0)
		graph.linkDirectionalParticleSpeed(0.008)
		graph.linkDirectionalParticleThreeObject(() => {
			const color = Math.random() < 0.5 ? '#20b8db' : '#548cff'
			const packet = new Mesh(
				new SphereGeometry(0.8, 8, 8),
				new MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthWrite: false })
			)
			// A soft halo keeps packets luminous without bloom or holiday-style colors.
			packet.add(
				new Mesh(
					new SphereGeometry(2.2, 8, 8),
					new MeshBasicMaterial({ color, transparent: true, opacity: 0.12, depthWrite: false })
				)
			)
			return packet
		})
		pulseLinks = data.links.filter(({ source }) => !groups.has(source.id ?? source))
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

	const stopPulses = () => {
		clearTimeout(pulseTimer)
		pulseTimer = null
		burstLink = null
	}

	const startPulses = () => {
		if (
			destroyed ||
			!graph ||
			!autoRotateReady ||
			!isVisible ||
			document.hidden ||
			motionPreference?.matches ||
			!pulseLinks.length ||
			pulseTimer !== null
		) {
			return
		}

		const emitPulse = () => {
			const link = burstLink ?? pulseLinks[Math.floor(Math.random() * pulseLinks.length)]
			graph.emitParticle(link)

			// Occasionally send a closely spaced second packet down the same edge.
			const followUp = !burstLink && Math.random() < 0.45
			burstLink = followUp ? link : null
			pulseTimer = setTimeout(emitPulse, followUp ? 30 : 60 + Math.random() * 173)
		}

		pulseTimer = setTimeout(emitPulse, 40 + Math.random() * 133)
	}

	const updatePulses = () => {
		stopPulses()
		startPulses()
	}

	const startGraphMotion = () => {
		if (destroyed || !graph || !isVisible) {
			return
		}

		autoRotateReady = true
		graph.resumeAnimation()
		graph.d3ReheatSimulation()
		startAutoRotate()
		startPulses()
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

	const initialize = once(async () => {
		setTimeout(() => {
			if (destroyed) return
			startGraphMotion()
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

		window.addEventListener('orientationchange', onOrientationChange, { passive: true })
	})

	onMount(async () => {
		motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
		motionPreference.addEventListener('change', updatePulses)
		document.addEventListener('visibilitychange', updatePulses)

		const skills = await fetch('/skills.tsv')
		const text = await skills.text()
		const nodes = await getData(text)
		if (destroyed) return
		const links = getLinks(nodes)
		const groups = new Set(getGroups(nodes).map(prop('id')))

		observer = IntersectionObserver
			? new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						isVisible = entry.isIntersecting

						if (entry.isIntersecting) {
							initialize()
							graph.linkColor(({ source }) => (groups.has(source) ? '#ffffff00' : '#000000'))

							if (autoRotateReady) {
								startGraphMotion()
							}
						} else {
							graph.pauseAnimation()
							stopAutoRotateLoop()
							stopPulses()
						}
					})
				})
			: null

		const groupLinks = getGroupLinks(nodes)

		const data = {
			nodes: [...nodes],
			links: [...links, ...groupLinks]
		}

		await create3dGraph(data, groups)
		if (destroyed) return
		attachControlsListeners()

		if (observer) {
			observer.observe(container)
		} else {
			isVisible = true
			initialize()

			if (autoRotateReady) {
				startGraphMotion()
			}
		}
	})

	onDestroy(() => {
		destroyed = true
		if (browser) {
			stopAutoRotate()
			stopPulses()
			graph?.pauseAnimation()
			motionPreference?.removeEventListener('change', updatePulses)
			document.removeEventListener('visibilitychange', updatePulses)

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
		margin: 0;
		box-sizing: border-box;
		overflow: hidden;

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
