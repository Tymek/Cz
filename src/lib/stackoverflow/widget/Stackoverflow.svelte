<script>
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import Time from '$components/Time.svelte'
	import Block from '$components/Block.svelte'
	import Flair from '$components/Flair.svelte'

	const texts = {
		recentlyPlayed: 'Recently played:',
		memberSince: 'Member since',
		reputation: 'Reputation points:',
		thisYear: 'this year'
	}

	translations.update({
		pl: {
			[texts.recentlyPlayed]: 'Ostatnio odtwarzane:',
			[texts.memberSince]: 'Konto od:',
			[texts.reputation]: 'Punkty reputacji:',
			[texts.thisYear]: 'w tym roku'
		}
	})

	let data = {}

	onMount(async () => {
		const response = await fetch('/api/stackoverflow')

		data = await response.json()
	})
</script>

{#if !!data && Object.keys(data).length > 0}
	<Block
		background="#ffcf10"
		color="black"
		title="StackOverflow"
		height={1}
		link="https://stackoverflow.com/users/1729641/tymek"
	>
		<Flair image={data.profile_image} name={data.display_name}>
			<span class="gold medal">{data.badge_counts.gold}</span>
			<span class="silver medal">{data.badge_counts.silver}</span>
			<span class="bronze medal">{data.badge_counts.bronze}</span>
		</Flair>

		<p>
			{$_(texts.memberSince)}
			<Time date={new Date(data.creation_date * 1000)} format="PPP" />
		</p>
		<p>
			{$_(texts.reputation)} <strong>{data.reputation}</strong><br />
			{#if data.reputation_change_year}
				{data.reputation_change_year > 0 ? '+' : '-'}{data.reputation_change_year}
				{$_(texts.thisYear)}
			{/if}
		</p>
	</Block>
{/if}

<style type="text/scss" lang="scss">
	@use 'sass:math';

	.medal {
		&::before {
			content: ' ';
			width: math.div(9rem, 16);
			height: math.div(9rem, 16);
			position: relative;
			display: inline-block;
			background: white;
			border-radius: math.div(9rem, 16);
			border: 0.0625rem solid rgba(0, 0, 0, 0.33);
			margin: 0 math.div(3rem, 16) math.div(1rem, 16) math.div(4rem, 16);
		}

		&.gold::before {
			background: #f1b600;
		}
		&.silver::before {
			background: #9a9c9f;
		}
		&.bronze::before {
			background: #ab825f;
		}
	}
</style>
