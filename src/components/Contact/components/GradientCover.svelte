<script lang="ts">
	import { onMount } from 'svelte'

	export let response = false

	let ref: HTMLQuoteElement
	let top: number

	function loop() {
		top = ref?.getBoundingClientRect()?.top
		requestAnimationFrame(loop)
	}

	onMount(loop)
</script>

<blockquote
	bind:this={ref}
	style={`--top:-${top || 0}px`}
	class={response ? 'response' : 'question'}
>
	<slot />
</blockquote>

<style lang="scss">
	blockquote {
		// background-color: var(--color-light);
		background-color: hsl(0, 0%, 96%);
		margin: 0;
		padding: 0.75rem 1.2rem 0.75rem;

		@media (prefers-color-scheme: dark) {
			// background-color: var(--color-whisper);
			background-color: hsl(0, 0%, 92%);
			// color: var(--color-dark);
			color: #382734;
		}
	}

	.question {
		background-color: var(--color-matterhorn);
		outline: 2px solid black;
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
			height: 100vh;
			width: calc(100% + 2rem);
			left: -1rem;
			right: -1rem;
			background-image: linear-gradient(
				calc(360deg - 30deg),
				hsl(45deg 84% 49%) 0%,
				hsl(35deg 82% 54%) 6%,
				hsl(26deg 75% 56%) 12%,
				hsl(16deg 63% 56%) 18%,
				hsl(6deg 49% 54%) 24%,
				hsl(355deg 36% 49%) 29%,
				hsl(346deg 34% 42%) 35%,
				hsl(336deg 29% 35%) 41%,
				hsl(324deg 22% 28%) 47%,
				hsl(310deg 17% 24%) 53%,
				hsl(296deg 16% 23%) 59%,
				hsl(282deg 17% 23%) 65%,
				hsl(269deg 18% 23%) 71%,
				hsl(256deg 19% 22%) 76%,
				hsl(244deg 20% 22%) 82%,
				hsl(232deg 24% 21%) 88%,
				hsl(223deg 31% 19%) 94%,
				hsl(216deg 38% 18%) 100%
			);
		}
	}
</style>
