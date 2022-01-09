export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]) =>
	keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
