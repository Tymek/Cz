import express from 'express'
import github from './github'
import gitlab from './gitlab'
import spotify from './spotify'
import stackexchange from './stackexchange'
import system from './system'

const router = express.Router()

router.get('/status', (req, res) => res.status(200).send({ status: 'OK' }))
router.use('/github', github)
router.use('/gitlab', gitlab)
router.use('/spotify', spotify)
router.use('/stackexchange', stackexchange)
router.use('/system', system)

export default router
