<script lang="ts">
	// import BorderRadiusMask from './BorderRadiusMask.svelte'
	import GradientCover from './GradientCover.svelte'
	import { onMount } from 'svelte'

	let isFocused = false
	let message = ''
	let tokenizer: (message: string) => string[]
	let length = 0
	const limit = 50

	const focusAction = (node) => {
		const handleFocus = () => {
			isFocused = true
		}
		const handleBlur = () => {
			isFocused = false
		}

		node.addEventListener('focus', handleFocus)
		node.addEventListener('blur', handleBlur)

		return {
			destroy() {
				node.removeEventListener('focus', handleFocus)
				node.removeEventListener('blur', handleBlur)
			}
		}
	}

	const handleInput = () => {
		if (tokenizer) {
			length = tokenizer(message)?.length
		}
	}

	onMount(async () => {
		tokenizer = (await import('$lib/tokenizer')).default
	})
</script>

<div class="wrapper">
	<div class="container inverted-selection">
		<textarea
			placeholder="Type a message&hellip;"
			type="text"
			use:focusAction
			bind:value={message}
			on:input={handleInput}
		/>
		<GradientCover>
			<hr class:isFocused />
		</GradientCover>
	</div>
	<button>
		<div class="border" />
		<div class="content">
			<GradientCover>
				<div class="icon">
					<svg viewBox="0 0 20 20">
						<path
							d="M1.754.135L19.393 9.06c.57.288.775.943.458 1.462-.107.176-.266.32-.458.418l-17.64 8.925c-.57.288-1.288.1-1.604-.418C.05 19.287 0 19.183 0 19v-7l11-2L0 8V1.075C0 .481.529 0 1.18 0c.201 0 .399.047.574.135z"
							fill-rule="evenodd"
						/>
					</svg>
				</div>
			</GradientCover>
		</div>
	</button>
</div>
{length} / {limit}

<style lang="scss">
	.wrapper {
		--gradient-padding: 0;
		--height: calc(58rem / 14);
		margin-top: calc(48rem / 14);
		margin-left: calc(74rem / 14);
		display: flex;
	}

	.container {
		position: relative;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		box-shadow: var(--element-shadow);
		overflow: hidden;
		border-radius: 4px;
		align-self: center;

		textarea {
			all: unset;
			border-radius: 2px;
			border: none;
			height: 2rem;
			flex-grow: 1;
			border: 1px solid white;
			border-bottom: 0;
			padding: calc(12rem / 14);
			padding-bottom: calc(12rem / 14 - 5px);
			background: #f5f5f5;
			color: var(--color-black);
			font-weight: 420;
		}

		hr {
			border: none;
			height: 4px;
			width: 100%;
			margin: 0;
			background-color: rgba(255, 255, 255, 1);
			mix-blend-mode: saturation;
			z-index: 3;
			transition: background-color 0.3s ease-in;

			&.isFocused {
				background: rgba(255, 255, 255, 0);
			}
		}
	}

	button {
		all: unset;
		position: relative;
		width: var(--height);
		height: var(--height);
		display: flex;
		margin-left: calc(16rem / 14);
		box-shadow: 0 calc(3rem / 14) calc(5rem / 14) rgba(0, 0, 0, 0.25);
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.03s ease-in-out;
		// transform: translateY(1px);
		&:active {
			box-shadow: 0 calc(1rem / 14) calc(5rem / 14) rgba(0, 0, 0, 0.25);
			transform: translateY(3px);
		}
		// overflow: hidden;

		.border {
			position: absolute;
			inset: -1px;
			border: 1px solid white;
			border-radius: 50%;
			z-index: 3;
			mix-blend-mode: overlay;

			@media (prefers-color-scheme: dark) {
				border-color: transparent;
			}
		}

		.content {
			border-radius: 50%;
			overflow: hidden;
			display: flex;
			flex-grow: 1;
			inset: 1px;

			.icon {
				display: flex;
				align-self: center;
				justify-self: center;
				margin: auto;

				svg {
					width: calc(24rem / 14);
					height: calc(24rem / 14);
					z-index: 2;
					position: relative;

					path {
						fill: var(--color-white);
					}
				}
			}
		}
	}
</style>
