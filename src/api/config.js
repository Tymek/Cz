import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT || 80

export const clientPath = process.env.STATIC_DIR || '../client/build'

export default { port }
