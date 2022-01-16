<script>
	import { translations, _ } from 'svelte-intl'
	import Braid from '$components/Braid.svelte'

	export let height = 1
	export let title = ''
	export let link = ''
	export let color = 'black'
	export let background = 'transparent'
	export let loading = false
	export let darkLoader = false

	const texts = {
		loading: 'Loading from API…'
	}

	translations.update({
		pl: {
			[texts.loading]: 'Wczytywanie z API…'
		}
	})
</script>

<div class="block" style="color: {color}; background: {background}; grid-row-start: span {height};">
	<h3 class="title">
		{#if link}
			<a href={link}>{title}</a>
		{:else}
			{title}
		{/if}
	</h3>
	{#if loading}
		<div class="loading">
			<div class="text">
				{$_(texts.loading)}
			</div>
			<div class="loader">
				<Braid dark={darkLoader} />
			</div>
		</div>
	{/if}
	<slot />
</div>

<style type="text/scss" lang="scss">
	@use 'sass:math';

	.block {
		border-radius: math.div(4rem, 16);
		padding: 1rem;
		position: relative;
		min-height: 12rem;
	}

	.loading {
		position: absolute;
		width: 100%;
		margin: 0 -1rem;

		.text {
			margin: 0 1rem 1rem;
		}
	}

	.title {
		margin-top: 0.25rem;
		font-size: 1.546391438rem;

		a {
			display: block;
			text-decoration: none;

			&:hover,
			&:focus,
			&:active {
				text-decoration: underline;
			}
		}
	}
</style>
