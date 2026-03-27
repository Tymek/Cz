<script>
	import { registerTranslations, _ } from '$lib/i18n'
	import Container from '$components/Container.svelte'
	import PortraitDrawing from './portrait-drawing.svg'

	const texts = {
		description: [
			"Hi! I'm Tymek. You can call me Tim.",
			'I use new technology to make life better.'
			// 'This pursuit lead me to specialize in creating web applications.'
		].join('\n')
	}

	registerTranslations(texts, {
		pl: {
			[texts.description]: [
				'Hej! Jestem Tymek.',
				'Używam nowych technologii, by żyło się łatwiej i ciekawiej.'
				// 'Moje zainteresowania sprawiły, że specjalizuję się w tworzeniu aplikacji internetowych.'
			].join('\n')
		}
	})
</script>

<section class="wrapper">
	<Container>
		<div class="container">
			<figure class="photo">
				<PortraitDrawing />
			</figure>
			<div class="block">
				<h1 class="title">
					Tymoteusz <br />Czech
				</h1>
				<div class="description">
					<p>{@html $_(texts.description).replace(/\n/g, '<br />')}</p>
				</div>
			</div>
		</div>
	</Container>
</section>

<style type="text/scss" lang="scss">
	.wrapper {
		display: flex;
		align-items: center;
		min-height: 85vh;
		width: 100%;

		.container {
			width: 100%;
			box-sizing: border-box;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			@media (orientation: landscape) {
				flex-direction: row-reverse;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.title {
		font-size: 4.188036796rem;
		line-height: 1.2em;
		font-weight: 700;
		margin: 0 0 2rem;

		color: var(--color-catalina-blue);
		@media (prefers-color-scheme: dark) {
			color: var(--color-bright);
		}
		@media (prefers-color-scheme: light) {
			text-shadow: var(--color-white) 0 1px 0;
		}
	}

	.block {
		align-self: center;
		@media (orientation: landscape) {
			padding-top: 5vh;
		}

		.description {
			padding-bottom: 1.11646975rem;
			font-size: 1.11646975rem;
			line-height: 1.6em;
		}
	}

	.photo {
		height: 33vh;
		position: relative;
		display: flex;
		justify-content: center;
		padding-bottom: 5vh;

		@media (prefers-color-scheme: light) {
			--portrait-background: transparent;
		}

		@media (orientation: landscape) {
			height: 50vh;
			padding-bottom: 0;
		}

		:global(svg) {
			height: 100%;
		}
	}
</style>
