import express from 'express'
import nock from 'nock'
import request from 'supertest'
import { path } from 'ramda'
import {
  reset as resetDatabase,
  get as getDatabase,
} from '../../utils/database'
import { redirect_uri, scope } from '../config'

import login from '.'

const code = '000_SPOTIFY_CODE'
let server

beforeEach(() => {
  resetDatabase()
  server = express().use(login)
})

describe('/spotify/login', () => {
  it('redirects to authorization', async () => request(server)
    .get('/')
    .expect(302)
    .expect(res => {
      expect(path(['headers', 'location'], res)).toMatchSnapshot()
    }))

  it('queries Spotify authorization API and saves tokens', async () => {
    nock('https://accounts.spotify.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Authorization',
      })
      .options('/api/token')
      .reply(204)
      .post('/api/token', {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      })
      .reply(200, {
        access_token: '000_SPOTIFY_ACCESS_TOKEN',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: '000_SPOTIFY_REFRESH_TOKEN',
        scope,
      })

    return request(server)
      .get('/').query({ code })
      .then(() => expect(getDatabase()).toMatchSnapshot())
  })
})
