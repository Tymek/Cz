<script>
import Typewritter from './typewritter.svelte'
import { translations, _ } from 'svelte-intl'
import LinkIcon from './link.svg'
import BuildIcon from './build.svg'
import EnvelopeIcon from './envelope.svg'

const texts = {
	description: [
		'Hi! I\'m Tymek. You can call me Tim.',
		'I use new technology to make life better.',
		'This pursuit lead me to specialize in creating websites.',
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
			'Moje zainteresowania sprawiły, że specjalizuję się w tworzeniu stron internetowych.',
		].join('\n'),
		[texts.links]: 'Linki',
		[texts.stack]: 'Stack',
		[texts.contact]: 'Kontakt'
	},
})

</script>
<style type="text/scss" lang="scss">
  .container {
		box-sizing: border-box;
		position: relative;
		height: 100vh;
		display: flex;
		align-items: center;
    padding: 2rem 2rem;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
		}
	}

	.title {
		font-size: 4.188036796rem;
		line-height: 1.2em;
		/* text-transform: uppercase; */
		font-weight: 700;
		color: #253854;
		margin: 0 0 2rem;
	}

	.description {
		padding-bottom: 1.11646975rem;
		color: #4B3445;
		font-size: 1.11646975rem;
		line-height: 1.6em;
	}

  /* figure {
    max-width: 30vw;
    position: absolute;
		right: 5vw;
		bottom: 0;
    padding: 1px;
		margin: 0;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  figure img {
    width: 100%;
    display: block;
	} */

	// .buttons {
	// 	padding-bottom: 1rem;
	// }

	// .button {
	// 	display: inline-flex;
	// 	/* border: 1px solid rgba(0, 0, 0, 0.3); */
	// 	border: 1px solid transparent;
	// 	box-shadow: 0 2px 0 rgba(0,0,0,.045);
	// 	font-size: 1rem;
	// 	line-height: 1.6em;
	// 	/* font-weight: bold; */
	// 	margin: 0 8px 0 0;
	// 	padding: 0.25em 1em;
	// 	border-radius: (4 / 14) * 1em;
	// 	align-items: center;
	// 	cursor: pointer;
	// 	text-decoration: none;

	// }

	// .links.button {
	// 	background: #F1CD5F;
	// 	color: #4B3445;
	// }

	// .stack.button {
	// 	background: #B43C3C;
	// 	color: #ffffff;
	// }

	// .contact.button {
	// 	background: #3C8458;
	// 	color: #ffffff;
	// }

	// .button .icon {
	// 	height: 1em;
	// 	font-size: 1.25rem;
	// 	display: block;
	// 	margin-right: 0.4em;
	// }

	// .button .label {
	// 	padding-top: 0.2em;
	// }

	:global(.icon svg) {
		height: 1em;
	}
</style>

<div class="container">
	<div class="block">
		<h1 class="title">
			Tymoteusz <br />Czech
		</h1>
		<div class="description">
			<p>{@html $_(texts.description).replace(/\n/g, '<br />')}</p>
		</div>
		<!-- <div class="buttons">
			<a href="#contact" class="button contact">
				<span class="icon" aria-hidden="true">{@html EnvelopeIcon}</span>
				<span class="label">{$_(texts.contact)}</span>
			</a>
			<a href="#stack" class="button stack">
				<span class="icon" aria-hidden="true">{@html BuildIcon}</span>
				<span class="label">{$_(texts.stack)}</span>
			</a>
			<a href="#links" class="button links">
				<span class="icon" aria-hidden="true">{@html LinkIcon}</span>
				<span class="label">{$_(texts.links)}</span>
			</a>
		</div> -->
	</div>
	<!-- <figure>
		<img src="/photo.jpg" alt="Tymek" />
	</figure> -->
</div>
