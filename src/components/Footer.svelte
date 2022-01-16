<script>
	import { format } from 'date-fns'
	import Container from './Container.svelte'
</script>

<section>
	<Container>
		<p><small>&copy; 2008-{format(new Date(), 'yyyy')}, Some right reserved.</small></p>
	</Container>
</section>

<style>
	section {
		text-align: center;
	}
</style>
