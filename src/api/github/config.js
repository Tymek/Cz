import dotenv from 'dotenv'

dotenv.config()

export const token = process.env.GITHUB_TOKEN
export const apiUrl = 'https://api.github.com'
export const throttle = 60 * 15
export const user = process.env.GITHUB_USER
export const eventsLimit = 12

export default {
  apiUrl,
  token,
  throttle,
  user,
  eventsLimit,
}
