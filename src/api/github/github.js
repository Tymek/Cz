/* eslint-env node */
import express from 'express'
import axios from 'axios'
import {
  applySpec,
  compose,
  converge,
  identity,
  map,
  mergeRight,
  path,
  pathOr,
  pick,
  // replace,
  take,
} from 'ramda'
import { cached } from '../utils'

import {
  apiUrl,
  token,
  throttle,
  user,
  eventsLimit,
} from './config'

const router = express.Router()
const headers = {
  Authorization: `token ${token}`,
}

const getData = path(['data'])

const filterUserData = compose(
  converge(
    mergeRight,
    [
      pick([
        'login',
        'avatar_url',
        'location',
        'bio',
        'public_repos',
        'public_gists',
        'followers',
        'following',
      ]),
      applySpec({
        link: path(['html_url']),
      }),
    ],
  ),
  getData,
)

const filterUserPublicEvents = compose(
  take(eventsLimit),
  map(
    converge(
      mergeRight,
      [
        pick(['created_at', 'id']),
        applySpec({
          type: path(['type']),
          action: pathOr(null, ['payload', 'action']),
          // type: compose(
          //   replace(/Event$/, ''),
          //   path(['type']),
          // ),
          repo: path(['repo', 'name']),
        }),
      ],
    ),
  ),
  getData,
)

const createRequest = endpoint => async () => axios({
  method: 'get',
  url: `${apiUrl}${endpoint}`,
  headers,
})

const cacheRequest = request => {
  const cachedRequest = cached(
    request,
    throttle * 1000,
  )

  return async () => cachedRequest()
}

const filterRequest = (requestFilter = identity) => request => (
  async () => requestFilter(await request())
)

const createCachedFilteredRequest = (filter, endpoint) => compose(
  filterRequest(filter),
  cacheRequest,
  createRequest,
)(endpoint)

const getUserData = (() => {
  const request = createCachedFilteredRequest(filterUserData, `/users/${user}`)

  return async () => request()
})()

const getUserPublicEvents = (() => {
  const request = createCachedFilteredRequest(filterUserPublicEvents, `/users/${user}/events/public`)

  return async () => request()
})()

const getUserDataWithEvents = async () => {
  const [userData, events] = await Promise.all([
    getUserData(),
    getUserPublicEvents(),
  ])

  return {
    ...userData,
    events,
  }
}

const getEmojiData = (() => {
  const request = createCachedFilteredRequest(getData, '/emojis')

  return async () => request()
})()

const sendData = request => async (req, res, next) => {
  try {
    return res.send(await request())
  } catch (err) {
    return next()
  }
}

router.get('/', sendData(getUserDataWithEvents))
router.get('/emojis', sendData(getEmojiData))

export default router
