import { _, addMessages, init, locale } from 'svelte-i18n'

type SupportedLocale = 'en' | 'pl'
type TranslationMap = Record<string, string>

const defaultLocale: SupportedLocale = 'en'
const supportedLocales: SupportedLocale[] = ['en', 'pl']

let initialized = false

function normalizeLocale(value?: string | null): SupportedLocale {
	const baseLocale = value?.toLowerCase().split('-')[0]

	if (baseLocale && supportedLocales.includes(baseLocale as SupportedLocale)) {
		return baseLocale as SupportedLocale
	}

	return defaultLocale
}

export function setupI18n(initialLocale: SupportedLocale = defaultLocale) {
	if (initialized) {
		return
	}

	init({
		fallbackLocale: defaultLocale,
		initialLocale
	})

	initialized = true
}

export function getPreferredLocale() {
	if (typeof navigator === 'undefined') {
		return defaultLocale
	}

	return normalizeLocale(navigator.languages?.[0] || navigator.language)
}

export function registerTranslations(
	texts: TranslationMap,
	translations: Partial<Record<SupportedLocale, TranslationMap>> = {}
) {
	addMessages(defaultLocale, Object.fromEntries(Object.values(texts).map((text) => [text, text])))

	for (const [localeName, localeTranslations] of Object.entries(translations)) {
		addMessages(localeName as SupportedLocale, localeTranslations)
	}
}

setupI18n()

export { _, locale }
