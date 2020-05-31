import { compose, pick, propOr } from 'ramda'

const sendError = (err, req, res, next) => {
  const output = compose(
    pick(['status', 'data']),
    propOr({}, 'response'),
  )(err)

  res.status(output.status || 500)
  return res.send(output) || next()
}

export default sendError
