<script lang="ts">
	const width = 360
	const segment = 90
	const height = 80
	const stroke = 20

	const ratio = 1 / 3
	const flat = segment * ratio
	const slope = segment - flat
	const top = stroke / 2
	const btm = height - top
	const loops = 8
	const shift = (segment / 3) * 2
	const offset = shift * 3.25

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
</script>

<svg {width} {height} viewBox={`${offset} 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
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

		<filter id="shadow">
			<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
		</filter>
		<mask id="mask" x="0" y={-height / 2} width={width * 2} height={height * 2}>
			<use href="#bg" />
			<use href="#line" x="0" style="--stroke:black" />
			<use href="#line" x="0" y="0" style="--stroke:black" filter="url(#shadow)" />
		</mask>
		<mask id="mask2" x="0" y={-height / 2} width={width * 2} height={height * 2}>
			<use href="#bg" />
			<use href="#line" x={shift} style="--stroke:black" />
			<use href="#line" x={shift} y="0" style="--stroke:black" filter="url(#shadow)" />
		</mask>
		<mask id="mask3" x="0" y={-height / 2} width={width * 2} height={height * 2}>
			<use href="#bg" />
			<use href="#line" x={shift * 2} style="--stroke:black" />
			<use href="#line" x={shift * 2} y="0" style="--stroke:black" filter="url(#shadow)" />
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
	</defs>
	<use href="#line" y="0" mask="url(#mask3)" x="0" style="--stroke:gray" />
	<use href="#line" y="0" mask="url(#mask3)" x={shift} style="--stroke:gray" />
	<use href="#line" y="0" mask="url(#mask3)" x={shift * 2} style="--stroke:gray" />

	<g mask="url(#mask)">
		<g mask="url(#track2)">
			<rect
				id="c1"
				y="-100"
				width="50"
				height="200"
				fill="#fff"
				style={`--path: path("${createLine(1)}")`}
			/>
		</g>
	</g>
</svg>

<style lang="scss">
	#c1 {
		animation: move 3s linear infinite;
		motion-path: var(--path);
		offset-path: var(--path);
		offset-rotate: 0deg;
	}
	@keyframes move {
		100% {
			motion-offset: 100%;
			offset-distance: 100%;
		}
	}
</style>
