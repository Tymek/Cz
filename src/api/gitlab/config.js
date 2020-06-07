import dotenv from 'dotenv'

dotenv.config()

export const apiUrl = 'https://gitlab.com/users/'
export const throttle = 60 * 15
export const user = process.env.GITLAB_USER
export const token = process.env.GITLAB_TOKEN

export default {
  apiUrl,
  token,
  throttle,
  user,
}
