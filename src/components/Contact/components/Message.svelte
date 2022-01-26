<script lang="ts">
	import { onMount } from 'svelte'

	export let response = false
	export let start = false
	export let end = false

	let ref: HTMLQuoteElement
	let top: number

	function loop() {
		top = ref.getBoundingClientRect().top
		requestAnimationFrame(loop)
	}

	onMount(loop)
</script>

<blockquote
	bind:this={ref}
	style={`--top:-${top || 0}px`}
	class={`message ${response ? ' response' : ' question'}${start ? ' start' : ''}${
		end ? ' end' : ''
	}`}
>
	<div class="text"><slot /></div>
</blockquote>

<style lang="scss">
	.message {
		--radius-l: 1em;
		--radius-s: 0.3em;

		// TODO: border radius css animation
		font-size: 1.11646975rem;
		font-weight: 500;
		align-self: flex-end;
		max-width: 25em;
		border-radius: var(--radius-l) var(--radius-s) var(--radius-s) var(--radius-l);
		padding: 0.75em 1em;
		margin: 0 0 0.5em;
		box-shadow: var(--element-shadow);
		background-color: var(--color-light);

		@media (prefers-color-scheme: dark) {
			background-color: var(--color-whisper);
			color: var(--color-dark);
		}

		.text {
			position: relative;
			z-index: 3;
		}

		&.start {
			border-top-right-radius: var(--radius-l);
			margin-top: 1rem;
		}
		&.end {
			border-bottom-right-radius: var(--radius-l);

			&.start {
				border-bottom-right-radius: var(--radius-s);
			}
		}

		&.response {
			user-select: none;
			border-radius: var(--radius-s) var(--radius-l) var(--radius-l) var(--radius-s);
			align-self: flex-start;

			&.start {
				border-top-left-radius: var(--radius-l);
			}
			&.end {
				border-bottom-left-radius: var(--radius-l);
				&.start {
					border-bottom-left-radius: var(--radius-s);
				}
			}
		}

		&.question {
			background-color: var(--color-matterhorn);
			color: var(--color-white);
			overflow: hidden;
			position: relative;

			@media (prefers-color-scheme: dark) {
				background-color: #1c2a3f; // info-s2
				color: var(--color-whisper);
			}

			&:before {
				content: ' ';
				position: absolute;
				background: gray;
				z-index: 1;
				top: var(--top);
				height: 100vh;
				width: calc(100% + 2rem);
				left: -1rem;
				right: -1rem;
				background-image: linear-gradient(
					180deg,
					hsl(216deg 39% 24%) 0%,
					hsl(229deg 26% 26%) 10%,
					hsl(249deg 20% 26%) 20%,
					hsl(270deg 19% 25%) 30%,
					hsl(293deg 17% 25%) 40%,
					hsl(316deg 18% 25%) 50%,
					hsl(339deg 26% 38%) 60%,
					hsl(357deg 30% 51%) 70%,
					hsl(15deg 53% 59%) 80%,
					hsl(29deg 75% 64%) 90%,
					hsl(45deg 84% 66%) 100%
				);
			}
		}
	}

	// .response + :global(.response) {
	// 	background: blue !important;
	// }
	// .response + :global(.response) {
	// 	background: blue !important;
	// }
</style>
