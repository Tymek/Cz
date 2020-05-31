import fs from 'fs'
import { resolve } from 'path'
import {
  lensPath,
  view,
  set as setPath,
} from 'ramda'

const file = resolve(__dirname, '../db.json') // FIXME: file location

const save = () => fs.writeFileSync( // eslint-disable-line security/detect-non-literal-fs-filename
  file,
  JSON.stringify(global.database, null, 2),
)

export const get = () => global.database

export const set = value => {
  global.database = value
}

export const reset = () => set({})

// eslint-disable-next-line security/detect-non-literal-fs-filename
const initialize = () => set(fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {})

const createDatabaseInterface = key => {
  if (!global.database) initialize()

  return ({
    get: (path = []) => view(
      lensPath(path),
      global.database[key], // eslint-disable-line security/detect-object-injection
    ),
    set: (value, path = []) => {
      global.database = setPath(
        lensPath([key, ...path]),
        value,
        global.database,
      )
      save()
    },
  })
}

export default createDatabaseInterface
