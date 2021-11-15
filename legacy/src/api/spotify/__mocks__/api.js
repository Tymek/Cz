import moxios from 'moxios'

import { scope } from '../config'

jest.mock('../config')

beforeEach(() => {
  moxios.install()
  moxios.stubRequest('https://accounts.spotify.com/api/token', {
    status: 200,
    response: {
      access_token: '000_SPOTIFY_ACCESS_TOKEN',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: '000_SPOTIFY_REFRESH_TOKEN',
      scope,
    },
  })
  moxios.stubRequest('https://api.spotify.com/v1/me', {
    status: 200,
    response: {
      birthdate: '2000-01-01',
      country: 'PL',
      display_name: 'Name Surname',
      email: 'user@example.com',
      external_urls: {
        spotify: 'https://open.spotify.com/user/000userid',
      },
      followers: {
        href: null,
        total: 5,
      },
      href: 'https://api.spotify.com/v1/users/000userid',
      id: '000userid',
      images: [
        {
          height: null,
          url: 'hhttps://via.placeholder.com/500x500.png?text=avatar',
          width: null,
        },
      ],
      product: 'premium',
      type: 'user',
      uri: 'spotify:user:000userid',
    },
  })
})

afterEach(() => {
  moxios.uninstall()
})
