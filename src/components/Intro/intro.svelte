<script>
	import { translations, _ } from 'svelte-intl'
	import LinkIcon from './link.svg'
	import BuildIcon from './build.svg'
	import EnvelopeIcon from './envelope.svg'
	import PortraitDrawing from './portrait-drawing.svg'

	const texts = {
		description: [
			"Hi! I'm Tymek. You can call me Tim.",
			'I use new technology to make life better.',
			'This pursuit lead me to specialize in creating web applications.'
		].join('\n'),
		links: 'Links',
		stack: 'Stack',
		contact: 'Contact'
	}

	translations.update({
		pl: {
			[texts.description]: [
				'Hej! Jestem Tymek.',
				'Używam nowych technologii, by żyło się łatwiej i ciekawiej.',
				'Moje zainteresowania sprawiły, że specjalizuję się w tworzeniu aplikacji internetowych.'
			].join('\n'),
			[texts.links]: 'Linki',
			[texts.stack]: 'Stack',
			[texts.contact]: 'Kontakt'
		}
	})
</script>

<section class="wrapper">
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
			<div class="buttons">
				<a href="#stack" class="button stack">
					<span class="icon" aria-hidden="true"><BuildIcon /></span>
					<span class="label">{$_(texts.stack)}</span>
				</a>
				<a href="#links" class="button links">
					<span class="icon" aria-hidden="true"><LinkIcon /></span>
					<span class="label">{$_(texts.links)}</span>
				</a>
				<a href="#contact" class="button contact">
					<span class="icon" aria-hidden="true"><EnvelopeIcon /></span>
					<span class="label">{$_(texts.contact)}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style type="text/scss" lang="scss">
	@use 'sass:math';

	.wrapper {
		display: flex;
		align-items: center;
		min-height: 80vh;
		width: 100%;
	}

	.container {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		padding: 2rem 2rem;
		justify-content: space-evenly;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: center;
		}
	}

	.title {
		font-size: 4.188036796rem;
		line-height: 1.2em;
		font-weight: 700;
		color: #253854;
		margin: 0 0 2rem;
	}

	.block {
		align-self: flex-end;
	}

	.description {
		padding-bottom: 1.11646975rem;
		color: #4b3445;
		font-size: 1.11646975rem;
		line-height: 1.6em;
	}

	.photo {
		height: 33vh;
		position: relative;
		display: flex;
		justify-content: center;

		@media (orientation: landscape) {
			height: 50vh;
		}

		:global(svg) {
			height: 100%;
		}
	}

	.buttons {
		padding-bottom: 1rem;
	}

	.button {
		display: inline-flex;
		border: 1px solid transparent;
		box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
		font-size: 1rem;
		line-height: 1.6em;
		margin: 0 8px 0 0;
		padding: 0.25em 1em;
		border-radius: math.div(4, 14) * 1em;
		align-items: center;
		cursor: pointer;
		text-decoration: none;
	}

	.links.button {
		background: #f1cd5f;
		color: #4b3445;
	}

	.stack.button {
		background: #b43c3c;
		color: #ffffff;
	}

	.contact.button {
		background: #3c8458;
		color: #ffffff;
	}

	.button .icon {
		height: 1em;
		font-size: 1.25rem;
		display: block;
		margin-right: 0.4em;
	}

	.button .label {
		padding-top: 0.2em;
	}

	.icon {
		:global(svg) {
			height: 1em;
		}
	}
</style>
