<div class="container">
	<slot />
</div>

<style lang="scss">
	.container {
		width: 100%;
		box-sizing: border-box;
		padding: 2rem 2rem;

		@media (orientation: landscape) {
			padding: 2rem 10vw;
		}
	}
</style>
