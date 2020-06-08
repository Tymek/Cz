import polka from 'polka'
import sirv from 'sirv'
import morgan from 'morgan'
import compression from 'compression'
import * as sapper from '@sapper/server'
import dotenv from 'dotenv'
import api from './api'

dotenv.config()

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()
	.use(morgan('combined'))
	.use('/api', api)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
	})
