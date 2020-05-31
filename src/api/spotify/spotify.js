import crypto from 'crypto'
import express from 'express'
import {
  always,
  applySpec,
  both,
  call,
  compose,
  converge,
  head,
  identity,
  last,
  lensProp,
  map,
  mergeAll,
  mergeRight,
  omit,
  path,
  pick,
  prop,
  set,
  take,
  test,
  toPairs,
  zipWith,
} from 'ramda'
import { cached, database } from '../utils'

import { throttle, recentlyPlayedLimit } from './config'
import login from './login'
import queryApi from './utils/queryApi'
import { refreshToken } from './utils/authorize'
import sendError from './utils/sendError'

const db = database('spotify')
const router = express.Router()

const getTrackInfo = both(identity, applySpec({
  id: prop('id'),
  name: prop('name'),
  popularity: path('popularity'),
  artists: compose(
    map(prop('name')),
    prop('artists'),
  ),
  album: path(['album', 'name']),
  images: path(['album', 'images']),
  external_urls: prop('external_urls'),
}))

const hash = str => crypto.createHash('sha256').update(str).digest('base64')

const getTrackPlayed = compose(
  omit(['id', 'played_at']),
  converge(
    set,
    [
      always(lensProp('key')),
      ({ id, played_at }) => hash(`${id}:${played_at}`), // Not safe - played_at can be brute-forced
      identity,
    ],
  ),
  converge(
    mergeRight,
    [
      compose(getTrackInfo, prop('track')),
      pick(['played_at']),
    ],
  ),
)

const getComputerApp = name => (test(/web player/i, name) ? 'Computer (Web Player)' : 'Computer (Standalone App)')

const getDeviceType = ({ type, name }) => ({
  type: type === 'Computer' ? getComputerApp(name) : type,
})

const dataList = {
  '/me': converge(
    mergeRight,
    [
      pick([
        'followers',
        'images',
        'product',
        'display_name',
      ]),
      applySpec({
        link: path(['external_urls', 'spotify']),
      }),
    ],
  ),
  '/me/player': applySpec({
    is_playing: path(['is_playing']),
    now_playing: compose(
      getTrackInfo,
      prop('item'),
    ),
  }),
  '/me/player/recently-played': applySpec({
    recently_played: compose(
      map(getTrackPlayed),
      take(recentlyPlayedLimit),
      prop('items'),
    ),
  }),
  '/me/player/devices': applySpec({
    devices: compose(
      map(
        converge(
          mergeRight,
          [
            pick([
              'id',
              'is_active',
              'volume_percent',
            ]),
            getDeviceType,
          ],
        ),
      ),
      path(['devices']),
    ),
  }),
}

const collectData = async () => {
  const pairs = toPairs(dataList)
  const endpoints = map(head, pairs)
  const filters = map(last, pairs)
  const requests = map(queryApi, endpoints)
  const responses = await Promise.all(requests)
  const responsesData = map(path(['data']), responses)
  const filteredData = zipWith(call, filters, responsesData)
  return mergeAll(filteredData)
}

const createCache = () => cached(collectData, throttle * 1000)

let getData = createCache()

const sendData = async (req, res, next) => {
  try {
    return res.send(await getData())
  } catch (err) {
    return next(err)
  }
}

const catchTokenError = async (err, req, res, next) => {
  try {
    if (path(['response', 'status'], err) === 401) {
      const token = db.get(['refresh_token'])
      const tokenResponse = await refreshToken(token)
      db.set(tokenResponse.data.access_token, ['access_token'])
      getData = createCache()
      return next()
    }

    return next(err)
  } catch (error) {
    // TODO: log
    return next(error)
  }
}

router.get('/', sendData, catchTokenError, sendData, sendError)

router.use('/login', login)

export default router
