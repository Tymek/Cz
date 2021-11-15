// import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  array,
  object,
} from "@storybook/addon-knobs"

import SongComponent from '../song.svelte'

export default {
  title: 'Spotify',
  component: SongComponent,
  decorators: [withKnobs],
}

export const Song = () => ({
  Component: SongComponent,
  props: {
    name: text('text', 'Never Gonna Give You Up'),
    artists: array('artists', ['Rick Astley']),
    album: text('album', 'Whenever You Need Somebody'),
    images: object('images', [
      {
        "width": 640,
        "height": 640,
        "url": "https://i.scdn.co/image/ab67616d0000b273255e131abc1410833be95673",
      },
      {
        "width": 300,
        "height": 300,
        "url": "https://i.scdn.co/image/ab67616d00001e02255e131abc1410833be95673",
      },
      {
        "width": 64,
        "height": 64,
        "url": "https://i.scdn.co/image/ab67616d00004851255e131abc1410833be95673",
      },
    ]),
    url: text('url', 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC'),
  },
})
