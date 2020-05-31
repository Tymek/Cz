import express from 'express'
import helmet from 'helmet'

import routes from './routes'

const app = express()

app.use(helmet())
app.set('json spaces', 2)
app.use(express.json())
app.use(routes)

export default app
