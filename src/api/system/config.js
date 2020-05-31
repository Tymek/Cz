import dotenv from 'dotenv'

dotenv.config()

export const bufferLength = 60
export const loadInterval = 1000
export const infoCache = 86400000 // 24h

export default {
  bufferLength,
  infoCache,
  loadInterval,
}
