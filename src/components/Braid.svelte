<script lang="ts">
	export let dark = false
	export let defs = false

	const width = 330
	const segment = 90
	const height = 80
	const stroke = 20

	const ratio = 1 / 3
	const flat = segment * ratio
	const slope = segment - flat
	const top = stroke / 2
	const btm = height - top
	const loops = 7
	const shift = (segment / 3) * 2
	const offset = shift * 4.25

	const createLine = (index = 0) =>
		'M' +
		[...Array(loops).keys()]
			.flatMap((i) => {
				const isUp = i % 2 === 0
				const spacing = i * segment
				return [
					[index * shift + spacing, isUp ? top : btm],
					[index * shift + slope + spacing, isUp ? btm : top],
					[index * shift + slope + flat + spacing, isUp ? btm : top]
				].map((p) => p.join(','))
			})
			.join('L')

	const d = createLine()
	const mover = {
		w: 180,
		h: height * 2
	}

	$: background = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
	const darkColor = 'rgba(255,255,255,0.67)'
	const lightColor = 'rgba(255,255,255,0.5)'
</script>

<svg
	viewBox={`${offset} 0 ${width} ${height}`}
	xmlns="http://www.w3.org/2000/svg"
	class={defs ? 'defs' : ''}
>
	{#if defs}
		<defs>
			<path
				id="line"
				fill="none"
				stroke-width={stroke}
				stroke-linejoin="round"
				stroke-linecap="round"
				style="stroke:var(--stroke, transparent)"
				{d}
			/>
			<rect
				id="bg"
				x="0"
				y={-height / 2}
				width={width * 2}
				height={height * 2}
				style="fill:var(--fill, white)"
			/>

			<filter id="blur">
				<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
			</filter>
			<mask id="mask1" x="0" y={-height / 2} width={width * 2} height={height * 2}>
				<use href="#bg" />
				<use href="#line" x="0" style="--stroke:black" />
				<use href="#line" x="0" y="0" style="--stroke:black" filter="url(#blur)" />
			</mask>
			<mask id="mask2" x="0" y={-height / 2} width={width * 2} height={height * 2}>
				<use href="#bg" />
				<use href="#line" x={shift} style="--stroke:black" />
				<use href="#line" x={shift} y="0" style="--stroke:black" filter="url(#blur)" />
			</mask>
			<mask id="mask3" x="0" y={-height / 2} width={width * 2} height={height * 2}>
				<use href="#bg" />
				<use href="#line" x={shift * 2} style="--stroke:black" />
				<use href="#line" x={shift * 2} y="0" style="--stroke:black" filter="url(#blur)" />
			</mask>
			<mask id="track1">
				<use href="#bg" style="--fill:black" />
				<use href="#line" x="0" y="0" style="--stroke:white" />
			</mask>
			<mask id="track2">
				<use href="#bg" style="--fill:black" />
				<use href="#line" x={shift} y="0" style="--stroke:white" />
			</mask>
			<mask id="track3">
				<use href="#bg" style="--fill:black" />
				<use href="#line" x={shift * 2} y="0" style="--stroke:white" />
			</mask>
			<linearGradient id="shine" x1="0" x2="1" y1="0" y2="0">
				<stop offset="0%" stop-color={darkColor} stop-opacity="0" />
				<stop offset="50%" stop-color={darkColor} stop-opacity="1" />
				<stop offset="100%" stop-color={darkColor} stop-opacity="0" />
			</linearGradient>
			<linearGradient id="shadow" x1="0" x2="1" y1="0" y2="0">
				<stop offset="0%" stop-color={lightColor} stop-opacity="0" />
				<stop offset="50%" stop-color={lightColor} stop-opacity="1" />
				<stop offset="100%" stop-color={lightColor} stop-opacity="0" />
			</linearGradient>
		</defs>
	{:else}
		<use href="#line" y="0" mask="url(#mask3)" x="0" style={`--stroke:${background}`} />
		<use href="#line" y="0" mask="url(#mask3)" x={shift} style={`--stroke:${background}`} />
		<use href="#line" y="0" mask="url(#mask3)" x={shift * 2} style={`--stroke:${background}`} />

		{#each ['mover' /*'mover delay'*/] as cls}
			<g mask="url(#mask1)">
				<g mask="url(#track2)">
					<rect
						y={-mover.h / 2}
						width={mover.w}
						height={mover.h}
						style={`--path: path("${createLine(1)}")`}
						fill={`url(#${dark ? 'shadow' : 'shine'})`}
						class={`${cls} c1`}
					/>
				</g>
			</g>
			<g mask="url(#mask3)">
				<g mask="url(#track1)">
					<rect
						y={-mover.h / 2}
						width={mover.w}
						height={mover.h}
						style={`--path: path("${createLine(1)}")`}
						fill={`url(#${dark ? 'shadow' : 'shine'})`}
						class={`${cls} c2`}
					/>
				</g>
			</g>
			<g mask="url(#mask2)">
				<g mask="url(#track3)">
					<rect
						y={-mover.h / 2}
						width={mover.w}
						height={mover.h}
						style={`--path: path("${createLine(1)}")`}
						fill={`url(#${dark ? 'shadow' : 'shine'})`}
						class={`${cls} c3`}
					/>
				</g>
			</g>
		{/each}
	{/if}
</svg>

<style lang="scss">
	svg {
		width: 100%;
	}

	.mover {
		offset-rotate: 0deg;
		motion-path: var(--path);
		offset-path: var(--path);
	}

	.c1 {
		animation: move 3s linear infinite;
		&.delay {
			animation-delay: 1.5s;
		}
	}
	.c2 {
		animation: move 2s linear infinite reverse;
		&.delay {
			animation-delay: 1s;
		}
	}
	.c3 {
		animation: move 5s linear infinite;
		&.delay {
			animation-delay: 2.5s;
		}
	}

	@keyframes move {
		100% {
			motion-offset: 100%;
			offset-distance: 100%;
		}
	}

	.defs {
		width: 0;
		height: 0;
		position: absolute;
	}
</style>
