<style type="text/scss" lang="scss">
	@font-face {
		font-family: 'Spartan';
		font-weight: 100 900;
		font-display: swap;
		src: local('Spartan'), url('/fonts/spartan.woff2') format('woff2-variations');
	}

	@font-face {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400 900;
		src: url('/fonts/playfair-display.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Playfair Display';
		font-style: italic;
		font-weight: 400 900;
		src: url('/fonts/playfair-display-italic.woff2') format('woff2');
	}

	:global(:root) {
		--color-catalina-blue: #253854;
		--color-matterhorn: #4b3445;
		--color-carmine: #d0021b;
		--color-crayola-yellow: #f1cd5f;
		--color-goblin: #3c8458;
		--color-whisper: #e8e8e8;

		--color-white: #fff;
		--color-black: #000;
		--color-light: #fcfcfc;
		--color-dark: #333333;

		--light-background: var(--color-whisper);
		--dark-background: var(--color-catalina-blue);
		--text: var(--color-dark);
		--background: var(--light-background);

		@media (prefers-color-scheme: dark) {
			--background: var(--dark-background);
			--text: var(--color-white);
		}
	}

	:global(:root, html, body) {
		font-size: 14px;
		font-family: Spartan, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue',
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

		@media (min-width: 1681px) {
			font-size: 0.833333333vw;
		}
	}

	:global {
		body {
			margin: 0;
			background-color: var(--background) !important;
			color: var(--text);
		}

		a {
			color: inherit;
		}

		::-moz-selection {
			color: #fff;
			background: #000;
		}
	}

	// Selection color
	:global {
		::selection {
			color: #fff;
			background: #000;
		}

		@media (prefers-color-scheme: dark) {
			::-moz-selection {
				color: #000;
				background: #fff;
			}

			::selection {
				color: #000;
				background: #fff;
			}
		}
	}
</style>
