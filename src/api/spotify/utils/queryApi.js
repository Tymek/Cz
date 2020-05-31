import axios from 'axios'
import { database } from '../../utils'

const apiUrl = 'https://api.spotify.com/v1'
const db = database('spotify')

const queryApi = async endpoint => axios({
  method: 'get',
  url: `${apiUrl}${endpoint}`,
  headers: { Authorization: `Bearer ${db.get(['access_token'])}` },
})

export default queryApi
