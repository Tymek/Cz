/**
 * Store and return cached result of `func` unless `delay` miliseconds passed
 * @param {Function} func debounce/throttle execution of it with cached value
 * @param {number} delay in ms between refreshing cache
 * @returns {Function}
 */
const cached = (func, delay = Infinity) => {
  let cache = null
  let lastCallTimestamp = 0

  return (...args) => {
    const timestamp = Date.now()
    if (!lastCallTimestamp || timestamp >= lastCallTimestamp + delay) {
      lastCallTimestamp = timestamp
      cache = func(...args)
    }

    return cache
  }
}

module.exports = cached
