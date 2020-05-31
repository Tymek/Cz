import querystring from 'querystring'
import axios from 'axios'

import {
  client_id,
  client_secret,
  redirect_uri,
  scope,
  showDialog,
} from '../config'

const apiUrl = 'https://accounts.spotify.com'

const getToken = async requestBodyParameters => axios({
  method: 'post',
  url: `${apiUrl}/api/token`,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  auth: {
    username: client_id,
    password: client_secret,
  },
  data: querystring.stringify(requestBodyParameters),
})

export const authorizationUrl = `${apiUrl}/authorize?${querystring.stringify({
  response_type: 'code',
  scope,
  client_id,
  redirect_uri,
  showDialog,
})}`

export const getNewToken = async code => getToken({
  grant_type: 'authorization_code',
  code,
  redirect_uri,
})

export const refreshToken = async refresh_token => getToken({
  grant_type: 'refresh_token',
  refresh_token,
})

export default {
  authorizationUrl,
  getNewToken,
  refreshToken,
}
