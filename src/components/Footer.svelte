<script>
	import { format } from 'date-fns'
	import Container from './Container.svelte'
</script>

<section>
	<Container>
		<p><small>&copy; 2008-{format(new Date(), 'yyyy')}, Some right reserved.</small></p>
	</Container>
</section>

<style lang="scss">
	section {
		text-align: center;
		color: #919191;
	}
</style>
