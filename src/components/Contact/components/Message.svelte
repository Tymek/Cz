<script lang="ts">
	import BorderRadiusMask from './BorderRadiusMask.svelte'
	import GradientCover from './GradientCover.svelte'

	export let id: string
	export let response = false
	export let start = false
	export let end = false

	$: leftTop = response && end
	$: leftBottom = response && start
	$: rightTop = !response && end
	$: rightBottom = !response && start
</script>

<div
	class={`message ${response ? ' response' : ' question'}`}
	class:start
	class:end
	{...$$restProps}
>
	<BorderRadiusMask {leftTop} {leftBottom} {rightTop} {rightBottom} {id} {response}>
		<GradientCover {response}>
			<div class="text" class:response><slot /></div>
		</GradientCover>
	</BorderRadiusMask>
</div>

<style lang="scss">
	.message {
		position: relative;
		font-weight: 500;
		align-self: flex-end;
		max-width: 25em;
		margin: 0.8571428571rem 0 0.8571428571rem 1rem;
		// TODO: vary max-width based on text length

		&.start {
			margin-bottom: 0.2857142857rem;
		}
		&.end {
			margin-top: 0.2857142857rem;
		}

		&.response {
			align-self: flex-start;
			margin-left: 0;
			margin-right: 1rem;
		}

		.text {
			position: relative;
			z-index: 3;
			font-weight: 400;
			font-size: 1rem;
			line-height: 1.5em;

			// TODO: select color (+blend mode?)

			&.response {
				font-weight: 450;
			}

			@media (min-width: 45rem) {
				font-size: 1.1428571429rem;
			}
		}
	}
</style>
