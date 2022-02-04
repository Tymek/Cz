import GPT3Tokenizer from '$vendor/gpt3-tokenizer'

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

export default (input: string) => {
	const { text } = tokenizer.encode(input)

	return text
}
