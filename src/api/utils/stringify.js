/**
 * @see https://stackoverflow.com/a/48254637/1729641
 * @param {Object} v data
 * @param {string|number} space object that's used to insert white space
 */
const customStringify = (v, space = null) => {
  const cache = new Set()
  return JSON.stringify(v, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return undefined
      }
      cache.add(value)
    }
    return value
  }, space)
}

export default customStringify
