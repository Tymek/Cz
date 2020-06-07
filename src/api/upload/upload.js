import {
  rmdirSync,
  existsSync,
  mkdirSync,
  renameSync,
} from 'fs'
import { extname } from 'path'
import express from 'express'
import multer from 'multer'
import basicAuth from 'express-basic-auth'
import { database, resolvePath } from '../utils'

const token = process.env.UPLOAD_TOKEN
const uploadsDir = resolvePath('./static/uploads')
const dest = resolvePath('./tmp')
const db = database('upload')
const upload = multer({ dest })
const router = express.Router()
const auth = basicAuth({
  users: {
    'tymek': token,
  },
  challenge: true,
  realm: 'www.tymek.cz',
})

const cleanup = () => {
  rmdirSync(dest, { recursive: true })
}

router.get('/', function (req, res) {
  res.send(db.get() || {})
})

if (!existsSync(uploadsDir)){
  mkdirSync(uploadsDir)
}

router.post('/', auth, upload.single('file'), function (req, res, next) {
  try {
    const newFile = `${req.file.filename}${extname(req.file.originalname)}`
    renameSync( req.file.path, resolvePath(uploadsDir, newFile))
    db.set(`/uploads/${newFile}`, [req.body.target])

    res.send({
      x: [req.file, req.body],
    })
  } catch (err) {
    next(err)
  }

  cleanup()
})

router.get('/login', auth, function (req, res) {
  res.status(200).send({ status: 'OK' })
})

export default router
