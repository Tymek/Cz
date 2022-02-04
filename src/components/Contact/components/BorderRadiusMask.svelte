<script lang="ts">
	export let leftTop = false
	export let leftBottom = false
	export let rightTop = false
	export let rightBottom = false
	export let id: string
	export let response = false
	export let shadow = true
	export let border = true

	let w: number, h: number

	/**
	 * @see https://codepen.io/diiq/pen/rQKWzO
	 */
	const clothoidCurvePoints = (() => {
		const defaultRadius = 15
		const smallRadius = 3
		// Curve precision
		const defaultCount = 7

		/**
		 * A lookup table of fresnel integrals; why string-indexed? Because toFixed()
		 * is the only way to avoid floating point errors.
		 */
		const fresnel = {
			'0.00': [0, 0],
			'0.05': [6.54497748e-5, 0.04999992289],
			'0.10': [5.23589545e-4, 0.09999753263],
			'0.15': [0.001766988205, 0.1499812643],
			'0.20': [0.00418760916, 0.1999210576],
			'0.25': [0.008175600235, 0.2497591504],
			'0.30': [0.01411699801, 0.2994009761],
			'0.35': [0.02238999474, 0.3487062942],
			'0.40': [0.03335943266, 0.3974807592],
			'0.45': [0.04736922221, 0.4454682287],
			'0.50': [0.06473243286, 0.4923442259],
			'0.55': [0.08571888733, 0.5377110861],
			'0.60': [0.1105402074, 0.581095447],
			'0.65': [0.1393324215, 0.6219488539],
			'0.70': [0.1721364579, 0.6596523519],
			'0.75': [0.2088771112, 0.6935259908]
		}

		function bestPair(t) {
			// Interpolates within the lookup table to find the best approximation of C(t) and S(t)
			const lookup = Math.ceil(t * 20) / 20
			const lookdown = Math.floor(t * 20) / 20
			const ups = fresnel[lookup.toFixed(2)]
			const downs = fresnel[lookdown.toFixed(2)]
			if (lookup == lookdown) {
				return ups
			}
			const proportion = t - lookdown + (lookup - t)
			return [
				((t - lookdown) * ups[0] + (lookup - t) * downs[0]) / proportion,
				((t - lookdown) * ups[1] + (lookup - t) * downs[1]) / proportion
			]
		}

		// The euler spiral/clothoid curve hits 45 degrees at this value of t:
		const criticalPt = Math.sin((45 * Math.PI) / 180)
		// so that's where we'll stop and turn around.
		let offsets = bestPair(criticalPt)
		// The total x or y distance covered by a 90 clothoid corner of radius 1.
		let totalOffset = offsets[0] + offsets[1]

		const corner = (
			startx: number,
			starty: number,
			xdir: number,
			ydir: number,
			radius: number,
			count = defaultCount
		) => {
			// Produces path commands for one 90-degree clothoid corner
			let accum = []
			let x, y
			let [clothoidOffsetY, clothoidOffsetX] = bestPair(criticalPt)

			// Walk from zero curvature up to the critical point at 45deg
			for (var t = 0; t <= criticalPt; t += criticalPt / count) {
				const vals = bestPair(t)
				x = vals[1] * radius
				y = vals[0] * radius
				accum.push([x, y])
			}
			let prevx = x,
				prevy = y

			// Walk backwards from the critical point down to zero curvature
			for (var t = criticalPt; t >= 0; t -= criticalPt / count) {
				const vals = bestPair(t)
				x = prevx + (clothoidOffsetY - vals[0]) * radius
				y = prevy + (clothoidOffsetX - vals[1]) * radius
				accum.push([x, y])
			}

			// Handle flipping/reversing the curve for different corners
			if (xdir > 0 && ydir < 0) {
				accum = accum.map((p) => [
					p[0] - totalOffset * radius, // *shrugs*
					-p[1] + totalOffset * radius
				])
				accum.reverse()
			}
			if (xdir < 0 && ydir > 0) {
				accum = accum.map((p) => [-p[0] + totalOffset * radius, p[1] - totalOffset * radius])
				accum.reverse()
			}
			if (xdir < 0 && ydir < 0) {
				accum = accum.map((p) => [-p[0], -p[1]])
			}

			// Translate curve to proper starting point
			accum = accum.map((p) => [p[0] + startx, p[1] + starty])

			// Stringify it
			let st = accum.reduce((s, p) => s + `${p[0]} ${p[1]} `, '')

			// Record final stopping place of curve
			;[x, y] = accum[accum.length - 1]

			return [st, x, y]
		}

		return (width: number, height: number) => {
			// Double the radius for mathematical convenience: a unit euler-curve
			// approximates a half-unit rounded rect.
			const lgRadius = defaultRadius * 2
			const smRadius = smallRadius * 2

			let nextCorner = '' // a holding area for corner path command strings

			// Start just after the upper-left corner, moving clockwise.
			let radius = rightTop ? smRadius : lgRadius
			let x = totalOffset * radius,
				y = 0
			var accum = `M ${x} ${y} `

			x = width - totalOffset * radius
			accum += `L ${x} ${y} `
			;[nextCorner, x, y] = corner(x, y, 1, 1, radius)
			accum += nextCorner

			radius = rightBottom ? smRadius : lgRadius
			y = height - totalOffset * radius
			accum += `L ${x} ${y} `
			;[nextCorner, x, y] = corner(x, y, 1, -1, radius)
			accum += nextCorner

			radius = leftBottom ? smRadius : lgRadius
			x = totalOffset * radius
			accum += `L ${x} ${y} `
			;[nextCorner, x, y] = corner(x, y, -1, -1, radius)
			accum += nextCorner

			radius = leftTop ? smRadius : lgRadius
			y = totalOffset * radius
			accum += `L ${x} ${y} `
			;[nextCorner, x, y] = corner(x, y, -1, 1, radius)
			accum += nextCorner
			return accum + 'Z'
		}
	})()

	$: d = w && h && clothoidCurvePoints(w, h - 1)
