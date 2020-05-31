export const throttle = 900
export const scopes = []
export const available_scopes = [
  'read_inbox',
  'no_expiry',
  'write_access',
  'private_info',
]

const userId = process.env.STACKEXCHANGE_USER_ID
const site = process.env.STACKEXCHANGE_SITE || 'stackoverflow'
export const apiUrl = 'https://api.stackexchange.com/2.2'
export const endpoint = `/users/${userId}?site=${site}`

export default {
  apiUrl,
  endpoint,
  throttle,
  scopes,
  available_scopes,
}
