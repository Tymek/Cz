import express from 'express'
import axios from 'axios'
import {
  compose,
  head,
  path,
  pick,
} from 'ramda'
import { cached } from '../utils'

import { apiUrl, endpoint, throttle } from './config'

const router = express.Router()

const filterData = compose(
  pick([
    'badge_counts',
    'display_name',
    'reputation_change_year',
    'reputation',
    'creation_date',
    'link',
    'profile_image',
  ]),
  head,
  path(['data', 'items']),
)

const getData = cached(
  async () => filterData(await axios({
    method: 'get',
    url: `${apiUrl}${endpoint}`,
  })),
  throttle * 1000,
)

const sendData = async (req, res, next) => {
  try {
    return res.send(await getData())
  } catch (err) {
    return next()
  }
}

router.get('/', sendData)

export default router
