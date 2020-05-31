import {
  compose,
  pick,
  propOr,
  ifElse,
} from 'ramda'
import { stringify } from '../../utils'

const sendError = (err, req, res, next) => {
  const output = compose(
    ifElse(
      () => process.env.NODE_ENV === 'development',
      value => stringify(value, 2),
      pick(['status', 'data']),
    ),
    propOr({}, 'response'),
  )(err)

  res.status(output.status || 500)
  return res.send(output) || next()
}

export default sendError
