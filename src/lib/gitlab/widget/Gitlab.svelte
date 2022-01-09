<script>
	import Block from '../../../components/Block.svelte'
	import { sub, format } from 'date-fns'
	import { onMount } from 'svelte'

	let data = {}
	let max = 1
	const daysToShow = 7 * 12
	const days = [...Array(daysToShow).keys()]
		.reverse()
		.map((days) => format(sub(new Date(), { days }), 'yyy-MM-dd'))

	onMount(async () => {
		const response = await fetch('/api/gitlab')

		data = await response.json()
		max = Math.max.apply(Math, Object.values(data))
		console.log({ data })
	})
</script>

{#if data && Object.keys(data).length > 0}
	<Block background={'#3f3177'} color="white" title="GitLab" link="https://gitlab.com/Tymek">
		<div class="calendar">
			{#each days as day}
				<figure class="day" title={day} style={`opacity: ${data[day] / max || 0}`} />
			{/each}
		</div>
	</Block>
{/if}

<style type="text/scss" lang="scss">
	.calendar {
		display: grid;
		grid-template-rows: repeat(7, auto);
		grid-auto-flow: column;
		justify-content: center;
		align-content: center;
		grid-gap: 0.5rem;
	}

	.day {
		background: #fff;
		width: 1rem;
		height: 1rem;
		margin: 0;
		padding: 0;
		cursor: help;
	}
</style>
