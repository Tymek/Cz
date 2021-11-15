const {
  takeLast,
  append,
  compose,
  curry,
} = require('ramda')

/**
 * Append element and drop from beginning if `length` is reached
 * @param {number} length clip list to max elements
 * @param {Array} acc list
 * @param {any} elem element to append
 * @returns {Array}
 */
const rotate = curry((length, acc, elem) => compose(
  takeLast(length),
  append,
)(elem, acc))

export default rotate
