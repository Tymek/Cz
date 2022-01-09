<script lang="ts">
	import { translations, _ } from 'svelte-intl'
	import octicons from '@primer/octicons'
	import TimeSince from '$components/TimeSince.svelte'

	export let event: {
		type: string
		repo: string
		created_at: string
		action?: string
	}

	const texts = {
		at: 'at'
	}

	translations.update({
		pl: {
			[texts.at]: 'w'
		}
	})

	const eventIcons = {
		CommitCommentEvent: {
			any: octicons['comment-discussion']
		},
		CreateEvent: {
			any: octicons['star'],
			branch: octicons['git-branch'],
			repository: octicons['repo'],
			tag: octicons['tag']
		},
		DeleteEvent: {
			any: octicons['trash']
		},
		ForkEvent: {
			any: octicons['git-fork']
		},
		GollumEvent: {
			any: octicons['book']
		},
		IssueCommentEvent: {
			any: octicons['comment']
		},
		IssuesEvent: {
			any: octicons['issue-opened'],
			opened: octicons['issue-opened'],
			closed: octicons['issue-closed'],
			reopened: octicons['issue-reopened']
		},
		MemberEvent: {
			any: octicons['person']
		},
		PublicEvent: {
			any: octicons['unlock']
		},
		PullRequestEvent: {
			any: octicons['git-pull-request']
		},
		PullRequestReviewCommentEvent: {
			any: octicons['comment-discussion']
		},
		PushEvent: {
			any: octicons['git-commit']
		},
		ReleaseEvent: {
			any: octicons['repo-push']
		},
		SponsorshipEvent: {
			any: octicons['rocket']
		},
		WatchEvent: {
			any: octicons['star-fill']
		}
	}

	let icon = ''

	if (!!eventIcons[event.type]) {
		const action = event.action || 'any'

		if (eventIcons[event.type][action]) {
			icon = eventIcons[event.type][action].toSVG({ class: 'event-octicon' })
		} else if (eventIcons[event.type].any) {
			icon = eventIcons[event.type].any.toSVG({ class: 'event-octicon' })
		} else {
			icon = octicons['dot'].toSVG({ class: 'event-octicon' })
		}
	}
</script>

<li>
	{#if !!icon}
		{@html icon}
	{/if}
	<!-- {moment(event.created_at).fromNow()} -->
	<!-- {$_(texts.at)} -->
	<a href="//github.com/{event.repo}">
		{event.repo}
	</a>

	<TimeSince date={event.created_at} addSuffix />
</li>

<style type="text/scss" lang="scss">
	@use 'sass:math';

	:global(.event-octicon) {
		margin-right: math.div(2rem, 16);
	}
	:global(.event-octicon path) {
		fill: currentColor;
	}

	li {
		white-space: nowrap;
		overflow-x: hidden;
		overflow-y: visible;
		text-overflow: ellipsis;
	}

	a {
		// text-decoration: none;
		text-decoration-color: rgba(255, 255, 255, 0.25);

		&:hover,
		&:active,
		&:focus {
			text-decoration-color: inherit;
			text-decoration: underline;
		}
	}
</style>
