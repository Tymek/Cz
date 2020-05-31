import express from 'express'
import si from 'systeminformation'
import {
  path,
  pick,
} from 'ramda'

import { cached, now, rotate } from '../utils'

import {
  bufferLength,
  infoCache,
  loadInterval,
} from './config'

const router = express.Router()
const start = now()
let load = []

const getLoad = async () => {
  const { used, swapused } = await si.mem()
  const {
    currentload_irq,
    currentload_system,
    currentload_user,
    cpus,
  } = await si.currentLoad()

  return {
    key: now(),
    mem: used,
    swap: swapused,
    cpu: {
      usr: currentload_user,
      sys: currentload_system,
      irq: currentload_irq,
    },
    cpus: cpus.map(path(['load'])),
  }
}

const getCachedInfo = cached(async () => {
  const { total, swaptotal } = await si.mem()
  const time = await si.time()
  const os = pick([
    'platform',
    'distro',
    'codename',
    'arch',
    'logofile',
  ], await si.osInfo())
  const cpu = pick([
    'manufacturer',
    'brand',
    'cores',
  ], await si.cpu())

  return {
    time: {
      ...time,
      start,
    },
    os,
    cpu,
    mem: total,
    swap: swaptotal,
  }
}, infoCache)

const rotateLoad = async () => {
  load = rotate(bufferLength, load, await getLoad())
}

rotateLoad()
setInterval(rotateLoad, loadInterval)

router.get('/', async (req, res) => res.send({
  info: await getCachedInfo(),
  load,
}))

export default router
