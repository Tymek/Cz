export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]) =>
	keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})

/**
 * From Lodash
 * @see https://github.com/lodash/lodash/blob/9d11b48ce5758df247607dc837a98cbfe449784a/escape.js
 */
export const escape = (text: string): string => {
	const htmlEscapes = {
		'&': '&amp',
		'<': '&lt',
		'>': '&gt',
		'"': '&quot',
		"'": '&#39'
	}
	const reUnescapedHtml = /[&<>"']/g
	const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

	return text && reHasUnescapedHtml.test(text)
		? text.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
		: text
}

export const messageFormatter = (input: string | number): string => {
	const modifiers: Array<{
		tag: string
		transform: (x: string) => string
		recursive?: boolean // if false, prevent parsing of text inside of it
	}> = [
		{ tag: '```', transform: (x: string) => `<pre>${x}</pre>`, recursive: false },
		{ tag: '**', transform: (x: string) => `<strong>${x}</strong>` },
		{ tag: '*', transform: (x: string) => `<b>${x}</b>` },
		{ tag: '__', transform: (x: string) => `<em>${x}</em>` },
		{ tag: '_', transform: (x: string) => `<i>${x}</i>` },
		{ tag: '`', transform: (x: string) => `<code>${x}</code>` }
	]

	if (!input && input !== 0) return ''
	const text: string = typeof input === 'number' ? `${input}` : input

	const format = (x: string, modifierIndex: number): string[] => {
		if (x === '') return []
		if (modifierIndex >= modifiers.length) return [x]
		const { tag, transform, recursive } = modifiers[modifierIndex]

		const parts = x.split(tag)
		if (parts.length < 3) return [format(x, modifierIndex + 1).join('')]

		const prefix = parts.shift()
		const content = parts.shift()

		const transformedContent =
			content !== '' // don't transform empty tags
				? transform(recursive ? format(content, modifierIndex + 1).join('') : content)
				: `${tag}${content}${tag}`

		return [
			...format(prefix, modifierIndex + 1),
			transformedContent,
			...format(parts.join(tag), modifierIndex)
		]
	}

	return format(text, 0).join('')
}
// ;[
// 	['**test**', '<strong>test</strong>'],
// 	['*test*', '<b>test</b>'],
// 	['_test_', '<i>test</i>'],
// 	['__test__', '<em>test</em>'],
// 	['`test`', '<code>test</code>'],
// 	['```test```', '<pre>test</pre>'],
// 	['**test**test**', '<strong>test</strong>test**'],
// 	['```and*test*```', '<pre>and*test*</pre>'],
// 	['```te\nst```test```', '<pre>te\nst</pre>test```']
// ].forEach(([input, output]) => {
// 	if (messageFormatter(input) !== output) {
// 		throw new Error(
// 			`Message formatter error: ${input} should be ${output}, but is ${messageFormatter(input)}`
// 		)
// 	}
// })

export const debounce = (func, timeout = 300) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

export const throttle = (callback, limit) => {
	let waiting = false
	return function () {
		if (!waiting) {
			// eslint-disable-next-line prefer-rest-params
			callback.apply(this, arguments)
			waiting = true
			setTimeout(function () {
				waiting = false
			}, limit)
		}
	}
}
