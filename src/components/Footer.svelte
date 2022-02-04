<script>
	import { format } from 'date-fns'
	import Container from './Container.svelte'
</script>

<section>
	<Container>
		<p>
			<small>&copy; 2008-{format(new Date(), 'yyyy')}, Tymoteusz Czech. Some right reserved.</small>
		</p>
	</Container>
</section>

<style lang="scss">
	section {
		--container-vertical-margin: 0;
		text-align: center;
		color: #919191;
		opacity: 0.5;
		padding-top: 2rem;

		@media (prefers-color-scheme: dark) {
			color: #436598;
			text-shadow: 0 1px 1px #1c2a3f;
		}

		@media (prefers-color-scheme: light) {
			color: #555555;
			text-shadow: 0 -1px 1px var(--color-white);
		}
	}
</style>
