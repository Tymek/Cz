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

	const getId = (() => {
		let id = 0

		return () => `message${id++}`
	})()

	const messages = [
		['r', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed labore et dolore.'],
		['r', 'Nunc non blandit massa enim nec.'],
		['q', 'Eros donec ac odio tempor orci.'],
		['r', 'Scelerisque felis imperdiet proin fermentum leo vel.'],
		['q', 'Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque.'],
		['q', 'Pellentesque elit eget gravida cum sociis.'],
		['q', 'Nunc faucibus a pellentesque sit amet.'],
		['r', 'Mauris pharetra et ultrices neque ornare aenean euismod.'],
		['q', 'Platea dictumst quisque sagittis purus.'],
		['r', 'Sit amet purus gravida quis.'],
		['r', 'Vitae tortor condimentum lacinia quis vel eros donec ac.'],
		['q', 'Justo laoreet sit amet cursus sit amet dictum sit.'],
		['r', 'Sed id semper risus in hendrerit.'],
		['q', 'Enim praesent elementum facilisis leo vel fringilla est.'],
		['r', 'Viverra vitae congue eu consequat ac felis donec et.'],
		['q', 'Id velit ut tortor pretium viverra suspendisse potenti nullam.'],
		['q', 'Faucibus interdum posuere lorem ipsum dolor sit amet consectetur.'],
		['r', 'Fames ac turpis egestas sed tempus urna et pharetra.'],
		['q', 'Pretium aenean pharetra magna ac.'],
		['r', 'Sit amet volutpat consequat mauris nunc congue.'],
		['r', 'Pharetra diam sit amet nisl suscipit adipiscing bibendum est.'],
		['r', 'Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus.'],
		['q', 'Leo vel fringilla est ullamcorper eget nulla facilisi etiam.']
		// ['r', 'Eu non diam phasellus vestibulum lorem sed risus.']
	]

	const lastRIndex = messages.map(([side]) => side).lastIndexOf('q')
	const tail = messages.slice(lastRIndex, messages.length)
	console.log(tail, tail.length)
</script>

<section id="contact" class="contact">
	<Container>
		<h2>{$_(texts.contact)}</h2>
		<div class="form">
			<div class="sidebar">
				<div class="avatarContainer">
					{#if avatar}
						{#await avatar then { default: Avatar }}
							<Avatar />
						{/await}
					{/if}
				</div>
				<div class="tail">
					<div>
						{#each tail as [_, message]}
							<Message id={getId()} response>
								{message}
							</Message>
						{/each}
					</div>
				</div>
			</div>
			<div class="content">
				{#each messages as [side, message], i}
					<Message
						id={getId()}
						response={side === 'r'}
						start={messages[i + 1]?.[0] === side}
						end={messages[i - 1]?.[0] === side}
					>
						{message}
					</Message>
				{/each}
			</div>
		</div>
	</Container>
</section>

<style lang="scss">
	.contact {
		--element-shadow: 0 0.1875rem 0.25rem rgba(0, 0, 0, 0.25);
		--filter-shadow: drop-shadow(0 0.1875rem 0.25rem rgba(0, 0, 0, 0.25));
		min-height: 80vh;
	}

	.tail {
		width: 1px;
		overflow: hidden;

		div {
			width: 100vw;
			visibility: hidden;
		}
	}

	.form {
		max-width: 720px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
	}

	.avatarContainer {
		flex-grow: 1;
		display: flex;
		align-items: flex-end;
		position: relative;
		padding-right: 1rem;
		padding-bottom: 0.5rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding-bottom: 2rem;
	}
</style>