</script>

{#if d}
	<svg viewBox="0 0 {w} {h}" preserveAspectRatio="none">
		<defs>
			<path id={`${id}-path`} {d} />
			<clipPath {id}>
				<use href={`#${id}-path`} />
			</clipPath>
		</defs>
	</svg>
	{#if shadow}
		<svg viewBox="0 0 {w} {h}" preserveAspectRatio="none" class="shadow" class:response>
			<path {d} />
		</svg>
	{/if}
	{#if border}
		<svg viewBox="0 0 {w} {h}" class="outline" class:response>
			<use href={`#${id}-path`} stroke="white" stroke-width="2" clip-path={`url(#${id})`} />
		</svg>
	{/if}
{/if}
<div
	bind:clientHeight={h}
	bind:clientWidth={w}
	class="masked"
	class:leftTop
	class:leftBottom
	class:rightTop
	class:rightBottom
	style={`clip-path: url(#${id})`}
>
	<slot />
</div>

<style lang="scss">
	svg {
		position: absolute;
		fill: var(--background);
		pointer-events: none;
	}

	.shadow {
		--margin: 0.3rem;
		position: absolute;
		height: 100%;
		width: calc(100% - var(--margin) * 2);
		left: var(--margin);
		right: var(--margin);
		filter: var(--filter-shadow);

		@media (prefers-color-scheme: light) {
			filter: var(--filter-shadow-dark);
		}

		&.response {
			filter: var(--filter-shadow);
		}
	}

	.outline {
		fill: transparent;
		z-index: 4;
		mix-blend-mode: overlay;
		opacity: 0.1;

		&.response {
			opacity: 1;
			mix-blend-mode: normal;
		}
	}

	.masked {
		--radius-l: 1rem;
		--radius-s: 0.3rem;

		border-radius: var(--radius-l) var(--radius-l) var(--radius-l) var(--radius-l);
		position: relative;
		overflow: hidden;
		box-shadow: var(--element-shadow);
		display: flex;
	}

	.leftTop {
		border-top-left-radius: var(--radius-s);
	}

	.leftBottom {
		border-bottom-left-radius: var(--radius-s);
	}

	.rightTop {
		border-top-right-radius: var(--radius-s);
	}

	.rightBottom {
		border-bottom-right-radius: var(--radius-s);
	}
</style>
