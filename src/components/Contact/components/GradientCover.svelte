<script lang="ts">
	import { onMount } from 'svelte'

	export let response = false

	let ref: HTMLDivElement
	let top: number

	function loop() {
		top = ref?.getBoundingClientRect()?.top
		requestAnimationFrame(loop)
	}

	onMount(loop)
</script>

<div bind:this={ref} style={`--top:-${top || 0}px`} class={response ? 'response' : 'question'}>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-grow: 1;
		background-color: hsl(0, 0%, 96%);
		margin: 0;
		padding: var(--gradient-padding, 0.75rem 1.2rem 0.75rem);

		@media (prefers-color-scheme: dark) {
			background-color: hsl(0, 0%, 92%);
			color: #382734;
		}
	}

	.question {
		background-color: hsl(216deg 38% 18%);
		color: var(--color-white);
		overflow: hidden;
		position: relative;
		transform: translate3d(0, 0, 0);
		// Chrome aliasing issue 🙁 - "null transform hack"

		&:before {
			transform: translate3d(0, 0, 0);
			content: ' ';
			position: absolute;
			z-index: 1;
			top: var(--top);
			height: 150vh;
			width: calc(100% + 2rem);
			left: -1rem;
			right: -1rem;
			background-image: linear-gradient(
				150deg,
				hsl(216deg 38% 18%) 0%,
				hsl(223deg 31% 19%) 4%,
				hsl(232deg 24% 21%) 8%,
				hsl(244deg 20% 22%) 12%,
				hsl(256deg 19% 22%) 16%,
				hsl(269deg 18% 23%) 20%,
				hsl(282deg 17% 23%) 24%,
				hsl(296deg 16% 23%) 28%,
				hsl(310deg 17% 24%) 32%,
				hsl(324deg 22% 28%) 36%,
				hsl(336deg 29% 35%) 40%,
				hsl(346deg 34% 42%) 44%,
				hsl(355deg 36% 49%) 48%,
				hsl(6deg 49% 54%) 52%,
				hsl(16deg 63% 56%) 56%,
				hsl(26deg 75% 56%) 60%,
				hsl(35deg 82% 54%) 64%,
				hsl(45deg 84% 49%) 68%,
				hsl(56deg 84% 44%) 100%
			);
		}
	}
</style>
