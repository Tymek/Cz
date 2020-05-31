import {
  lensPath,
  view,
  set,
} from 'ramda'

export const reset = () => {
  global.database = {}
}

export const get = () => global.database

const createDatabaseInterface = key => {
  if (!global.database) global.database = {}

  return ({
    get: (path = []) => view(
      lensPath(path),
      global.database[key], // eslint-disable-line security/detect-object-injection
    ),
    set: (value, path = []) => {
      global.database = set(
        lensPath([key, ...path]),
        value,
        global.database,
      )
    },
  })
}

export default createDatabaseInterface
