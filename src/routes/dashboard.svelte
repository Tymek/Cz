<script lang="ts">
	import { page } from '$app/stores'
	import spotifyDashboard from '$lib/spotify/dashboard'
	import githubDashboard from '$lib/github/dashbaord'
	import stackoverflowDashboard from '$lib/stackoverflow/dashboard'
	import gitlabDashboard from '$lib/gitlab/dashboard'
	import instagramDashboard from '$lib/instagram/dashboard'

	const dashboardItems = [
		spotifyDashboard,
		githubDashboard,
		stackoverflowDashboard,
		gitlabDashboard,
		instagramDashboard
	]

	let message = null
	page.subscribe(({ url }) => {
		if (url?.searchParams?.has('message')) {
			message = url?.searchParams?.get('message')
		}
	})

	const closeMessage = () => {
		location.href = '/dashboard'
	}

	const createCookie = (name, value, days) => {
		let expires

		if (days) {
			const date = new Date()
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
			expires = '; expires=' + date.toUTCString()
		} else {
			expires = ''
		}

		document.cookie = `${name}=${encodeURIComponent(value)}${expires}; SameSite=Strict; path=/`
	}

	const setAdminToken = (event: KeyboardEvent) => {
		const target = event.target as HTMLInputElement

		createCookie('admin_token', target.value, 1)
	}
</script>

<svelte:head>
	<title>Dashboard &ndash; www.tymek.cz</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="wrapper">
	{#if message}
		<div class="message">
			<p>
				{message}
			</p>
			<button on:click|once={closeMessage}>OK</button>
		</div>
	{/if}
	<div class="container-padding">
		<h1>Dashboard</h1>

		<div class="field">
			<label for="token">Admin token</label>
			<input type="password" id="token" on:keyup={setAdminToken} placeholder="••••••••" />
		</div>
		<a href="/api/config" target="_blank">Show config</a>
	</div>
	<div class="grid">
		{#each dashboardItems as item}
			<form method="POST" action="/api/config">
				<fieldset style={item.color ? `border-color: ${item.color}` : ''}>
					<legend><h2>{item.title}</h2></legend>
					{#each item.fields as field}
						<div class="field">
							<label for={field.key}>{field.label}</label>
							<input type={field.type || 'text'} id={field.key} name={field.key} />
						</div>
					{/each}
					<div class="actions">
						<button type="submit">Save</button>
						{#each item.actions as action}
							<button
								type="button"
								on:click|once={() => {
									window.location.href = action.url
								}}>{action.label}</button
							>
						{/each}
					</div>
				</fieldset>
			</form>
		{/each}
	</div>
</div>

<style type="text/scss" lang="scss">
	@use 'sass:math';

	.wrapper {
		padding: 2rem 3rem;

		.container-padding {
			padding: 0 1rem 2rem;
			margin: 0 1px; // fieldset border compensation
		}

		.message {
			border: 1px solid #ccc;
			padding: 1rem;

			p {
				margin: 0 0 0.5rem;
			}
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
			column-gap: 2rem;
			grid-auto-rows: 1fr;
		}

		h2 {
			margin: 0;
		}

		input {
			border: 1px solid #ccc;
			box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
			border-radius: math.div(4, 14) * 1em;
			padding: 0.5rem;
			margin: 0;
			display: block;
			width: 100%;
			box-sizing: border-box;
		}

		button {
			border: 1px solid transparent;
			box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
			font-size: 1rem;
			line-height: 1.6em;
			margin: 0 8px 0 0;
			padding: 0.25em 1em;
			border-radius: math.div(4, 14) * 1em;
			cursor: pointer;
		}

		.actions {
			width: 100%;
			padding: 0 0 1rem;
			margin-top: auto;
		}

		fieldset {
			margin-bottom: 2rem;
			display: flex;
			gap: 0 1rem;
			flex-wrap: wrap;
			border-color: #4b3445;
			border-style: solid;
			border-width: 2px;
		}

		.field {
			margin-bottom: 1rem;
			flex-grow: 1;
			position: relative;
		}
	}
</style>
