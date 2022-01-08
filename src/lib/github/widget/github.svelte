<script>
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import Event from './components/event.svelte'
	import Button from './components/button.svelte'
	import Block from '../../../components/block.svelte'
	import Flair from '../../../components/flair.svelte'
	import { format, formatDistance, parseISO } from 'date-fns'
	import TimeSince from '$components/TimeSince.svelte'

	let data = {}

	const texts = {
		accountSince: 'Account created',
		followLabel: 'Follow @Tymek on GitHub',
		followText: 'Follow @Tymek',
		activity: 'Activity'
	}

	translations.update({
		pl: {
			[texts.accountSince]: 'Konto utworzone',
			[texts.followLabel]: "Obserwuj @Tymek na GitHub'ie",
			[texts.followText]: 'Obserwuj @Tymek',
			[texts.activity]: 'Aktywność'
		}
	})

	onMount(async () => {
		const response = await fetch('/api/github')
		data = await response.json()
	})
</script>

{#if data && Object.keys(data).length > 0}
	<Block
		background={'#24292E'}
		color="white"
		height={2}
		title="GitHub"
		link={`https://github.com/${data?.profile?.login || ''}`}
	>
		<Flair image={data.profile.avatar_url} name={data.profile.login}>
			{data.profile.bio}
		</Flair>
		<p>
			{$_(texts.accountSince)}
			<TimeSince date={data.profile.created_at} addSuffix />
		</p>

		<h4>{$_(texts.activity)}</h4>
		<ul>
			{#each data.activity as event}
				<Event {event} />
			{/each}
		</ul>
		{#if data?.profile?.login && typeof data?.profile?.login === 'string'}
			<Button login={data?.profile?.login} />
		{/if}
	</Block>
{/if}

<style type="text/scss" lang="scss">
	@use 'sass:math';

	:global(.emoji) {
		height: 1em;
		min-height: 16.8px;
	}

	ul {
		margin: 0.5rem math.div(2rem, 16) 1rem;
		padding: 0;
		list-style: none;
	}

	h4 {
		margin-bottom: 0.5rem;
	}
</style>
