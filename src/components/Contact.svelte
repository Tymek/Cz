<script>
	import Container from '$components/Container.svelte'
</script>

<section id="contact" class="contact">
	<Container>
		<h2>Kontakt</h2>
		<p>Our first converation could go something like this:</p>
		<div class="form">
			<p class="left">Hi!</p>
			<p class="left">Would you be interested in working with me?</p>
			<p class="right">
				Yes! I'm looking for [a technical co-founder | software architect | a consultant/auditor]
			</p>
		</div>
	</Container>
</section>

<style lang="scss">
	.contact {
		min-height: 80vh;
	}

	.right {
		text-align: right;
	}

	.form {
		max-width: 720px;
		margin: 0 auto;
	}
</style>
