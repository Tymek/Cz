/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	transform: {
		'^.+\\.svelte$': [
			'svelte-jester',
			{
				preprocess: true
			}
		],
		'^.+\\.js$': 'babel-jest',
		'^.+\\.ts$': 'ts-jest'
	},
	moduleFileExtensions: ['js', 'svelte'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testPathIgnorePatterns: ['<rootDir>/legacy'],
	collectCoverageFrom: ['src/**/*.{js,ts,svelte}']
}

export default config
