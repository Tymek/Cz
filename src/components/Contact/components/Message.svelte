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
		--lg-spacing: 0.8571428571rem;
		--sm-spacing: 0.2857142857rem;

		position: relative;
		font-weight: 500;
		align-self: flex-end;
		max-width: 25em;
		margin: var(--lg-spacing) 0 var(--lg-spacing) 1rem;
		// TODO: vary max-width based on text length

		&.start {
			margin-bottom: var(--sm-spacing);
		}

		&.end {
			margin-top: var(--sm-spacing);
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
			line-height: 1.5em;

			// TODO: selection color (+blend mode?)

			&.response {
				font-weight: 450;
			}
		}
	}
</style>
