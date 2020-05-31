import express from 'express'
// import { resolvePath } from './utils'
import github from './github'
import spotify from './spotify'
import stackexchange from './stackexchange'
import system from './system'

// import { clientPath } from './config'

const router = express.Router()

// const rootToIndex = (req, res, next) => {
//   if (req.url === '/') {
//     req.url = '/index.html'
//   }
//   next()
// }
// const staticClientFiles = express.static(resolvePath(clientPath))

router.get('/status', (req, res) => res.status(200).send({ status: 'OK' }))
// router.use(rootToIndex, staticClientFiles)
router.use('/github', github)
router.use('/spotify', spotify)
router.use('/stackexchange', stackexchange)
router.use('/system', system)

export default router
