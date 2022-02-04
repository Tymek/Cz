<script lang="ts">
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
	import { messageFormatter, escape } from '$lib/utils'
	import Container from '$components/Container.svelte'
	import Input from './components/Input.svelte'
	import Message from './components/Message.svelte'

	let avatar

	function load() {
		avatar = import('./components/Avatar.svelte')
	}

	const texts = {
		contact: 'Contact'
	}

	translations.update({
		pl: {
			[texts.contact]: 'Kontakt'
		}
	})

	onMount(() => {
		load()
	})

	const getId = (() => {
		let id = 0

		return () => `message${id++}`
	})()

	const messages = [
		['1>', 'Hi! 👋🏻'],
		['1>', 'I made it really simple for you to start a conversation.'],
		// ['--', '= TODO: insert date =========='],
		['2>', "Hello! I'm Wiretap 🤖, pre-trained chatbot"],
		[
			'2>',
			'Tymek is busy or <abbr title="away from keyboard">AFK</abbr> right now, but I\'m here to help you.'
		],
		[
			'2>',
			'I am smart, but not perfect, and might provide false and misleading information. ' +
				'Our conversation is powered by ' +
				'<a href="https://openai.com/about/" rel="nofollow noopener noreferrer">OpenAI</a> ' +
				'and sent to <a href="https://slack.com/" rel="nofollow noopener noreferrer">Slack</a>. ' +
				'Are you OK with that?'
		],
		['<<', 'Lorem ipsum'],
		[
			'<<',
			'I am smart, but not perfect, and might provide false and misleading information. ' +
				'Our conversation is powered by ' +
				'<a href="https://openai.com/about/" rel="nofollow noopener noreferrer">OpenAI</a> ' +
				'and sent to <a href="https://slack.com/" rel="nofollow noopener noreferrer">Slack</a>. ' +
				'Are you OK with that?'
		],
		['<<', 'Lorem Ipsum']
	]

	$: messageGroups = messages.reduce(
		(acc: Array<{ type: string; messages: string[] }>, [type, text]) => {
			const lastIndex = acc.length - 1
			const lastGroup = acc[acc.length - 1]
			if (lastGroup?.type === type) {
				acc[lastIndex].messages.push(text)
			} else {
				acc.push({ type, messages: [text] })
			}

			return acc
		},
		[]
	)
</script>

<section id="contact" class="contact">
	<Container>
		<h2>{$_(texts.contact)}</h2>
		<div class="form" lang="en">
			<div class="wrapper">
				{#each messageGroups as messageGroup}
					<blockquote class="message-group" class:inverted-selection={messageGroup.type !== '<<'}>
						<div class="sidebar">
							{#if avatar && messageGroup.type !== '<<'}
								{#await avatar then { default: Avatar }}
									<Avatar ai={messageGroup.type !== '1>'} />
								{/await}
							{/if}
						</div>
						<div class="content">
							{#each messageGroup.messages as message, index}
								<Message
									id={getId()}
									end={messageGroup.messages.length !== 1 && index !== 0}
									start={messageGroup.messages.length !== 1 &&
										index !== messageGroup.messages.length - 1}
									response={messageGroup.type !== '<<'}
								>
									{#if messageGroup.type === '<<'}
										{@html messageFormatter(message)}
										<!-- FIXME: escape on send -->
									{:else}
										{@html messageFormatter(message)}
									{/if}
								</Message>
							{/each}
						</div>
					</blockquote>
				{/each}
			</div>
			<Input />
		</div>
	</Container>
</section>

<style lang="scss">
	.contact {
		--element-shadow: 0 calc(3rem / 14) calc(4rem / 14) rgba(0, 0, 0, 0.25);
		--filter-shadow: drop-shadow(0 calc(3rem / 14) calc(4rem / 14) rgba(0, 0, 0, 0.25));
		--filter-shadow-dark: drop-shadow(0 calc(4rem / 14) calc(3rem / 14) rgba(0, 0, 0, 0.3))
			drop-shadow(0 calc(1rem / 14) calc(1rem / 14) rgba(0, 0, 0, 0.1));
		min-height: 90vh;
		margin-top: 20vh;
		font-size: 1rem;

		@media (min-width: 45rem) {
			font-size: 1.1428571429rem;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.message-group {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin: 0;

		.sidebar {
			display: flex;
			flex-direction: column;
			padding-right: calc(18rem / 14);
			align-items: flex-end;
			justify-content: flex-end;
			margin: calc(10rem / 14) 0 calc(11rem / 14);
		}

		.content {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			align-self: center;
		}
	}

	.form {
		max-width: 720px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}
</style>
