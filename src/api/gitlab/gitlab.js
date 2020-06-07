import express from 'express'
import axios from 'axios'
import { path } from 'ramda'
import { cached } from '../utils'
import { user, apiUrl, throttle } from './config.js'

const router = express.Router()

const getData = cached(
  async () => axios({
    method: 'get',
    url: `${apiUrl}${user}/calendar.json`,
    // headers,
  }),
  throttle * 1000,
)

const sendData = request => async (req, res, next) => {
  try {
    return res.send(path(['data'], await request()))
  } catch (err) {
    return next()
  }
}

router.get('/', sendData(getData))

export default router
