<script>
	import Container from '$components/Container.svelte'
	import { onMount } from 'svelte'
	import { translations, _ } from 'svelte-intl'
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
</script>

<section id="contact" class="contact">
	<Container>
		<h2>{$_(texts.contact)}</h2>
		<div class="form">
			<div class="avatarContainer">
				{#if avatar}
					{#await avatar then { default: Avatar }}
						<Avatar />
					{/await}
				{/if}
			</div>
			<div class="content">
				<Message response start>O, Hello there! 👋</Message>
				<Message response end>Would you be interested in working with me?</Message>
				<Message start end>Maybe?</Message>
				<Message response end>What can I help you with?</Message>
				<Message start end>
					Yes! I'm looking for [a technical co-founder | software architect | a consultant/auditor]
				</Message>
				<Message response end>Do you offer compensation competitive in European market?</Message>
				<Message start>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatum perferendis
					officia maiores ipsum eaque laboriosam aliquid nobis quibusdam laborum inventore quasi,
					est delectus numquam fugit?
				</Message>
				<Message end>Consequatur fugit iusto veniam?</Message>
				<Message response start>
					Nam lacinia, ex vitae efficitur rhoncus, massa massa ullamcorper purus, ac imperdiet erat
					orci et lacus.
				</Message>
				<Message response end>
					Donec faucibus venenatis neque ut interdum. Sed vitae laoreet orci, eget condimentum est.
				</Message>
				<Message start end>Integer vulputate erat in nulla venenatis imperdiet.</Message>

				<Message response end
					>Massa massa ullamcorper purus, ac imperdiet erat orci et lacus.</Message
				>
			</div>
		</div>
	</Container>
</section>

<style lang="scss">
	.contact {
		--element-shadow: 0 0.1em 0.3em 0 rgba(0, 0, 0, 0.2);
		min-height: 80vh;
	}

	.form {
		max-width: 720px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
	}

	.avatarContainer {
		display: flex;
		align-items: flex-end;
		position: relative;
		padding-right: 1rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding-bottom: 2rem;
	}
</style>
