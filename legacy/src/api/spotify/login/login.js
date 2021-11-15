import express from 'express'
import { database } from '../../utils'
import { getNewToken, authorizationUrl } from '../utils/authorize'
import sendError from '../utils/sendError'

const db = database('spotify')
const router = express.Router()

const redirectToAuthorization = (req, res, next) => (
  req.query.code
    ? next()
    : res.redirect(authorizationUrl)
)

const requestToken = async (req, res, next) => {
  const { code } = req.query
  if (!code) {
    next({ status: 500, query: res.query })
  }

  try {
    const response = await getNewToken(code)
    db.set(response.data)

    return res.send(response.data)
  } catch (err) {
    return next(err)
  }
}

router.get('/', redirectToAuthorization, requestToken, sendError)

export default router
